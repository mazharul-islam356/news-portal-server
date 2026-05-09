"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import AdBanner from "@/app/components/AdBanner";
import ForYouSection from "../../news/ForYouSection";
import { getNewsByCategory } from "@/service/newsApi";
import { useLanguage } from "@/context/lagnguageContext";
import { useParams } from "next/navigation";
import { Calendar, PenLine } from "lucide-react";

export default function NewsPage() {
  const params = useParams();

  const slug = params?.slug;
  console.log(slug);
  const { lang } = useLanguage();

  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await getNewsByCategory(slug, "en");
        console.log(data);
        setNews(data?.data || data || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadNews();
  }, [slug, lang]);
  console.log(news);
  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <AdBanner imageUrl="/6211266836143166852.gif" />

      {/* PAGE TITLE */}
      <div className="py-6 border-b mb-6">
        <h1 className="text-3xl font-bold capitalize text-red-600">
          {slug} News
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2 space-y-8">
          {/* TOP NEWS */}
          {news[0] && (
            <Link href={`/news/${news[0]._id}`}>
              <div className="group cursor-pointer">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={news[0]?.featuredImage?.[0] || "/news02.jpg"}
                    alt=""
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <h2 className="text-3xl font-bold mt-4 group-hover:text-red-500 transition">
                  {news[0]?.title?.[lang]}
                </h2>

                <p className="text-gray-600 mt-3 line-clamp-3">
                  {news[0]?.content?.[lang]
                    ?.replace(/[#*]/g, "")
                    ?.slice(0, 250)}
                  ...
                </p>

                <div className="flex items-center gap-2 mb-4 mt-2 text-sm text-gray-500">
                  <PenLine size={15} />
                  <span>{news[0]?.writer?.[lang]}</span>

                  <span>
                    <Calendar size={15} />
                  </span>

                  <span>
                    {new Date(news[0]?.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* NEWS LIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.slice(1, 7).map((item) => (
              <Link href={`/news/${item._id}`} key={item._id}>
                <div className="group cursor-pointer border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition duration-300 bg-white h-full flex flex-col">
                  {/* IMAGE */}
                  <div className="relative w-full h-44 overflow-hidden">
                    <Image
                      src={item?.featuredImage?.[0] || "/news04.jpg"}
                      alt={item?.title?.[lang]}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-bold leading-snug group-hover:text-red-500 transition line-clamp-2">
                      {item?.title?.[lang]}
                    </h3>

                    <p className="text-gray-600 text-sm mt-3 line-clamp-3 flex-1">
                      {item?.content?.[lang]
                        ?.replace(/[#*]/g, "")
                        ?.slice(0, 150)}
                      ...
                    </p>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between mt-4 text-xs md:text-sm text-gray-500 border-t pt-3">
                      <span className="truncate max-w-[120px]">
                        {item?.writer?.[lang]}
                      </span>

                      <span>
                        {new Date(item?.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="space-y-6">
          {/* CATEGORY CARD */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-5">
            <h2 className="text-2xl font-bold text-red-600 mb-2 capitalize">
              {slug}
            </h2>

            <p className="text-gray-600 text-sm">
              Latest breaking and trending news from the {slug} category.
            </p>
          </div>

          {/* TRENDING */}
          <div className="border rounded-xl p-5">
            <h3 className="text-xl font-bold border-b pb-3 mb-4">
              Trending News
            </h3>

            <div className="space-y-4">
              {news.slice(6, 11).map((item, index) => (
                <Link href={`/news/${item._id}`} key={item._id}>
                  <div className="flex gap-3 group">
                    <span className="text-2xl font-bold text-red-500">
                      {index + 1}
                    </span>

                    <div>
                      <p className="font-medium text-sm group-hover:text-red-500 transition line-clamp-2">
                        {item?.title?.[lang]}
                      </p>

                      <span className="text-xs text-gray-500">
                        {new Date(item?.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SMALL GRID */}
          <div className="grid grid-cols-2 gap-4">
            {news.slice(11, 15).map((item) => (
              <Link href={`/news/${item._id}`} key={item._id}>
                <div className="group">
                  <div className="relative w-full h-28">
                    <Image
                      src={item?.featuredImage?.[0] || "/img1.jpg"}
                      alt=""
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <p className="text-sm font-medium mt-2 line-clamp-2 group-hover:text-red-500 transition">
                    {item?.title?.[lang]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ForYouSection />
    </div>
  );
}
