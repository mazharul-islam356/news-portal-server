"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/lagnguageContext";
import { getNewsByCategory } from "@/service/newsApi";
import Link from "next/link";

export default function NewsSection() {
  const [entertainment, setEntertainment] = useState([]);
  const [corruption, setCorruption] = useState([]);
  const [national, setNational] = useState([]);

  const { lang } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 3 ta category ekshathe fetch
        const [entertainmentData, corruptionData, nationalData] =
          await Promise.all([
            getNewsByCategory("entertainment", "en"),
            getNewsByCategory("corruption", "en"),
            getNewsByCategory("national", "en"),
          ]);

        setEntertainment(entertainmentData?.data || []);
        setCorruption(corruptionData?.data || []);
        setNational(nationalData?.data || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ===== TOP BIG CARD =====
  // sob category er 0 index data
  const largeNews = [entertainment[0], corruption[0], national[0]].filter(
    Boolean,
  );

  // ===== BOTTOM SMALL CARD =====
  // sob category er 1 index data
  const smallNews = [entertainment[1], corruption[1], national[1]].filter(
    Boolean,
  );

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* ===== TOP GRID (BIG CARD) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-200">
        {largeNews.map((item, index) => (
          <div
            key={item?._id || index}
            className="p-4 border-b lg:border-b-0 md:border-r group cursor-pointer"
          >
            {/* Category + Date */}
            <div className="mb-3">
              <p className="text-red-600 text-sm font-semibold">
                {item?.category[lang] || item?.category}
              </p>

              <p className="text-xs text-gray-500">
                {new Date(item?.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Image */}
            <Link
              href={`/news/${item?._id || "#"}`}
              className="overflow-hidden"
            >
              <Image
                src={item?.featuredImage[0]}
                alt={item?.title}
                width={600}
                height={400}
                className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-300"
              />
            </Link>

            {/* Title */}
            <Link href={`/news/${item?._id || "#"}`}>
              <h2 className="mt-4 text-xl font-semibold leading-snug group-hover:text-red-600 transition">
                {typeof item?.title === "object"
                  ? item?.title?.[lang]
                  : item?.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t my-5"></div>

      {/* ===== BOTTOM GRID (SMALL CARD) ===== */}
      <div className=" grid-cols-1 hidden md:grid md:grid-cols-2 lg:grid-cols-3 border border-gray-200">
        {smallNews.map((item, index) => (
          <div
            key={item?._id || index}
            className="flex gap-4 md:items-center p-4 border-b lg:border-b-0 md:border-r group cursor-pointer"
          >
            {/* Image */}
            <Link href={`/news/${item?._id || "#"}`}>
              <Image
                src={item?.featuredImage[0]}
                alt={item?.title}
                width={120}
                height={100}
                className="w-[110px] h-[90px] object-cover rounded-sm"
              />
            </Link>

            {/* Content */}
            <div>
              <Link href={`/news/${item?._id || "#"}`}>
                <h3 className="text-base font-semibold leading-snug group-hover:text-red-600 transition">
                  {typeof item?.title === "object"
                    ? item?.title?.[lang]
                    : item?.title}
                </h3>
              </Link>

              <p className="text-xs text-gray-500 mt-1">
                {new Date(item?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
