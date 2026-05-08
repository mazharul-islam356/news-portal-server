"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getNewsByCategory } from "@/service/newsApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PoliticsPage() {
  const [politics, setPolitics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNewsByCategory("politics", "en");
        setPolitics(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const newsData = politics?.data || [];
  const firstTwo = newsData.slice(0, 2);
  const lastFour = newsData.slice(2, 6);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-6 w-40 bg-gray-300 mb-6 rounded"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left skeleton */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="h-40 sm:h-52 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 mt-3 w-3/4 rounded"></div>
                <div className="h-3 bg-gray-300 mt-2 w-full rounded"></div>
              </div>
            ))}
          </div>

          {/* Right skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-24 sm:h-28 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 mt-2 w-3/4 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- ERROR ----------------
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-red-500">{error}</div>
    );
  }

  const t = {
    title: {
      en: "Politics",
      bn: "রাজনীতি",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold border-b-2 border-red-500 inline-block mb-6 sm:mb-8">
        {t.title[lang]}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {firstTwo.map((news, i) => (
            <div key={i} className="bg-white rounded-sm overflow-hidden group">
              <Link href={`/news/${news?._id || "#"}`}>
                <div className="relative w-full h-48 sm:h-56">
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    fill
                    className="object-cover group-hover:scale-95 transition rounded-sm"
                    alt={getTranslatedValue(news?.title, lang)}
                  />
                </div>
              </Link>

              <div className="pt-3">
                <Link href={`/news/${news?._id || "#"}`}>
                  <h3 className="text-base sm:text-xl font-semibold line-clamp-2">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {getTranslatedValue(news?.content, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
          {lastFour.map((news, i) => (
            <Link
              href={`/news/${news?._id || "#"}`}
              key={i}
              className="bg-white rounded-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative w-full h-24 sm:h-28">
                <Image
                  src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                  fill
                  className="object-cover"
                  alt={getTranslatedValue(news?.title, lang)}
                />
              </div>

              <div className="p-2">
                <h4 className="text-xs sm:text-sm font-medium line-clamp-1">
                  {getTranslatedValue(news?.title, lang)}
                </h4>

                <p className="text-[10px] sm:text-xs mt-1 text-gray-500">
                  ১৩ মিনিট আগে
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
