"use client";

import { getBreakingNews, getFeaturedNews } from "@/service/newsApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";

export default function HeroSection() {
  const [breaking, setBreaking] = useState([]);
  const [featured, setFeatured] = useState([]);
  const { lang } = useLanguage();
  // breaking api
  useEffect(() => {
    const fetchBreaking = async () => {
      try {
        const data = await getBreakingNews();
        setBreaking(data);
      } catch (error) {
        console.error("Error fetching breaking news:", error);
      }
    };

    fetchBreaking();
  }, []);

  // featured api
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedNews();
        setFeatured(data);
      } catch (error) {
        console.error("Error fetching featured news:", error);
      }
    };

    fetchFeatured();
  }, []);

  console.log(featured);

  return (
    <div className="grid max-w-7xl mx-auto grid-cols-1 lg:grid-cols-3 gap-6 font-bangla">
      {/* LEFT: Featured */}
      <div className="lg:col-span-2 relative">
        <Swiper
          modules={[
            // Autoplay,
            Pagination,
            Navigation,
          ]}
          autoplay={{ delay: 4000 }}
          loop={true}
          pagination={{ clickable: true }}
          // navigation={true}
          className="rounded-md overflow-hidden"
        >
          {featured.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <Image
                  width={1200}
                  height={800}
                  alt={item.title.bn}
                  src={item.featuredImage[0]}
                  className="w-full h-105 object-cover"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* content */}
                <div className="absolute bottom-0 p-6 text-white">
                  <h1 className="text-2xl md:text-3xl font-bold leading-snug">
                    {getTranslatedValue(item.title, lang)}
                  </h1>

                  <Link href={`/news/${item.slug}`}>
                    <span className="inline-block my-3 text-sm underline hover:text-blue-300 transition">
                      বিস্তারিত পড়ুন →
                    </span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT: Trending */}
      <div className="flex flex-col gap-2.5">
        {breaking.map((item) => (
          <Link key={item._id} href={`/news/${item.slug}`}>
            <div className="flex gap-3 group cursor-pointer bg-white border border-gray-100 rounded-lg p-2 hover:shadow-md transition">
              <Image
                width={500}
                height={500}
                alt={item.title.bn}
                src={item.featuredImage[0]}
                className="w-28 h-20 object-cover rounded-sm flex-shrink-0"
              />

              <div className="flex flex-col justify-center">
                <p className="text-sm font-medium line-clamp-2 group-hover:text-red-600 font-bangla">
                  {item.title.bn}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
