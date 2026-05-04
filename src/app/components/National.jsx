"use client";
import Image from "next/image";

const newsData = [
  {
    id: 1,
    category: "মতামত",
    title: "মে দিবস এবং বাংলাদেশ জাতীয়তাবাদী দলের শ্রমনীতি",
    date: "৩০ এপ্রিল ২০২৬",
    image: "/news1.jpg",
    large: true,
  },
  {
    id: 2,
    category: "বিনোদন / গান",
    title: "মা হারালেন ব্যান্ড তারকা হাসান",
    date: "৮ মে ২০২৬",
    image: "/news2.jpg",
    large: true,
  },
  {
    id: 3,
    category: "সাহিত্য ও সংস্কৃতি / শিল্প",
    title:
      "সনি ওয়ার্ল্ড ফটোগ্রাফি অ্যাওয়ার্ডসে বিজয়ীদের তালিকায় দুই বাংলাদেশি",
    date: "২০ এপ্রিল ২০২৬",
    image: "/news3.jpg",
    large: true,
  },
  {
    id: 4,
    category: "মতামত",
    title: "ইরানের ওপর চাপ প্রয়োগ ব্যর্থ কিংবা 'আত্মঘাতী' হতে পারে",
    date: "১৭ এপ্রিল ২০২৬",
    image: "/news4.jpg",
  },
  {
    id: 5,
    category: "বিনোদন / টেলিভিশন",
    title: "লুসিফারের কথায় 'মালিক' সিনেমার আইটেম গান",
    date: "৮ মে ২০২৬",
    image: "/news5.jpg",
  },
  {
    id: 6,
    category: "সাহিত্য",
    title: "‘একাত্তরের ইতিহাস’ গ্রন্থের মোড়ক উন্মোচন",
    date: "১৮ এপ্রিল ২০২৬",
    image: "/news6.jpg",
  },
];

export default function National() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData
          .filter((item) => item.large)
          .map((item) => (
            <LargeCard key={item.id} item={item} />
          ))}
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {newsData
          .filter((item) => !item.large)
          .map((item) => (
            <SmallCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

/* =========================
   LARGE CARD (TOP)
========================= */
function LargeCard({ item }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={400}
          className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Category + Date */}
        <div className="absolute top-4 left-4 text-white text-sm">
          <p className="text-red-500 font-semibold">{item.category}</p>
          <p className="text-gray-200 text-xs">{item.date}</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-xl font-semibold leading-snug hover:text-red-500 transition">
        {item.title}
      </h2>
    </div>
  );
}

/* =========================
   SMALL CARD (BOTTOM)
========================= */
function SmallCard({ item }) {
  return (
    <div className="flex gap-4 items-start group cursor-pointer">
      <Image
        src={item.image}
        alt={item.title}
        width={120}
        height={100}
        className="w-[110px] h-[90px] object-cover rounded-md"
      />

      <div>
        <p className="text-red-500 text-sm font-medium">{item.category}</p>

        <h3 className="text-base font-semibold leading-snug group-hover:text-red-500 transition">
          {item.title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
      </div>
    </div>
  );
}
