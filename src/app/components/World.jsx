"use client";
import { getNewsByCategory } from "@/service/newsApi";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WorldPage() {
  const [world, setworld] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getNewsByCategory("world", "en");

        console.log(data); // check data here

        setworld(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  console.log("politics", world);
  return (
    // FULL PAGE BACKGROUND
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl w-fit mx-auto px-3 border-x font-bold text-center border-red-500 mb-8">
          ইরান যুক্তরাষ্ট্র
        </h2>

        <div className="grid lg:grid-cols-4 gap-x-5">
          {/* BIG LEFT CARD */}

          <div className="lg:col-span-3 bg-white p-5 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-3">
              জব্দ ইরানি জাহাজের ২২ নাবিককে পাকিস্তানে পাঠাল যুক্তরাষ্ট্র
            </h2>

            <div className="w-full h-72">
              {" "}
              {/* height control */}
              <Image
                src="/news01.jpg"
                width={400}
                height={300}
                className="rounded w-full h-full object-cover"
                alt="news"
              />
            </div>
          </div>

          {/* RIGHT SIDE STACK */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-3 bg-white p-3 rounded shadow-sm"
              >
                <Image
                  src={`/w${i}.jpg`}
                  width={100}
                  height={70}
                  alt=""
                  className="rounded object-cover"
                />
                <p className="text-sm">
                  ইরান যুক্তরাষ্ট্র সংকট নিয়ে নতুন বিশ্লেষণ
                </p>
              </div>
            ))}
          </div>

          {/* GRID BELOW */}
          <div className="lg:col-span-4 grid md:grid-cols-4 gap-5 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-3 rounded shadow-sm">
                <Image
                  src={`/g${i}.jpg`}
                  width={300}
                  height={180}
                  className="rounded w-full object-cover"
                  alt=""
                />
                <h4 className="text-sm font-medium mt-2">
                  যুদ্ধ পরিস্থিতিতে নতুন মোড়
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
