"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getNewsByCategory } from "@/service/newsApi";
import Image from "next/image";

const categoriesList = [
  { name: { bn: "বাংলাদেশ", en: "Bangladesh" }, slug: "bangladesh" },
  { name: { bn: "বিশ্ব", en: "World" }, slug: "world" },
  { name: { bn: "আন্তর্জাতিক", en: "International" }, slug: "international" },

  { name: { bn: "রাজনীতি", en: "Politics" }, slug: "politics" },
  { name: { bn: "দুর্নীতি", en: "corruption" }, slug: "corruption" },
  { name: { bn: "মতামত", en: "Opinion" }, slug: "opinion" },

  { name: { bn: "বাণিজ্য", en: "Business" }, slug: "business" },
  { name: { bn: "অর্থনীতি", en: "Economy" }, slug: "economy" },
  { name: { bn: "জাতীয়", en: "National" }, slug: "national" },

  { name: { bn: "প্রযুক্তি", en: "Technology" }, slug: "technology" },
  { name: { bn: "বিজ্ঞান", en: "Science" }, slug: "science" },

  { name: { bn: "খেলা", en: "Sports" }, slug: "sports" },

  { name: { bn: "বিনোদন", en: "Entertainment" }, slug: "entertainment" },
  { name: { bn: "লাইফস্টাইল", en: "Lifestyle" }, slug: "lifestyle" },

  { name: { bn: "শিক্ষা", en: "Education" }, slug: "education" },
  { name: { bn: "চাকরি", en: "Jobs" }, slug: "jobs" },

  { name: { bn: "ধর্ম", en: "Religion" }, slug: "religion" },

  // ➕ Newly added useful categories
  { name: { bn: "স্বাস্থ্য", en: "Health" }, slug: "health" },
  { name: { bn: "পরিবেশ", en: "Environment" }, slug: "environment" },
  { name: { bn: "অপরাধ", en: "Crime" }, slug: "crime" },
  { name: { bn: "আইন ও আদালত", en: "Law & Court" }, slug: "law-court" },
  { name: { bn: "গণমাধ্যম", en: "Media" }, slug: "media" },
  { name: { bn: "প্রবাস", en: "Diaspora" }, slug: "diaspora" },
];

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 🧪 DEBUG: log incoming data structure
  const debugData = (data) => {
    console.log("🔥 RAW API DATA:", data);

    if (data?.length > 0) {
      console.log("🧠 FIRST ITEM:", data[0]);
      console.log("📦 CATEGORY TYPE:", typeof data[0]?.category);
    }
  };

  // ✅ SAFE NORMALIZER (fix object crash)
  const normalizeNews = (data) => {
    return (data || []).map((item) => ({
      ...item,

      // ⚠️ FIX: if category is object -> convert to string
      category:
        typeof item.category === "object"
          ? item.category.en || item.category.bn
          : item.category,
    }));
  };

  // 🚀 FETCH FUNCTION
  const fetchNews = async (category = "all") => {
    try {
      let res;

      if (category === "all") {
        const allData = await Promise.all(
          categoriesList.map((cat) => getNewsByCategory(cat.slug, "en")),
        );

        const merged = allData.flatMap((r) => r?.data || r || []);

        debugData(merged);

        setNews(normalizeNews(merged));
      } else {
        res = await getNewsByCategory(category, "en");

        const data = res?.data || res;

        debugData(data);

        setNews(normalizeNews(data));
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNews(selectedCategory);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <h1 className="text-xl font-bold">News Dashboard</h1>

        <div className="flex gap-3">
          <select
            className="border px-3 py-2 rounded text-sm bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">সব ক্যাটাগরি</option>

            {categoriesList.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name.bn}
              </option>
            ))}
          </select>

          <Link href="/admin/news/create">
            <button className="bg-red-700 text-white px-4 py-2 rounded">
              + Add
            </button>
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">SL</th>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3"></th>

              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {news.length === 0 ? (
              <tr>
                <td className="p-5 text-center text-gray-500" colSpan="4">
                  No data found
                </td>
              </tr>
            ) : (
              news.map((item, index) => (
                <tr key={item._id || index} className="border-t">
                  <td className="pl-5">{index + 1}</td>

                  {/* image */}
                  <td className="p-3">
                    <Image
                      src={item.featuredImage[0]}
                      alt="news"
                      width={100}
                      height={70}
                      className="rounded-md"
                    />
                  </td>
                  {/* TITLE */}
                  <td className="p-3">
                    {typeof item.title.bn === "object"
                      ? JSON.stringify(item.title.bn)
                      : item.title.bn}
                  </td>

                  {/* CATEGORY (SAFE FIX) */}
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded bg-red-50 text-red-700">
                      {typeof item.category === "object"
                        ? item.category.bn || item.category.en
                        : item.category}
                    </span>
                  </td>

                  {/* SLUG */}
                  <td className="p-3 text-xs text-gray-500">
                    {typeof item.slug === "object"
                      ? JSON.stringify(item.slug)
                      : item.slug}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/news/${item._id}`}>
                        <button className="px-3 py-1 text-xs border rounded cursor-pointer">
                          Edit
                        </button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded cursor-pointer">
                            Delete
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm delete?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
