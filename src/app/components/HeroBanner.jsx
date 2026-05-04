"use client";

import Link from "next/link";

const dummyFeatured = {
  featuredImage: "/newsimage.jpg",
  title_bn: "আজকের প্রধান শিরোনাম এখানে থাকবে যা ফিচার্ড নিউজ হিসেবে দেখাবে",
  slug: "featured-news",
};

const dummyHighlights = [
  {
    _id: "1",
    slug: "news-1",
    featuredImage:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    title_bn: "প্রথম হাইলাইট নিউজের শিরোনাম এখানে থাকবে দুই লাইনে ভেঙে দেখাবে",
  },
  {
    _id: "2",
    slug: "news-2",
    featuredImage:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e",
    title_bn: "দ্বিতীয় হাইলাইট নিউজ এখানে থাকবে যা গুরুত্বপূর্ণ আপডেট দেখাবে",
  },
  {
    _id: "3",
    slug: "news-3",
    featuredImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title_bn: "তৃতীয় হাইলাইট নিউজের টাইটেল এখানে দেখাবে",
  },
  {
    _id: "4",
    slug: "news-4",
    featuredImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title_bn: "চতুর্থ হাইলাইট নিউজের টাইটেল এখানে দেখাবে",
  },
];

export default function HeroSection() {
  const featured = dummyFeatured;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-bangla">
      {/* LEFT: Featured News */}
      <div className="lg:col-span-2 relative">
        <div className="relative overflow-hidden rounded-md">
          <img
            src={featured.featuredImage}
            className="w-full h-[420px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold leading-snug">
              {featured.title_bn}
            </h1>

            <Link href={`/news/${featured.slug}`}>
              <span className="inline-block mt-3 text-sm underline hover:text-blue-300 transition">
                বিস্তারিত পড়ুন →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT: Highlights */}
      <div className="flex flex-col gap-2.5">
        {dummyHighlights.map((item) => (
          <Link key={item._id} href={`/news/${item.slug}`}>
            <div className="flex gap-3 group cursor-pointer bg-white border border-gray-100 rounded-lg p-2 hover:shadow-md transition ">
              <img
                src={item.featuredImage}
                className="w-28 h-20 object-cover rounded-sm flex-shrink-0"
              />

              <div className="flex flex-col justify-center">
                <p className="text-sm font-medium line-clamp-2 group-hover:text-red-600 font-bangla">
                  {item.title_bn}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
