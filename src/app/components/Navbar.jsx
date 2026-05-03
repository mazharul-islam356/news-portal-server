"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Heart,
} from "lucide-react";
import api from "@/lib/axios";
import { useCart } from "../context/CartContext";
import Image from "next/image";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const { totalItems } = useCart();
  console.log(totalItems);
  useEffect(() => {
    api.get("/get-category-tree").then((res) => setCategories(res.data.data));
  }, []);
  console.log(categories);
  // Scroll detection for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDesktopDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileDropdown = (id) => {
    setOpenMobileDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div ref={navRef} className="z-50 sticky top-0">
      {/* Top announcement bar */}
      <div className="bg-[#a6804e] text-white text-center text-xs py-1.5 px-4 font-medium tracking-wide">
        Free shipping on orders over $100 ✨
      </div>

      <header
        className={`bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3 lg:py-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-serif font-bold tracking-tight text-gray-900  transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image src="/logo.png" width={80} height={80} alt="logo"></Image>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <div key={cat._id} className="relative">
                <button
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    openDesktopDropdown === cat._id
                      ? "bg-rose-50 text-[#a6804e]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() =>
                    setOpenDesktopDropdown((prev) =>
                      prev === cat._id ? null : cat._id,
                    )
                  }
                  onMouseEnter={() => setOpenDesktopDropdown(cat._id)}
                >
                  {cat.name}
                  {cat.subCategories?.length > 0 && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDesktopDropdown === cat._id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Desktop Dropdown */}
                {cat.subCategories?.length > 0 &&
                  openDesktopDropdown === cat._id && (
                    <div
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                      onMouseLeave={() => setOpenDesktopDropdown(null)}
                    >
                      {cat.subCategories.map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/categories/${sub._id}`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-rose-50 hover:text-[#a6804e] transition-colors"
                          onClick={() => setOpenDesktopDropdown(null)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            {/* Search - desktop only */}
            <button className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist - desktop only */}
            <Link
              href="/wishlist"
              className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Account - desktop only */}
            <Link
              href="/admin/dashboard"
              className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#987548] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems || 0}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "97px" }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-[97px] left-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Mobile Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 transition"
            />
          </div>

          {/* Mobile Categories */}
          <div className="space-y-1">
            {categories.map((cat) => (
              <div key={cat._id}>
                {cat.subCategories?.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(cat._id)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                        openMobileDropdown === cat._id
                          ? "bg-rose-50 text-[#a6804e]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {cat.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMobileDropdown === cat._id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile Sub-dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        openMobileDropdown === cat._id
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-3 pl-3 border-l-2 border-rose-100 space-y-0.5 py-1">
                        {cat.subCategories.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/categories/${sub._id}`}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-rose-50 hover:text-[#a6804e] transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="w-1 h-1 rounded-full bg-rose-300" />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={`/categories/${cat._id}`}
                    className="block px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Footer Links */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-1">
            <Link
              href="/account"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="w-5 h-5 text-gray-400" />
              My Account
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart className="w-5 h-5 text-gray-400" />
              Wishlist
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingBag className="w-5 h-5 text-gray-400" />
              Shopping Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
