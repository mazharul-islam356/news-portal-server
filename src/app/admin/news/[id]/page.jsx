"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { authHeader } from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function EditNews() {
  const { id } = useParams();
  const categories = [
    { en: "Politics", bn: "রাজনীতি" },
    { en: "Sports", bn: "খেলাধুলা" },
    { en: "Technology", bn: "প্রযুক্তি" },
    { en: "Business", bn: "ব্যবসা" },
    { en: "Entertainment", bn: "বিনোদন" },
    { en: "International", bn: "আন্তর্জাতিক" },
  ];
  const [form, setForm] = useState({
    title_bn: "",
    title_en: "",
    summary_bn: "",
    summary_en: "",
    content_bn: "",
    content_en: "",
    slug: "",
    category: "",
    tags: "",
    status: "draft",
    publishedAt: "",
    isBreaking: 1,
    isTrending: 1,
    isFeatured: 1,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const router = useRouter();
  // ✅ FETCH DATA
  useEffect(() => {
    if (!id) return;

    const fetchSingle = async () => {
      try {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
        );

        const data = res.data;

        setForm({
          title_bn: data.title?.bn || "",
          title_en: data.title?.en || "",
          summary_bn: data.summary?.bn || "",
          summary_en: data.summary?.en || "",
          content_bn: data.content?.bn || "",
          content_en: data.content?.en || "",
          slug: data.slug || "",
          category: data.category || "",
          tags: data.tags?.join(", ") || "",
          status: data.status || "draft",
          publishedAt: data.publishedAt
            ? new Date(data.publishedAt).toISOString().slice(0, 16)
            : "",

          // NEW FLAGS
          isBreaking: data.isBreaking ?? 1,
          isTrending: data.isTrending ?? 1,
          isFeatured: data.isFeatured ?? 1,
        });

        setPreview(data.featuredImage || "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchSingle();
  }, [id]);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) {
        data.append("images", image); // must match multer
      }

      await api.patch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, data, {
        ...authHeader,
        headers: {
          ...authHeader.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Updated successfully");
      router.push("/admin/news");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit News</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TITLE */}
            <div>
              <label className="text-sm">Title (Bangla)</label>
              <Input
                name="title_bn"
                value={form.title_bn}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm">Title (English)</label>
              <Input
                name="title_en"
                value={form.title_en}
                onChange={handleChange}
              />
            </div>

            {/* SUMMARY */}
            <div>
              <label className="text-sm">Summary (BN)</label>
              <Textarea
                name="summary_bn"
                value={form.summary_bn}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm">Summary (EN)</label>
              <Textarea
                name="summary_en"
                value={form.summary_en}
                onChange={handleChange}
              />
            </div>

            {/* CONTENT */}
            <div>
              <label className="text-sm">Content (BN)</label>
              <Textarea
                rows={6}
                name="content_bn"
                value={form.content_bn}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm">Content (EN)</label>
              <Textarea
                rows={6}
                name="content_en"
                value={form.content_en}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div className="border p-4 space-y-4 rounded-sm">
            <h2 className="text-sm font-semibold">News Flags</h2>

            {/* BREAKING */}
            <div className="flex justify-between text-sm">
              <span>Breaking</span>
              <div className="flex gap-3">
                <label>
                  <input
                    type="radio"
                    checked={form.isBreaking === 0}
                    onChange={() => setForm((p) => ({ ...p, isBreaking: 0 }))}
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    checked={form.isBreaking === 1}
                    onChange={() => setForm((p) => ({ ...p, isBreaking: 1 }))}
                  />
                  No
                </label>
              </div>
            </div>

            {/* TRENDING */}
            <div className="flex justify-between text-sm">
              <span>Trending</span>
              <div className="flex gap-3">
                <label>
                  <input
                    type="radio"
                    checked={form.isTrending === 0}
                    onChange={() => setForm((p) => ({ ...p, isTrending: 0 }))}
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    checked={form.isTrending === 1}
                    onChange={() => setForm((p) => ({ ...p, isTrending: 1 }))}
                  />
                  No
                </label>
              </div>
            </div>

            {/* FEATURED */}
            <div className="flex justify-between text-sm">
              <span>Featured</span>
              <div className="flex gap-3">
                <label>
                  <input
                    type="radio"
                    checked={form.isFeatured === 0}
                    onChange={() => setForm((p) => ({ ...p, isFeatured: 0 }))}
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    checked={form.isFeatured === 1}
                    onChange={() => setForm((p) => ({ ...p, isFeatured: 1 }))}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="border p-4 space-y-3 rounded-sm">
            <div>
              <label className="text-sm">Slug</label>
              <Input name="slug" value={form.slug} onChange={handleChange} />
            </div>

            <div>
              <label className="text-sm">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Publish</option>
                <option value="scheduled">Schedule</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Publish Date</label>
              <Input
                type="datetime-local"
                name="publishedAt"
                value={form.publishedAt}
                onChange={handleChange}
              />
            </div>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 text-sm rounded-sm"
            >
              <option value="">Select category</option>

              {categories.map((c) => (
                <option key={c.en} value={c.en}>
                  {c.bn}
                </option>
              ))}
            </select>

            <div>
              <label className="text-sm">Tags</label>
              <Input name="tags" value={form.tags} onChange={handleChange} />
            </div>
          </div>

          {/* IMAGE */}
          <div className="border p-4 space-y-3">
            <input type="file" onChange={handleImageChange} />

            {preview && (
              <Image
                width={500}
                height={500}
                alt="update-news"
                src={preview}
                className="w-full h-40 object-cover border"
              />
            )}
          </div>
        </div>
      </div>

      <Button onClick={handleUpdate} className="w-full py-5 cursor-pointer">
        Update News
      </Button>
    </div>
  );
}
