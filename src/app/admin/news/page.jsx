"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewsList() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const res = await api.get("/news");
    setNews(res.data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/news/${id}`);
    fetchNews();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All News</h1>

      <div className="space-y-3">
        {news.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-xl flex justify-between"
          >
            <div>
              <p className="font-semibold">{item.title_bn}</p>
              <p className="text-sm text-gray-500">{item.slug}</p>
            </div>

            <div className="flex gap-2">
              <Link href={`/admin/news/${item._id}`}>
                <Button variant="outline">Edit</Button>
              </Link>

              <Button
                variant="destructive"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
