"use client";

import Link from "next/link";
import { Facebook, Twitter, Link as LinkIcon, Share2 } from "lucide-react";

const news = {
  title_bn:
    "বাংলাদেশে নতুন প্রযুক্তি বিপ্লব: ডিজিটাল ইকোনমিতে বড় পরিবর্তনের ইঙ্গিত",
  featuredImage: "/news03.jpg",
  author: "Mazharul Islam",
  date: "2026-05-04",
  category: "Technology",
  content: `
বাংলাদেশে প্রযুক্তি খাতে নতুন এক যুগের সূচনা হতে যাচ্ছে।
AI, Cloud এবং Fintech খাতে দ্রুত উন্নয়ন ঘটছে।

স্টার্টআপ ইকোসিস্টেম এবং বিদেশি বিনিয়োগ এই পরিবর্তনকে আরও ত্বরান্বিত করছে।
  `,
};

const latestNews = [
  {
    _id: "1",
    title: "ঢাকায় নতুন আইটি পার্ক উদ্বোধন করা হয়েছে",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    slug: "news-1",
  },
  {
    _id: "2",
    title: "AI প্রযুক্তি নিয়ে বাংলাদেশে নতুন উদ্যোগ",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    slug: "news-2",
  },
  {
    _id: "3",
    title: "স্টার্টআপ ফান্ড বাড়ানোর ঘোষণা",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    slug: "news-3",
  },
  {
    _id: "4",
    title: "ডিজিটাল বাংলাদেশ 2.0 রোডম্যাপ প্রকাশ",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    slug: "news-4",
  },
  {
    _id: "5",
    title: "ফিনটেক সেক্টরে বড় বিনিয়োগ আসছে",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    slug: "news-5",
  },
];

export default function NewsDetailsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT CONTENT */}
      <div className="lg:col-span-2">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {news.category}
        </p>

        <div className="flex items-start justify-between gap-4 mt-2">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            {news.title_bn}
          </h1>

          {/* Social Share */}
          <div className="flex gap-2 mt-1">
            <button className="p-2 border rounded-full hover:bg-blue-50">
              <Facebook size={16} />
            </button>
            <button className="p-2 border rounded-full hover:bg-blue-50">
              <Twitter size={16} />
            </button>
            <button className="p-2 border rounded-full hover:bg-blue-50">
              <LinkIcon size={16} />
            </button>
            <button className="p-2 border rounded-full hover:bg-blue-50">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Meta */}
        <div className="flex gap-3 text-sm text-gray-500 mt-3">
          <span>By {news.author}</span>
          <span>•</span>
          <span>{news.date}</span>
        </div>

        {/* Image */}
        <div className="mt-6 rounded-md overflow-hidden">
          <img
            src={news.featuredImage}
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="mt-8 text-gray-700 leading-relaxed whitespace-pre-line text-[16px]">
          {news.content}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Latest News</h2>

        <div className="flex flex-col gap-2 ">
          {latestNews.map((item) => (
            <Link key={item._id} href={`/news/${item.slug}`}>
              <div className="flex gap-3 group cursor-pointer">
                <img
                  src={item.image}
                  className="w-20 h-16 object-cover rounded-xs"
                />
                <p className="text-sm line-clamp-2 group-hover:text-blue-600">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
