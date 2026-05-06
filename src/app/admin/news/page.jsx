"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import axios from "axios";

export default function NewsList() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`);
    setNews(res.data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNews();
    } catch (error) {
      console.error("Delete failed:", error);
    }
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

              <AlertDialog>
                {/* BUTTON */}
                <AlertDialogTrigger asChild>
                  <button className="text-red-500 ">Delete</button>
                </AlertDialogTrigger>

                {/* DIALOG */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the news.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={() => handleDelete(item._id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
