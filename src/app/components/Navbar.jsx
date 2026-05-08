"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import StickyBottomNav from "./StickyBottomNav";
import Link from "next/link";
import { useLanguage } from "@/context/lagnguageContext";
import { getBreakingTopNews } from "@/service/newsApi";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";

export default function NewsNavbar() {
  const [time, setTime] = useState(new Date());
  const categories = [
    { name: { bn: "বাংলাদেশ", en: "Bangladesh" }, slug: "bangladesh" },
    { name: { bn: "বিশ্ব", en: "World" }, slug: "world" },
    { name: { bn: "আন্তর্জাতিক", en: "International" }, slug: "international" },

    { name: { bn: "রাজনীতি", en: "Politics" }, slug: "politics" },
    { name: { bn: "দুর্নীতি", en: "corruption" }, slug: "corruption" },
    { name: { bn: "মতামত", en: "Opinion" }, slug: "opinion" },

    { name: { bn: "বাণিজ্য", en: "Business" }, slug: "business" },
    { name: { bn: "অর্থনীতি", en: "Economy" }, slug: "economy" },
    { name: { bn: "জাতীয়", en: "National" }, slug: "national" },

    { name: { bn: "প্রযুক্তি", en: "Technology" }, slug: "technology" },
    { name: { bn: "বিজ্ঞান", en: "Science" }, slug: "science" },

    { name: { bn: "খেলা", en: "Sports" }, slug: "sports" },

    { name: { bn: "বিনোদন", en: "Entertainment" }, slug: "entertainment" },
    { name: { bn: "লাইফস্টাইল", en: "Lifestyle" }, slug: "lifestyle" },

    { name: { bn: "শিক্ষা", en: "Education" }, slug: "education" },
    { name: { bn: "চাকরি", en: "Jobs" }, slug: "jobs" },

    { name: { bn: "ধর্ম", en: "Religion" }, slug: "religion" },

    // ➕ Newly added useful categories
    { name: { bn: "স্বাস্থ্য", en: "Health" }, slug: "health" },
    { name: { bn: "পরিবেশ", en: "Environment" }, slug: "environment" },
    { name: { bn: "অপরাধ", en: "Crime" }, slug: "crime" },
    { name: { bn: "আইন ও আদালত", en: "Law & Court" }, slug: "law-court" },
    { name: { bn: "গণমাধ্যম", en: "Media" }, slug: "media" },
    { name: { bn: "প্রবাস", en: "Diaspora" }, slug: "diaspora" },
  ];
  const [top, setTop] = useState([]);
  const { lang } = useLanguage();

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const data = await getBreakingTopNews();
        console.log(data);
        setTop(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching top news:", error);
      }
    };

    fetchTop();
  }, []);

  const mainNews = top[0];
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="w-full max-w-7xl mx-auto  border-b bg-white">
      <div className="hidden md:block">
        {/* TOP BAR */}
        <div className="relative flex items-center justify-between py-4 border-b">
          {/* LEFT: LOGO */}
          <Link href="/" className="flex items-center w-24">
            <Image
              src="/newsportalLogo.png"
              alt="logo"
              width={160}
              height={160}
            />
          </Link>

          {/* CENTER: DATE + TIME (ABSOLUTE CENTER FIX) */}
          <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2  text-center text-sm text-slate-800">
            <div className="flex items-center justify-center gap-2 text-base font-semibold">
              <Calendar size={16} />
              <span className="font-poppins">{formattedDate}</span>
            </div>

            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
              <Clock size={14} />
              <span className="font-poppins">{formattedTime}</span>
            </div>
          </div>

          {/* RIGHT: BREAKING NEWS */}
          <div className="flex items-center gap-3 max-w-xs">
            <div className="flex items-center gap-3 bg-gray-50 border rounded-md px-3 py-2">
              {/* IMAGE */}
              <div className="relative  overflow-hidden rounded">
                <Image
                  width={400}
                  height={400}
                  src={mainNews?.featuredImage[0] || ""}
                  alt="news"
                  // fill
                  className="object-cover w-40 h-16"
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-col">
                <p className="text-sm font-bangla text-gray-700 line-clamp-2">
                  {getTranslatedValue(mainNews?.title, lang)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY NAV */}
      <StickyBottomNav categories={categories} />
    </header>
  );
}
