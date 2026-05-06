"use client";

import Marquee from "react-fast-marquee";
import Link from "next/link";
import { banglaNewsHeadlines } from "@/app/(public)/page";

export default function BreakingTicker() {
  return (
    <div className="bg-red-600 max-w-7xl mx-auto my-4 text-white flex items-center w-full overflow-hidden rounded-xs font-bangla">
      {/* LABEL */}
      <span className="px-4 py-2 font-semibold bg-red-800 whitespace-nowrap flex items-center gap-2">
        {/* Animated dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        Breaking
      </span>

      {/* MARQUEE */}
      <div className="flex-1">
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          <div className="flex items-center gap-6 px-4 py-2">
            {banglaNewsHeadlines.map((item, index) => (
              <div key={item._id} className="flex items-center gap-4">
                <div>
                  <span className=" whitespace-nowrap text-sm">
                    {item.title_bn}
                  </span>
                </div>

                {/* DOT SEPARATOR */}
                {index !== banglaNewsHeadlines.length - 1 && (
                  <span className="text-white/70">●</span>
                )}
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
