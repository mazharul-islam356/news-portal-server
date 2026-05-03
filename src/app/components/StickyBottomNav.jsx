import { CalendarDays, Globe, Menu, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const StickyBottomNav = ({ categories }) => {
  return (
    <div>
      <nav className="flex items-center justify-between font-bangla">
        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 items-center gap-8 pl-3">
          <Link href="/" className="py-5 text-lg font-semibold text-red-700">
            সর্বশেষ
          </Link>

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="py-5 text-lg font-medium text-black hover:text-red-500 transition"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center  border-l border-gray-200">
          <button className="px-6 py-5 border-r border-gray-200 hover:bg-gray-50">
            <Search size={26} />
          </button>

          <button className="px-6 py-5 border-r border-gray-200 flex items-center gap-2 hover:bg-gray-50">
            <CalendarDays size={22} />
            <span className="text-lg">ই-পেপার</span>
          </button>

          <button className="px-6 py-5 border-r border-gray-200 flex items-center gap-2 hover:bg-gray-50">
            <Globe size={22} />
            <span className="text-lg">Eng</span>
          </button>

          <button className="px-6 py-5 border-r border-gray-200 flex items-center gap-2 hover:bg-gray-50">
            <User size={22} />
            <span className="text-lg">Login</span>
          </button>

          <button className="px-6 py-5 hover:bg-gray-50">
            <Menu size={26} />
          </button>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex w-full items-center justify-between px-4 py-4">
          <h1 className="text-3xl font-black">
            প্রথম<span className="text-red-500">আ</span>লো
          </h1>

          <button onClick={() => setOpen(!open)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default StickyBottomNav;
