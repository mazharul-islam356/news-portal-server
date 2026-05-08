"use client";

import { getNewsByCategory } from "@/service/newsApi";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/lagnguageContext";
import Link from "next/link";

export default function Entertainment() {
  const [entertainment, setEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNewsByCategory("entertainment", "en");
        setEntertainment(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load entertainment news");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const newsData = entertainment?.data || [];
  const { lang } = useLanguage();

  const mainNews = newsData[0];
  const sideNews = newsData.slice(1, 4);
  const gridNews = newsData.slice(4, 8);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen animate-pulse">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="h-6 w-40 bg-gray-300 mx-auto mb-8"></div>

          <div className="grid lg:grid-cols-4 gap-5">
            <div className="lg:col-span-3 h-72 bg-gray-300 rounded"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-300 rounded"></div>
              ))}
            </div>

            <div className="lg:col-span-4 grid md:grid-cols-4 gap-5 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- ERROR ----------------
  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const t = {
    readMore: {
      en: "Entertainment",
      bn: "বিনোদন",
    },
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-5 md:py-10">
        <h2 className="flex items-center justify-center gap-3 text-2xl font-bold text-center md:mb-8 mb-5">
          <span className="w-2 h-2 bg-red-700 rounded-full"></span>

          <span className="px-3 border-x border-red-700">
            {t.readMore[lang]}
          </span>

          <span className="w-2 h-2 bg-red-700 rounded-full"></span>
        </h2>

        <div className="grid lg:grid-cols-4 gap-x-5">
          {/* BIG LEFT */}
          <div className="lg:col-span-3 bg-white p-5 rounded shadow-sm">
            {mainNews && (
              <Link href={`/news/${mainNews?._id || "#"}`}>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 text-ellipsis line-clamp-2 text-center md:text-left">
                  {getTranslatedValue(mainNews?.title, lang)}
                </h2>

                <div className="w-full h-40 md:h-72">
                  <Image
                    src={mainNews?.featuredImage?.[0]}
                    width={400}
                    height={300}
                    className="rounded w-full h-full object-cover"
                    alt={getTranslatedValue(mainNews?.title, lang)}
                  />
                </div>
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="md:space-y-4 space-y-2">
            {sideNews.slice(0, 3).map((news, i) => (
              <Link
                href={`/news/${news?._id || "#"}`}
                key={i}
                className="flex gap-3 bg-white p-3 rounded shadow-sm h-28"
              >
                <Image
                  src={news?.featuredImage?.[0]}
                  width={100}
                  height={70}
                  alt=""
                  className="rounded-sm object-cover"
                />
                <p className="text-sm text-ellipsis line-clamp-2">
                  {getTranslatedValue(news?.title, lang)}
                </p>
              </Link>
            ))}
          </div>

          {/* GRID BELOW */}
          <div className="lg:col-span-4  md:grid-cols-4 gap-5 mt-4 hidden md:grid">
            {gridNews.map((news, i) => (
              <Link
                href={`/news/${news?._id || "#"}`}
                key={i}
                className="bg-white p-3 rounded shadow-sm "
              >
                <Image
                  src={news?.featuredImage?.[0]}
                  width={300}
                  height={180}
                  className="rounded-sm h-44 w-full object-cover"
                  alt=""
                />
                <h4 className="text-sm text-ellipsis line-clamp-1 font-medium mt-3">
                  {getTranslatedValue(news?.title, lang)}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
