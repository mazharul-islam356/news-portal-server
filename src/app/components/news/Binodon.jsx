// components/EntertainmentSection.jsx
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function EntertainmentSection() {
  return (
    <div className=" py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* SECTION TITLE */}
        <div className="flex items-center gap-2 ">
          <h2 className="text-2xl font-bold border-b-2 border-red-500 inline-block mb-8">
            বিনোদন
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 border-b pb-4">
                <div className="flex-1">
                  <h3 className="text-base font-medium leading-snug">
                    দর্শক নেটফ্লিক্সে কী দেখছেন, আপনার সঙ্গে মিলিয়ে নিন
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">১ ঘণ্টা আগে</p>
                </div>

                <Image
                  src={`/l${i}.jpg`}
                  width={120}
                  height={80}
                  alt=""
                  className="rounded object-cover"
                />
              </div>
            ))}
          </div>

          {/* CENTER FEATURED */}
          <div className="border-l border-r border-gray-400 px-4">
            <div>
              <div className="relative">
                <Image
                  src="/news03.jpg"
                  width={600}
                  height={350}
                  alt=""
                  className="rounded w-full h-64 object-cover"
                />

                {/* CAMERA ICON */}
                <div className="absolute top-3 left-3 bg-red-600 p-2 rounded-full">
                  📷
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-4 leading-snug">
                মাথায় জাহাজ আর সাত সহকারী নিয়ে চমকে দিলেন ম্যাডোনা
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                ম্যাডোনা মানেই চমক। এই ৬৫ বছর বয়সে এসেও তার উপস্থিতি...
              </p>

              <p className="text-xs text-gray-500 mt-2">২১ মিনিট আগে</p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 border-b pb-4">
                <div className="flex-1">
                  <h3 className="text-base font-medium leading-snug">
                    ‘আমি মিয়ানমার ব্যবহার করি না’
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">৫ ঘণ্টা আগে</p>
                </div>

                <Image
                  src={`/r${i}.jpg`}
                  width={120}
                  height={80}
                  alt=""
                  className="rounded object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
