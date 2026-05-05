// components/ForYouSection.jsx
import Image from "next/image";

const newsData = [
  {
    id: 1,
    title: "‘ষড়’ হচ্ছে জনগণের প্রতিক্রিয়া: আইনমন্ত্রী",
    desc: "আইনমন্ত্রী বলেন, ষড় যদি না সিস্টেমেটিক ভাবে ওয়েবসাইটে...",
    time: "১৬ ঘণ্টা আগে",
    image: "/news01.jpg",
    highlight: false,
  },
  {
    id: 2,
    title: "সংরক্ষিত নারী আসন • সমতার ভারসাম্য...",
    desc: "নির্বাচন কমিশনার আব্দুর রহমান...",
    time: "১৩ ঘণ্টা আগে",
    image: "/news02.jpg",
    highlight: true,
  },
  {
    id: 3,
    title: "বিজেপিতে যোগ দিলেই রাহুল গান্ধীকে বিয়ে!",
    desc: "অভিনেত্রী কঙ্গনা বলেন...",
    time: "১৭ ঘণ্টা আগে",
    image: "/news03.jpg",
    highlight: false,
  },
  {
    id: 4,
    title: "অভিজ্ঞ- বিশ্লেষণ • খালাপতি বিজয়",
    desc: "তামিলনাড়ুর মধ্যে খালাপতির...",
    time: "১৬ ঘণ্টা আগে",
    image: "/news04.jpg",
    highlight: true,
  },
];

export default function ForYouSection() {
  return (
    <section className=" pt-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl border-b-2  border-red-700 font-semibold">
            আপনার জন্য
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsData.map((item, index) => (
            <div key={item.id} className="relative bg-white p-4">
              {/* Vertical Separator */}
              {index !== newsData.length - 1 && (
                <div className="hidden lg:block absolute top-4 right-[-12px] w-px h-[calc(100%-2rem)] bg-gray-300"></div>
              )}

              {/* Image */}
              <div className="relative w-full h-44 mb-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title */}
              <h3
                className={`text-sm font-semibold mb-2 leading-snug ${
                  item.highlight ? "text-red-600" : "text-black"
                }`}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-2">{item.desc}</p>

              {/* Time */}
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
