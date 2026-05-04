"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import BreakingTicker from "../components/news/BreakingTicker";
import HeroSection from "../components/HeroBanner";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import Politics from "./news/Politics";
import BusinessPage from "../components/Politics";
import PoliticsPage from "../components/Politics";
import WorldPage from "../components/World";
import National from "../components/National";
export const categories = [
  { name: "Politics", slug: "politics" },
  { name: "Technology", slug: "technology" },
  { name: "Sports", slug: "sports" },
  { name: "International", slug: "international" },
  { name: "Business", slug: "business" },
  { name: "Entertainment", slug: "entertainment" },
];

export const banglaNewsHeadlines = [
  {
    _id: "1",
    slug: "news-1",
    title_bn: "ঢাকায় নতুন মেট্রো রেল প্রকল্পের দ্বিতীয় ধাপ উদ্বোধন",
  },
  {
    _id: "2",
    slug: "news-2",
    title_bn: "দেশে ইন্টারনেট সেবায় বড় আপগ্রেড আনা হচ্ছে",
  },
  {
    _id: "3",
    slug: "news-3",
    title_bn: "জাতীয় ক্রিকেট লীগ আজ থেকে শুরু হয়েছে",
  },
  {
    _id: "4",
    slug: "news-4",
    title_bn: "AI প্রযুক্তিতে বাংলাদেশের অগ্রগতি দ্রুত বাড়ছে",
  },
];
export default function HomePage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    api.get("/news").then((res) => setNews(res.data));
  }, []);

  const featured = news[0];

  const trending = [...news]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto py-5 space-y-5">
      {/* 🔴 Breaking */}
      <BreakingTicker news={news.slice(0, 5)} />

      {/* 🧨 Hero */}
      <HeroSection featured={featured} />
      <Politics />
      <PoliticsPage />
      <WorldPage />
      <National />
    </div>
  );
}
