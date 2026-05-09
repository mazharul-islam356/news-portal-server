"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import Image from "next/image";

const initialState = {
  title_bn: "",
  title_en: "",
  // summary_bn: "",
  // summary_en: "",
  content_bn: "",
  content_en: "",
  writer_bn: "",
  writer_en: "",
  publishedAt: "",
  status: "draft",

  tags: "",
  category_en: "",
  category_bn: "",

  // NEW FLAGS
  isBreaking: 0,
  isBreakingTop: 0,
  isLatest: 0,
  isTrending: 0,
  isFeatured: 0,
};

const categories = [
  { bn: "বাংলাদেশ", en: "Bangladesh" },
  { bn: "বিশ্ব", en: "World" },
  { bn: "আন্তর্জাতিক", en: "International" },

  { bn: "রাজনীতি", en: "Politics" },
  { bn: "মতামত", en: "Opinion" },
  { bn: "জাতীয়", en: "National" },

  { bn: "বাণিজ্য", en: "Business" },
  { bn: "অর্থনীতি", en: "Economy" },

  { bn: "প্রযুক্তি", en: "Technology" },
  { bn: "বিজ্ঞান", en: "Science" },

  { bn: "খেলা", en: "Sports" },

  { bn: "বিনোদন", en: "Entertainment" },
  { bn: "লাইফস্টাইল", en: "Lifestyle" },

  { bn: "শিক্ষা", en: "Education" },
  { bn: "চাকরি", en: "Jobs" },

  { bn: "ধর্ম", en: "Religion" },
  { bn: "দুর্নীতি", en: "corruption" },

  { bn: "স্বাস্থ্য", en: "Health" },
  { bn: "পরিবেশ", en: "Environment" },
  { bn: "অপরাধ", en: "Crime" },
  { bn: "আইন ও আদালত", en: "Law & Court" },
  { bn: "গণমাধ্যম", en: "Media" },
  { bn: "প্রবাস", en: "Diaspora" },
];

export default function CreateNews() {
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles((prev) => [...prev, file]);
    setPreviews((prev) => [...prev, URL.createObjectURL(file)]);

    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      files.forEach((file) => {
        data.append("images", file);
      });

      // console.log(data);
      // return;
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("News created");

      setForm(initialState);
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      toast.error(err.message || "Error creating news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:p-6 pt-10 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* LEFT */}
        <div className="md:col-span-3 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="title_bn"
              value={form.title_bn}
              onChange={handleChange}
              placeholder="Title (Bangla)"
            />
            <Input
              name="title_en"
              value={form.title_en}
              onChange={handleChange}
              placeholder="Title (English)"
            />

            {/* <Textarea
              name="summary_bn"
              value={form.summary_bn}
              onChange={handleChange}
              placeholder="Summary (Bangla)"
            />
            <Textarea
              name="summary_en"
              value={form.summary_en}
              onChange={handleChange}
              placeholder="Summary (English)"
            /> */}

            <Textarea
              rows={6}
              name="content_bn"
              value={form.content_bn}
              onChange={handleChange}
              placeholder="Content (Bangla)"
            />
            <Textarea
              rows={6}
              name="content_en"
              value={form.content_en}
              onChange={handleChange}
              placeholder="Content (English)"
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="border p-4 col-span-1 rounded-sm bg-gray-50 space-y-3">
          <input
            type="file"
            id="img"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="img"
            className="block border border-dashed p-4 text-center cursor-pointer text-sm"
          >
            Upload image
          </label>

          <div className="grid grid-cols-2 gap-2">
            {previews.map((img, i) => (
              <div key={i} className="relative">
                <Image
                  alt="news_image"
                  width={500}
                  height={500}
                  src={img}
                  className="h-20 w-full object-cover rounded-sm border"
                />
                <button
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 text-xs bg-red-500 text-white px-2 rounded-sm"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4 grid md:grid-cols-2 gap-x-4">
        <div className="border p-4 rounded-sm space-y-4">
          <h2 className="text-sm font-semibold">News Flags</h2>

          {/* Breaking */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Breaking</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isBreaking"
                  checked={form.isBreaking === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isBreaking: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isBreaking"
                  checked={form.isBreaking === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isBreaking: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>

          {/* Latest */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Latest News</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isLatest"
                  checked={form.isLatest === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isLatest: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isLatest"
                  checked={form.isLatest === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isLatest: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>

          {/* Breaking Top */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Breaking Top</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isBreakingTop"
                  checked={form.isBreakingTop === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isBreakingTop: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isBreakingTop"
                  checked={form.isBreakingTop === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isBreakingTop: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>

          {/* Trending */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Trending</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isTrending"
                  checked={form.isTrending === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isTrending: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isTrending"
                  checked={form.isTrending === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isTrending: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Featured</span>

            <div className="flex gap-3 text-sm">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isFeatured"
                  checked={form.isFeatured === 1}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isFeatured: 1,
                    }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="isFeatured"
                  checked={form.isFeatured === 0}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      isFeatured: 0,
                    }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>
        </div>
        <div className="border p-4 space-y-3 rounded-sm">
          {/* writer name */}
          <div className="md:flex items-center gap-2 space-y-2 md:space-y-0">
            <Input
              name="writer_bn"
              value={form.writer_bn}
              onChange={handleChange}
              placeholder="Writer Name (Bangla)"
            />
            <Input
              name="writer_en"
              value={form.writer_en}
              onChange={handleChange}
              placeholder="Writer Name (English)"
            />
          </div>

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 text-sm rounded-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Publish Now</option>
            <option value="scheduled">Schedule</option>
          </select>

          {/* PUBLISH DATE */}
          <Input
            type="datetime-local"
            name="publishedAt"
            value={form.publishedAt}
            onChange={handleChange}
          />

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={(e) => {
              const selected = categories.find((c) => c.en === e.target.value);

              setForm({
                ...form,
                category_en: selected.en,
                category_bn: selected.bn,
              });
            }}
            className="w-full border px-3 py-2 text-sm rounded-sm"
          >
            <option value="">Select category</option>

            {categories.map((c) => (
              <option key={c.en} value={c.en}>
                {c.bn}
              </option>
            ))}
          </select>

          <Input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
          />
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={loading} className="w-full py-5">
        <Plus />
        {loading ? "Publishing..." : "Create News"}
      </Button>
    </div>
  );
}
