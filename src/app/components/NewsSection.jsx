"use client";

import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";

export default function NewsSection({ title, data = [] }) {
  const { lang } = useLanguage();

  // ধরলাম data হচ্ছে array of news
  const mainNews = data?.data || [];

  const sideNews = mainNews.slice(1, 5);
  const firstNews = mainNews[0];
  console.log(firstNews);
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <SectionHeader title={title} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* ================= LEFT BIG CARD ================= */}
        <div className="lg:col-span-2">
          {firstNews && (
            <div>
              <div className="relative w-full h-[260px]">
                <Image
                  src={firstNews?.featuredImage?.[0]}
                  alt={getTranslatedValue(firstNews?.title, lang)}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <h3 className="text-xl font-semibold mt-3 leading-snug">
                {getTranslatedValue(firstNews?.title, lang)}
              </h3>

              <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                {getTranslatedValue(firstNews?.content, lang)}
              </p>
            </div>
          )}
        </div>

        {/* ================= RIGHT SMALL LIST ================= */}
        <div className="space-y-4">
          {sideNews?.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="relative w-24 h-16 flex-shrink-0">
                <Image
                  src={item?.featuredImage?.[0]}
                  alt={getTranslatedValue(item?.title, lang)}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium leading-snug">
                  {getTranslatedValue(item?.title, lang)}
                </h4>

                <p className="text-xs text-gray-500 mt-1">{item?.time || ""}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
