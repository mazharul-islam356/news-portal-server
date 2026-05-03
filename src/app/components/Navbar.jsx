"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import StickyBottomNav from "./StickyBottomNav";
import Link from "next/link";

export default function NewsNavbar() {
  const [time, setTime] = useState(new Date());
  const categories = [
    { name: "রাজনীতি", slug: "politics" },
    { name: "প্রযুক্তি", slug: "technology" },
    { name: "খেলা", slug: "sports" },
    { name: "আন্তর্জাতিক", slug: "international" },
    { name: "বাণিজ্য", slug: "business" },
    { name: "বিনোদন", slug: "entertainment" },
  ];
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
      <div>
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
          <div className="absolute left-1/2 transform -translate-x-1/2  text-center text-sm text-slate-800">
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
                <img
                  src="https://images.unsplash.com/photo-1495020689067-958852a7765e"
                  alt="news"
                  // fill
                  className="object-cover w-20 h-16"
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-col">
                <p className="text-sm font-bangla text-gray-700 line-clamp-2">
                  ঢাকায় আসছে নারীদের জন্য বিশেষ বাস সার্ভিস চালু হচ্ছে
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
