"use client";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-red-800">NewsToday</h2>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              বাংলাদেশের সর্বশেষ খবর, বিশ্লেষণ, রাজনীতি, বিনোদন ও আন্তর্জাতিক
              সংবাদ এক জায়গায়।
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-4">
              <Social icon={<Facebook size={18} />} />
              <Social icon={<Twitter size={18} />} />
              <Social icon={<Youtube size={18} />} />
              <Social icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              বিভাগসমূহ
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-red-800 cursor-pointer">রাজনীতি</li>
              <li className="hover:text-red-800 cursor-pointer">অর্থনীতি</li>
              <li className="hover:text-red-800 cursor-pointer">আন্তর্জাতিক</li>
              <li className="hover:text-red-800 cursor-pointer">খেলা</li>
              <li className="hover:text-red-800 cursor-pointer">বিনোদন</li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              গুরুত্বপূর্ণ লিংক
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-red-800 cursor-pointer">
                আমাদের সম্পর্কে
              </li>
              <li className="hover:text-red-800 cursor-pointer">যোগাযোগ</li>
              <li className="hover:text-red-800 cursor-pointer">
                গোপনীয়তা নীতি
              </li>
              <li className="hover:text-red-800 cursor-pointer">শর্তাবলী</li>
            </ul>
          </div>

          {/* CONTACT + NEWSLETTER */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              যোগাযোগ
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <MapPin size={16} /> ঢাকা, বাংলাদেশ
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> +৮৮০ ১২৩৪-৫৬৭৮৯০
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> info@newstoday.com
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                নিউজলেটার সাবস্ক্রাইব করুন
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল"
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-red-800 text-sm"
                />
                <button className="bg-red-800 text-white px-4 rounded-r-md hover:bg-red-700 transition">
                  সাবস্ক্রাইব
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} NewsToday. সর্বস্বত্ব সংরক্ষিত।</p>
          <p>
            Developed by{" "}
            <span className="text-red-800 font-medium">Your Company</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* SOCIAL ICON */
function Social({ icon }) {
  return (
    <div className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-red-800 hover:text-white hover:border-red-800 transition cursor-pointer">
      {icon}
    </div>
  );
}
