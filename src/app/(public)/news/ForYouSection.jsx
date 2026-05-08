"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getNewsByCategory } from "@/service/newsApi";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { useLanguage } from "@/context/lagnguageContext";

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

  // প্রতিটা category থেকে index 3 (4th news)
  const newsData = [
    entertainment[3],
    business[3],
    corruption[3],
    world[3],
  ].filter(Boolean);

  return (
    <section className="pt-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl border-b-2 border-red-700 font-semibold">
            আপনার জন্য
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsData.map((item, index) => (
            <div key={item?._id || index} className="relative bg-white p-4">
              {/* Image */}
              <div className="relative w-full h-44 mb-3">
                <Image
                  src={item?.featuredImage?.[0]}
                  alt={item?.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold mb-2 leading-snug text-black">
                {item?.title?.[lang]}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-2 text-ellipsis line-clamp-3">
                {item?.content?.[lang]}
              </p>
              {/* Time */}
              <span className="text-xs text-gray-400">
                {/* {item?.time || "just now"} */} just now
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
