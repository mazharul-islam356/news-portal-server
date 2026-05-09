"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getNewsByCategory } from "@/service/newsApi";
import { useLanguage } from "@/context/lagnguageContext";
import Link from "next/link";

export default function ForYouSection() {
  const [entertainment, setEntertainment] = useState([]);
  const [business, setBusiness] = useState([]);
  const [corruption, setCorruption] = useState([]);
  const [world, setWorld] = useState([]);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [e, b, c, w] = await Promise.all([
          getNewsByCategory("entertainment", "en"),
          getNewsByCategory("business", "en"),
          getNewsByCategory("politics", "en"),
          getNewsByCategory("world", "en"),
        ]);

        setEntertainment(e?.data || []);
        setBusiness(b?.data || []);
        setCorruption(c?.data || []);
        setWorld(w?.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const newsData = [
    entertainment[3],
    business[3],
    corruption[3],
    world[3],
  ].filter(Boolean);

  const t = {
    title: {
      en: "For you",
      bn: "আপনার জন্য",
    },
  };

  return (
    <section className="w-full py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl sm:text-2xl border-b-2 border-red-700 font-semibold pb-1">
            {t.title[lang]}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {newsData.map((item, index) => (
            <div
              key={item?._id || index}
              className="bg-white rounded-sm sm:rounded-md overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <Link href={`/news/${item?._id || "#"}`}>
                <div className="relative w-full h-40 sm:h-44 md:h-48">
                  <Image
                    src={item?.featuredImage?.[0] || "/placeholder.jpg"}
                    alt={item?.title?.[lang] || "news"}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-3 sm:p-4">
                {/* Title */}
                <Link href={`/news/${item?._id || "#"}`}>
                  <h3 className="text-sm sm:text-base font-semibold mb-2 leading-snug line-clamp-2">
                    {item?.title?.[lang]}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-3">
                  {item?.content?.[lang]}
                </p>

                {/* Time */}
                <span className="text-[11px] sm:text-xs text-gray-400">
                  just now
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
