"use client";
import { useLanguage } from "@/context/lagnguageContext";
import { getTranslatedValue } from "@/hooks/getTranslatedValue";
import { CalendarDays, Globe, Menu, Search, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Calendar from "react-calendar";

const StickyBottomNav = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());
  const { lang, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="flex items-center justify-between font-bangla">
        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 items-center gap-6 pl-3">
          <Link href="/" className="py-5 text-lg font-semibold text-red-700">
            সর্বশেষ
          </Link>

          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="py-5 text-lg font-medium text-black hover:text-red-500 transition"
            >
              {getTranslatedValue(category.name, lang)}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center  border-l border-gray-200">
          <button className="px-6 py-5 border-r border-gray-200 hover:bg-gray-50">
            <Search size={26} />
          </button>

          <>
            {/* Button */}
            <button
              onClick={() => setOpen(true)}
              className="px-6 py-5 border-r border-gray-200 flex items-center gap-2 cursor-pointer hover:bg-gray-50"
            >
              <CalendarDays size={22} />
              <span className="text-lg">ক্যালেন্ডার</span>
            </button>

            {/* Modal */}
            {open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white w-90 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/newsportalLogo.png" // your brand logo
                        alt="logo"
                        width={50}
                        height={50}
                      />
                    </div>

                    <button onClick={() => setOpen(false)}>
                      <X size={20} />
                    </button>
                  </div>

                  {/* Calendar */}
                  <div className="p-4">
                    <Calendar onChange={setValue} value={value} />
                  </div>
                </div>
              </div>
            )}
          </>

          <button
            onClick={toggleLanguage}
            className="px-6 py-5 border-r border-gray-200 flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
          >
            <Globe size={22} />
            <span className="text-lg">
              {lang === "en" ? "বাংলা" : "English"}
            </span>
          </button>

          <button className="px-6 py-5 border-r border-gray-200 flex items-center gap-2 hover:bg-gray-50">
            <User size={22} />
            <span className="text-lg">Login</span>
          </button>

          <>
            {/* MENU BUTTON */}
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 cursor-pointer py-5 hover:bg-gray-50"
            >
              <Menu size={26} />
            </button>

            {/* OVERLAY */}
            <div
              onClick={() => setIsOpen(false)}
              className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            />

            {/* SIDEBAR */}
            <div
              className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <Image
                  src="/newsportalLogo.png"
                  alt="logo"
                  width={120}
                  height={120}
                />
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* CATEGORY LIST */}
              <div className="flex flex-col px-5 py-4 space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="py-3 text-lg font-medium text-black hover:text-red-500 transition border-b"
                  >
                    {getTranslatedValue(category.name, lang)}
                  </Link>
                ))}
              </div>
            </div>
          </>
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
