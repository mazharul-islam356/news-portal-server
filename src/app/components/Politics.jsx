"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getNewsByCategory } from "@/service/newsApi";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PoliticsPage() {
  const [politics, setPolitics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lang } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNewsByCategory("politics", "en");

        setPolitics(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const newsData = politics?.data || [];
  const firstTwo = newsData.slice(0, 2);
  const lastFour = newsData.slice(2, 6);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-6 w-40 bg-gray-300 mb-6 rounded"></div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="h-40 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 mt-3 w-3/4 rounded"></div>
                <div className="h-3 bg-gray-300 mt-2 w-full rounded"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-24 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 mt-2 w-3/4 rounded"></div>
              </div>
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold border-b-2 border-red-500 inline-block mb-8">
        রাজনীতি
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="col-span-2 flex gap-4">
          {firstTwo.map((news, i) => (
            <div key={i} className="w-1/2">
              <Image
                className="h-56 object-cover w-full"
                src={news?.featuredImage?.[0]}
                width={400}
                height={300}
                alt={getTranslatedValue(news?.title, lang)}
              />

              <h3 className="text-xl font-semibold mt-4">
                {getTranslatedValue(news?.title, lang)}
              </h3>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {getTranslatedValue(news?.content, lang)}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-4">
          {lastFour.map((news, i) => (
            <div key={i}>
              <Image
                src={news?.featuredImage?.[0]}
                width={200}
                height={120}
                className="rounded-sm h-32 object-cover"
                alt={getTranslatedValue(news?.title, lang)}
              />

              <h4 className="text-sm font-medium mt-2 line-clamp-1">
                {getTranslatedValue(news?.title, lang)}
              </h4>

              <p className="text-xs mt-1 text-gray-500">১৩ মিনিট আগে</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
