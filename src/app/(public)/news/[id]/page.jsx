"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Link as LinkIcon,
  Share2,
  PenLine,
} from "lucide-react";
import { useLanguage } from "@/context/lagnguageContext";

// helpers
import {
  formatDateTime,
  shareOnFacebook,
  shareOnTwitter,
  copyLink,
} from "@/utils/newsHelpers";
import Image from "next/image";

export default function NewsDetailsPage() {
  const { id } = useParams();
  const pathname = usePathname();
  const { lang } = useLanguage();

  const [news, setNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fullUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [newsRes, latestRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/news/${id}`),
          axios.get(`http://localhost:5000/api/news`),
        ]);

        setNews(newsRes.data);
        setLatestNews(latestRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] bg-white py-20">
        <div className="flex space-x-1.5">
          <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-bounce"></span>
          <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-bounce [animation-delay:0.1s]"></span>
          <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        </div>

        <p className="mt-3 text-sm text-gray-600 font-medium">
          Loading data data...
        </p>
      </div>
    );
  }

  if (!news) {
    return <div className="text-center py-20 text-red-500">News not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT CONTENT */}
      <div className="lg:col-span-2">
        {/* CATEGORY */}
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {news.category?.[lang]}
        </p>

        {/* TITLE + SHARE */}
        <div className="flex items-start justify-between gap-4 mt-2">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            {news.title?.[lang]}
          </h1>

          <div className="flex gap-2 mt-1">
            {/* Facebook */}
            <button
              onClick={() => shareOnFacebook(fullUrl)}
              className="p-2 rounded-full bg-[#1877F2] text-white cursor-pointer hover:opacity-90 transition"
            >
              <Facebook size={16} />
            </button>

            {/* Twitter */}
            <button
              onClick={() => shareOnTwitter(fullUrl, news.title?.[lang])}
              className="p-2 rounded-full bg-[#1DA1F2] text-white cursor-pointer hover:opacity-90 transition"
            >
              <Twitter size={16} />
            </button>

            {/* Copy Link */}
            <button
              onClick={() => copyLink(fullUrl)}
              className="p-2 cursor-pointer rounded-full bg-gray-800 text-white hover:opacity-80 transition"
            >
              <LinkIcon size={16} />
            </button>

            {/* Native Share */}
            <button
              onClick={() =>
                navigator.share?.({
                  title: news.title?.[lang],
                  url: fullUrl,
                })
              }
              className="p-2 cursor-pointer rounded-full bg-green-600 text-white hover:opacity-90 transition"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* META */}
        <div className="flex gap-3 text-sm text-gray-500 mt-3">
          <span className="flex items-center gap-1.5">
            <PenLine size={16} /> {news.writer?.[lang]}
          </span>
          <span>•</span>
          <span>{formatDateTime(news.createdAt, lang)}</span>
        </div>

        {/* IMAGE */}
        <div className="mt-6 rounded-md overflow-hidden">
          <Image
            width={500}
            height={500}
            src={news.featuredImage?.[0]}
            className="w-full h-[420px] object-cover"
            alt={news.title?.[lang]}
          />
        </div>

        {/* CONTENT */}
        <div className="mt-8 text-gray-700 leading-relaxed whitespace-pre-line text-[16px]">
          {news.content?.[lang]}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="sticky top-0">
        <h2 className="text-lg font-semibold mb-4">Latest News</h2>

        <div className="flex flex-col gap-3">
          {latestNews.slice(0, 5).map((item) => (
            <Link key={item._id} href={`/news/${item._id}`}>
              <div className="flex gap-3 group cursor-pointer">
                <Image
                  width={500}
                  height={500}
                  src={item.featuredImage?.[0]}
                  className="w-32 h-20 object-cover rounded-xs"
                  alt={item.title?.[lang]}
                />
                <p className="text-sm line-clamp-2 group-hover:text-blue-600">
                  {item.title?.[lang]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
