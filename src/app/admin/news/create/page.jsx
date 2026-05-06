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
  { en: "Bangladesh", bn: "বাংলাদেশ" },
  { en: "World", bn: "বিশ্ব" },
  { en: "Opinion", bn: "মতামত" },
  { en: "Business", bn: "বাণিজ্য" },
  { en: "Entertainment", bn: "বিনোদন" },
  { en: "Lifestyle", bn: "জীবনযাপন" },
  { en: "Jobs", bn: "চাকরি" },
  { en: "Sports", bn: "খেলা" },
  { en: "Technology", bn: "প্রযুক্তি" },
  { en: "Education", bn: "শিক্ষা" },
  { en: "Religion", bn: "ধর্ম" },
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
      toast.error("Error creating news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create News</h1>

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
      <div className="space-y-4 grid grid-cols-2 gap-x-4">
        <div className="border p-4 rounded-sm space-y-4">
          <h2 className="text-sm font-semibold">News Flags</h2>

          {/* Breaking */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Breaking</span>
            <div className="flex gap-3 text-sm">
              <label>
                <input
                  type="radio"
                  name="isBreaking"
                  checked={form.isBreaking === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isBreaking: true }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="isBreaking"
                  checked={form.isBreaking === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isBreaking: false }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>

          {/* latest */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Latest News</span>
            <div className="flex gap-3 text-sm">
              <label>
                <input
                  type="radio"
                  name="isLatest"
                  checked={form.isLatest === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isLatest: true }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="isLatest"
                  checked={form.isLatest === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isLatest: false }))
                  }
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>
          {/* Breaking */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Breaking Top</span>
            <div className="flex gap-3 text-sm">
              <label>
                <input
                  type="radio"
                  name="isBreakingTop"
                  checked={form.isBreakingTop === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isBreakingTop: true }))
                  }
                />
                <span className="ml-1">Yes</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="isBreakingTop"
                  checked={form.isBreakingTop === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isBreakingTop: false }))
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
              <label>
                <input
                  type="radio"
                  name="isTrending"
                  checked={form.isTrending === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isTrending: true }))
                  }
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="isTrending"
                  checked={form.isTrending === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isTrending: false }))
                  }
                />
                No
              </label>
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Featured</span>
            <div className="flex gap-3 text-sm">
              <label>
                <input
                  type="radio"
                  checked={form.isBreaking === 0}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isBreaking: 0 }))
                  }
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  checked={form.isBreaking === 1}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, isBreaking: 1 }))
                  }
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div className="border p-4 space-y-3 rounded-sm">
          {/* writer name */}
          <div className="flex items-center gap-2">
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
