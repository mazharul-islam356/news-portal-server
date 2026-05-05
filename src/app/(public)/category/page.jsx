import AdBanner from "@/app/components/AdBanner";
import ForYouSection from "../news/ForYouSection";

export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-6">
      <AdBanner imageUrl="/6211266836143166852.gif" />
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6">
          {/* BIG NEWS */}
          <div>
            <img
              src="/news02.jpg"
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-red-600 font-bold text-xl mt-3">
              পে-স্কেল নিয়ে সুখবর দিল সরকার
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              দেশের বর্তমান অর্থনৈতিক বাস্তবতা বিবেচনায় নতুন পে-স্কেল...
            </p>
            <span className="text-gray-400 text-xs">২ ঘণ্টা আগে</span>
          </div>

          {/* SMALL LIST */}
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <img
                  src={`/news04.jpg`}
                  className="w-24 h-20 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium">
                    দেশের বাজারে কমল স্বর্ণের দাম
                  </p>
                  <span className="text-xs text-gray-400">২ ঘণ্টা আগে</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CENTER COLUMN ================= */}
        <div className="space-y-6">
          {/* BANNER */}
          <div className="bg-yellow-100 p-4 py-9 text-center rounded">
            <h2 className="text-xl font-bold"> নির্ভয় বার্তা প্রতিদিন</h2>
            <p className="text-sm">ইতিহাস | ঐতিহ্য | সংস্কৃতি</p>
          </div>

          {/* MOST READ */}
          <div className="border rounded p-4">
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-center">
              সর্বাধিক পঠিত
            </h3>

            <ul className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-3 h-3 bg-red-500 mt-1"></span>
                  <div>
                    <p className="text-sm font-medium">
                      কোন কোন মুসলিম প্রার্থী জিতল পশ্চিমবঙ্গে
                    </p>
                    <span className="text-xs text-gray-400">১৫ ঘণ্টা আগে</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6">
          {/* GRID NEWS */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <img
                  src={`/img${i}.jpg`}
                  className="w-full h-28 object-cover rounded"
                />
                <p className="text-sm font-medium mt-2">
                  বন্ধ কারখানা সচল করতে তিন পদ্ধতিতে...
                </p>
                <span className="text-xs text-gray-400">১ দিন আগে</span>
              </div>
            ))}
          </div>

          {/* EXTRA NEWS */}
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <img
                  src={`/img${i}.jpg`}
                  className="w-24 h-20 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium">
                    খাদ্য নিরাপত্তা নিশ্চিতে কাজ করছে সরকার
                  </p>
                  <span className="text-xs text-gray-400">২ দিন আগে</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ForYouSection />
    </div>
  );
}
