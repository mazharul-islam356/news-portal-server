"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getNewsByCategory } from "@/service/newsApi";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { useLanguage } from "@/context/lagnguageContext";
import Link from "next/link";

export default function World() {
  const [world, setWorld] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNewsByCategory("world", "en");
        setWorld(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load world news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const newsData = world?.data || [];

  const leftNews = newsData.slice(0, 3);
  const featured = newsData[3];
  const rightNews = newsData.slice(4, 7);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-6 w-32 bg-gray-300 mb-6 rounded"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
            ))}
          </div>

          {/* Center */}
          <div className="h-64 bg-gray-300 rounded"></div>

          {/* Right */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
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
      en: "World",
      bn: "বিশ্ব",
    },
  };

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* TITLE */}
        <h2 className="text-xl sm:text-2xl font-bold border-b-2 border-red-500 inline-block mb-6 sm:mb-8">
          {t.title[lang]}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="space-y-4 hidden md:block sm:space-y-5">
            {leftNews.map((news, i) => (
              <div
                key={i}
                className="flex gap-3 sm:gap-4 border-b pb-3 sm:pb-4"
              >
                <div className="flex-1">
                  <Link href={`/news/${news?._id || "#"}`}>
                    <h3 className="text-sm sm:text-base font-medium leading-snug line-clamp-2">
                      {getTranslatedValue(news?.title, lang)}
                    </h3>
                  </Link>

                  <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
                    {news?.createdAt ? "কিছু সময় আগে" : ""}
                  </p>
                </div>

                <Link href={`/news/${news?._id || "#"}`}>
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    width={120}
                    height={80}
                    alt={getTranslatedValue(news?.title, lang)}
                    className="rounded object-cover w-[90px] sm:w-[120px] h-[60px] sm:h-[80px]"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* CENTER FEATURED */}
          <div className="lg:border-l lg:border-r lg:border-gray-300 lg:px-4">
            {featured && (
              <Link href={`/news/${featured?._id || "#"}`}>
                <div className="relative w-full h-52 sm:h-64 md:h-72">
                  <Link href={`/news/${featured?._id || "#"}`}>
                    <Image
                      src={featured?.featuredImage?.[0] || "/placeholder.jpg"}
                      fill
                      alt={getTranslatedValue(featured?.title, lang)}
                      className="rounded object-cover"
                    />
                  </Link>

                  <div className="absolute top-2.5 left-3 bg-red-600 p-2 rounded-full text-white text-xs">
                    📷
                  </div>
                </div>
                <Link href={`/news/${featured?._id || "#"}`}>
                  <h2 className="text-lg sm:text-xl font-semibold mt-4 leading-snug line-clamp-2">
                    {getTranslatedValue(featured?.title, lang)}
                  </h2>
                </Link>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {getTranslatedValue(featured?.content, lang)}
                </p>

                <p className="text-xs text-gray-500 mt-2">২১ মিনিট আগে</p>
              </Link>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-4 sm:space-y-5 mt-2 lg:mt-0">
            {rightNews.map((news, i) => (
              <div
                key={i}
                className="flex gap-3 sm:gap-4 border-b pb-3 sm:pb-4"
              >
                <div className="flex-1">
                  <Link href={`/news/${news?._id || "#"}`}>
                    <h3 className="text-sm sm:text-base font-medium leading-snug line-clamp-2">
                      {getTranslatedValue(news?.title, lang)}
                    </h3>
                  </Link>

                  <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
                    কিছু সময় আগে
                  </p>
                </div>

                <Link href={`/news/${news?._id || "#"}`}>
                  <Image
                    src={news?.featuredImage?.[0] || "/placeholder.jpg"}
                    width={120}
                    height={80}
                    alt={getTranslatedValue(news?.title, lang)}
                    className="rounded object-cover w-[90px] sm:w-[120px] h-[60px] sm:h-[80px]"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
