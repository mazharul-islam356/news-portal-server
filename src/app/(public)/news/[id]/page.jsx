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
  const title = {
    title: {
      en: "Latest News",
      bn: "সর্বশেষ খবর",
    },
  };
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

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="flex space-x-1.5">
          <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-bounce"></span>
          <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-bounce [animation-delay:0.1s]"></span>
          <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        </div>

        <p className="mt-3 text-sm text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  if (!news) {
    return <div className="text-center py-20 text-red-500">News not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
      {/* LEFT CONTENT */}
      <div className="lg:col-span-2">
        {/* CATEGORY */}
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {news.category?.[lang]}
        </p>

        {/* TITLE + SHARE */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mt-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold max-w-xl leading-snug">
            {news.title?.[lang]}
          </h1>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => shareOnFacebook(fullUrl)}
              className="p-2 rounded-full bg-[#1877F2] text-white hover:opacity-90"
            >
              <Facebook size={16} />
            </button>

            <button
              onClick={() => shareOnTwitter(fullUrl, news.title?.[lang])}
              className="p-2 rounded-full bg-[#1DA1F2] text-white hover:opacity-90"
            >
              <Twitter size={16} />
            </button>

            <button
              onClick={() => copyLink(fullUrl)}
              className="p-2 rounded-full bg-gray-800 text-white hover:opacity-80"
            >
              <LinkIcon size={16} />
            </button>

            <button
              onClick={() =>
                navigator.share?.({
                  title: news.title?.[lang],
                  url: fullUrl,
                })
              }
              className="p-2 rounded-full bg-green-600 text-white hover:opacity-90"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* META */}
        <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-500 mt-3">
          <span className="flex items-center gap-1.5">
            <PenLine size={14} /> {news.writer?.[lang]}
          </span>
          <span>•</span>
          <span>{formatDateTime(news.createdAt, lang)}</span>
        </div>

        {/* IMAGE */}
        <div className="mt-5 sm:mt-6 rounded-md overflow-hidden">
          <Image
            src={news.featuredImage?.[0] || "/placeholder.jpg"}
            width={1000}
            height={600}
            alt={news.title?.[lang]}
            className="w-full h-56 sm:h-80 md:h-[420px] object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="mt-6 sm:mt-8 text-gray-700 leading-relaxed text-[15px] sm:text-[16px] whitespace-pre-line">
          {news.content?.[lang]}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full lg:sticky lg:top-5 h-fit mt-8 lg:mt-0">
        <h2 className="text-base md:text-xl text-red-700 font-semibold mb-4">
          {title.title[lang]}
        </h2>

        <div className="flex flex-col gap-3">
          {latestNews.slice(0, 5).map((item) => (
            <Link key={item._id} href={`/news/${item._id}`}>
              <div className="flex gap-3 group cursor-pointer">
                <Image
                  src={item.featuredImage?.[0] || "/placeholder.jpg"}
                  width={120}
                  height={80}
                  className="w-24 sm:w-28 h-16 sm:h-20 object-cover rounded-sm"
                  alt={item.title?.[lang]}
                />

                <p className="text-xs sm:text-sm line-clamp-2 group-hover:text-red-600 transition">
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
