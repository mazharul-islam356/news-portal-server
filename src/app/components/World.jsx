// app/world/page.jsx
import Image from "next/image";

export default function WorldPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-4 gap-5">
        {/* BIG LEFT CARD */}
        <div className="lg:col-span-2 bg-gray-100 p-5 rounded">
          <h2 className="text-xl font-semibold mb-4">
            জব্দ ইরানি জাহাজের ২২ নাবিককে পাকিস্তানে পাঠাল যুক্তরাষ্ট্র
          </h2>

          <Image
            src="/ship.jpg"
            width={600}
            height={300}
            className="rounded"
            alt=""
          />
        </div>

        {/* RIGHT SIDE STACK */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 bg-gray-100 p-3 rounded">
              <Image
                src={`/w${i}.jpg`}
                width={100}
                height={70}
                alt=""
                className="rounded"
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
            <div key={i} className="bg-gray-100 p-3 rounded">
              <Image
                src={`/g${i}.jpg`}
                width={300}
                height={180}
                className="rounded"
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
  );
}
