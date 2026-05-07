"use client";
import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { getLatestNews } from "@/service/newsApi";
import Image from "next/image";
import { useEffect, useState } from "react";
// lib/newsData.js
export const featuredNews = [
  {
    title: "ইরান ইস্যুতে নতুন উত্তেজনা শুরু",
    description:
      "মধ্যপ্রাচ্যে আবারও উত্তেজনা বেড়েছে, বিভিন্ন দেশ উদ্বেগ প্রকাশ করেছে...",
    image: "/news01.jpg",
    time: "২ ঘণ্টা আগে",
  },
  {
    title: "বাংলাদেশে বিনিয়োগ বাড়ছে",
    description:
      "বিদেশি বিনিয়োগকারীরা নতুন করে আগ্রহ দেখাচ্ছে দেশের শিল্পখাতে...",
    image: "/news02.jpg",
    time: "৪ ঘণ্টা আগে",
  },
  {
    title: "নতুন প্রযুক্তি বাজারে আসছে",
    description: "বিশ্বের বড় বড় কোম্পানি নতুন AI প্রযুক্তি নিয়ে কাজ করছে...",
    image: "/news03.jpg",
    time: "৬ ঘণ্টা আগে",
  },
  {
    title: "খেলাধুলায় নতুন রেকর্ড",
    description:
      "আন্তর্জাতিক ম্যাচে অসাধারণ পারফরম্যান্স দেখিয়ে রেকর্ড গড়লো...",
    image: "/news04.jpg",
    time: "৮ ঘণ্টা আগে",
  },
];
export default function LatestNews() {
  const [latest, setlatest] = useState([]);

  const { lang } = useLanguage();
  // latest api
  useEffect(() => {
    const fetchlatest = async () => {
      try {
        const data = await getLatestNews();
        setlatest(data);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchlatest();
  }, []);
  const title = "সর্বশেষ খবর";
  return (
    <section className="max-w-7xl mx-auto py-10">
      {/* Section Title */}
      <h2 className="text-2xl text-center font-bold mb-6 border-y border-red-700 border-dashed text-red-800 py-3">
        {title}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latest.slice(0, 4).map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative w-full h-48">
              <Image
                src={item.featuredImage[0]}
                alt={item.title_bn}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-base leading-snug line-clamp-2">
                {getTranslatedValue(item.title, lang)}
              </h3>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {item.description}
              </p>

              <p className="text-xs text-gray-500 mt-3">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
