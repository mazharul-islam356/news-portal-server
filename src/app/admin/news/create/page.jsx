"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const initialState = {
  title_bn: "",
  title_en: "",
  summary_bn: "",
  summary_en: "",
  content_bn: "",
  content_en: "",
  slug: "",
  category: "",
  tags: "",
};

const categories = [
  "Politics",
  "Sports",
  "Technology",
  "Business",
  "Entertainment",
  "International",
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

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                name="title_bn"
                value={form.title_bn}
                onChange={handleChange}
                placeholder="Title (Bangla)"
                className="rounded-sm shadow-none border"
              />
            </div>

            <div>
              <Input
                name="title_en"
                value={form.title_en}
                onChange={handleChange}
                placeholder="Title (English)"
                className="rounded-sm shadow-none border"
              />
            </div>

            <div>
              <Textarea
                name="summary_bn"
                value={form.summary_bn}
                onChange={handleChange}
                placeholder="Summary (Bangla)"
                className="rounded-sm shadow-none border"
              />
            </div>

            <div>
              <Textarea
                name="summary_en"
                value={form.summary_en}
                onChange={handleChange}
                placeholder="Summary (English)"
                className="rounded-sm shadow-none border"
              />
            </div>

            <div>
              <Textarea
                rows={6}
                name="content_bn"
                value={form.content_bn}
                onChange={handleChange}
                placeholder="Content (Bangla)"
                className="rounded-sm shadow-none border"
              />
            </div>

            <div>
              <Textarea
                rows={6}
                name="content_en"
                value={form.content_en}
                onChange={handleChange}
                placeholder="Content (English)"
                className="rounded-sm shadow-none border"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div className="border p-4 space-y-3 rounded-sm shadow-none">
            <Input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="Slug"
              className="rounded-sm shadow-none"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 text-sm rounded-sm"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <Input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
              className="rounded-sm shadow-none"
            />
          </div>

          {/* IMAGE */}
          <div className="border p-4 rounded-sm bg-gray-50 space-y-3">
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
                  <img
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
      </div>

      {/* FULL WIDTH BUTTON */}
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-sm py-5 shadow-none"
      >
        <Plus />
        {loading ? "Publishing..." : "Create News"}
      </Button>
    </div>
  );
}
