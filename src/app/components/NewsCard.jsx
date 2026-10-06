"use client";

import Link from "next/link";
import { newsUrl } from "@/utils/newsHelpers";

export default function NewsCard({ item }) {
  return (
    <Link href={newsUrl(item)}>
      <div className="group cursor-pointer">
        <img
          src={item.featuredImage}
          className="h-44 w-full object-cover rounded-lg"
        />

        <h3 className="mt-2 font-semibold group-hover:text-blue-600">
          {item.title_bn}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2">{item.summary_bn}</p>
      </div>
    </Link>
  );
}
