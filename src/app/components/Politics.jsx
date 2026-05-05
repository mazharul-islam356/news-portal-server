// app/politics/page.jsx
import Image from "next/image";

export default function PoliticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold border-b-2 border-red-500 inline-block mb-8">
        রাজনীতি
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT BIG DOUBLE IMAGE */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <Image src="/news01.jpg" width={400} height={300} alt="" />
            <Image src="/news04.jpg" width={400} height={300} alt="" />
          </div>

          <h3 className="text-xl font-semibold mt-4">
            আসলাম ও সায়রারের ভাগ্য নির্ধারণ কাল
          </h3>

          <p className="text-gray-600 text-sm mt-2">
            নির্বাচনের প্রেক্ষাপটে গুরুত্বপূর্ণ সিদ্ধান্ত...
          </p>
        </div>

        {/* RIGHT GRID */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Image
                src={`/p${i + 2}.jpg`}
                width={200}
                height={120}
                className="rounded"
                alt=""
              />
              <h4 className="text-sm font-medium mt-2">
                বিএনপির কর্মসূচি নিয়ে নতুন ঘোষণা
              </h4>
              <p className="text-xs text-gray-500">১৩ মিনিট আগে</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
