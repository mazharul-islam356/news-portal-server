"use client";
import Image from "next/image";

const newsData = [
  {
    id: 1,
    category: "মতামত",
    title: "মে দিবস এবং বাংলাদেশ জাতীয়তাবাদী দলের শ্রমনীতি",
    date: "৩০ এপ্রিল ২০২৬",
    image: "/news01.jpg",
    large: true,
  },
  {
    id: 2,
    category: "বিনোদন / গান",
    title: "মা হারালেন ব্যান্ড তারকা হাসান",
    date: "৮ মে ২০২৬",
    image: "/news02.jpg",
    large: true,
  },
  {
    id: 3,
    category: "সাহিত্য ও সংস্কৃতি / শিল্প",
    title:
      "সনি ওয়ার্ল্ড ফটোগ্রাফি অ্যাওয়ার্ডসে বিজয়ীদের তালিকায় দুই বাংলাদেশি",
    date: "২০ এপ্রিল ২০২৬",
    image: "/news03.jpg",
    large: true,
  },
  {
    id: 4,
    category: "মতামত",
    title: "ইরানের ওপর চাপ প্রয়োগ ব্যর্থ কিংবা 'আত্মঘাতী' হতে পারে",
    date: "১৭ এপ্রিল ২০২৬",
    image: "/news04.jpg",
  },
  {
    id: 5,
    category: "বিনোদন / টেলিভিশন",
    title: "লুসিফারের কথায় 'মালিক' সিনেমার আইটেম গান",
    date: "৮ মে ২০২৬",
    image: "/news01.jpg",
  },
  {
    id: 6,
    category: "সাহিত্য",
    title: "‘একাত্তরের ইতিহাস’ গ্রন্থের মোড়ক উন্মোচন",
    date: "১৮ এপ্রিল ২০২৬",
    image: "/news02.jpg",
  },
];

export default function NewsSection() {
  const largeNews = newsData.filter((item) => item.large);
  const smallNews = newsData.filter((item) => !item.large);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* ===== TOP GRID (LARGE) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {largeNews.map((item, index) => (
          <div
            key={item.id}
            className="p-4 border-b md:border-r group cursor-pointer"
          >
            {/* Category + Date (TOP, NOT OVER IMAGE) */}
            <div className="mb-3">
              <p className="text-red-600 text-sm font-semibold">
                {item.category}
              </p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>

            {/* Image */}
            <div className="overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Title */}
            <h2 className="mt-4 text-xl font-semibold leading-snug group-hover:text-red-600 transition">
              {item.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t my-5"></div>

      {/* ===== BOTTOM GRID (SMALL) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {smallNews.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-start p-4 border-b md:border-r group cursor-pointer"
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.title}
              width={120}
              height={100}
              className="w-[110px] h-[90px] object-cover rounded-sm"
            />

            {/* Content */}
            <div>
              <p className="text-red-600 text-sm font-medium">
                {item.category}
              </p>

              <h3 className="text-base font-semibold leading-snug group-hover:text-red-600 transition">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
