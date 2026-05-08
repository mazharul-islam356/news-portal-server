"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getNewsByCategory } from "@/service/newsApi";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { useLanguage } from "@/context/lagnguageContext";

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

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
            ))}
          </div>

          <div className="h-64 bg-gray-300 rounded"></div>

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

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* TITLE */}
        <h2 className="text-2xl font-bold border-b-2 border-red-500 inline-block mb-8">
          বিশ্ব
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="space-y-5">
            {leftNews.map((news, i) => (
              <div key={i} className="flex gap-4 border-b pb-4">
                <div className="flex-1">
                  <h3 className="text-base font-medium leading-snug">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    {news?.createdAt ? "কিছু সময় আগে" : ""}
                  </p>
                </div>

                <Image
                  src={news?.featuredImage?.[0]}
                  width={120}
                  height={80}
                  alt=""
                  className="rounded object-cover"
                />
              </div>
            ))}
          </div>

          {/* CENTER FEATURED */}
          <div className="border-l border-r border-gray-400 px-4">
            {featured && (
              <div>
                <div className="relative">
                  <Image
                    src={featured?.featuredImage?.[0]}
                    width={600}
                    height={350}
                    alt={getTranslatedValue(featured?.title, lang)}
                    className="rounded w-full h-52 object-cover"
                  />

                  <div className="absolute top-3 left-3 bg-red-600 p-2 rounded-full text-white">
                    📷
                  </div>
                </div>

                <h2 className="text-xl font-semibold mt-4 leading-snug">
                  {getTranslatedValue(featured?.title, lang)}
                </h2>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {getTranslatedValue(featured?.content, lang)}
                </p>

                <p className="text-xs text-gray-500 mt-2">২১ মিনিট আগে</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            {rightNews.map((news, i) => (
              <div key={i} className="flex gap-4 border-b pb-4">
                <div className="flex-1">
                  <h3 className="text-base font-medium leading-snug">
                    {getTranslatedValue(news?.title, lang)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">কিছু সময় আগে</p>
                </div>

                <Image
                  src={news?.featuredImage?.[0]}
                  width={120}
                  height={80}
                  alt=""
                  className="rounded object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
