"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getLatestNews } from "@/service/newsApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LatestNews() {
  const [latest, setLatest] = useState([]);
  const { lang } = useLanguage();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const data = await getLatestNews();
        setLatest(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchLatest();
  }, []);

  const t = {
    readMore: {
      en: "Read more →",
      bn: "বিস্তারিত পড়ুন →",
    },
  };
  const title = {
    title: {
      en: "Latest News",
      bn: "সর্বশেষ খবর",
    },
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 md:py-10 pt-4">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl text-center font-bold mb-6 border-y border-red-700 border-dashed text-red-800 py-3">
        {title.title[lang]}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {latest.slice(0, 4).map((item, i) => (
          <div
            key={i}
            className="group bg-white rounded-xs md:rounded-md overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <Link href={`/news/${item?._id || "#"}`}>
              <div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden">
                <Image
                  src={item?.featuredImage?.[0] || "/placeholder.jpg"}
                  alt={getTranslatedValue(item?.title, lang) || "news"}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </Link>

            {/* Content */}
            <div className="p-3 sm:p-4 flex flex-col gap-2">
              {/* Title */}
              <Link href={`/news/${item?._id || "#"}`}>
                <h3 className="font-semibold text-sm sm:text-[15px] leading-snug line-clamp-2 group-hover:text-red-700 transition">
                  {getTranslatedValue(item?.title, lang)}
                </h3>
              </Link>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                {getTranslatedValue(item?.content, lang) ||
                  "No description available"}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between md:mt-2">
                <span className="text-[11px] sm:text-xs text-gray-500">
                  {item?.time || "Just now"}
                </span>

                <Link
                  className="hidden md:block"
                  href={`/news/${item?._id || "#"}`}
                >
                  <span className="text-[11px] sm:text-sm underline hover:text-blue-500 transition">
                    {t.readMore[lang]}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
