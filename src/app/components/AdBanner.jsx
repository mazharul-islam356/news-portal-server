"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdBanner({ imageUrl, link }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 h-20">
      {/* Ad Image */}
      <Link href={link || "#"} target="_blank" rel="noopener noreferrer">
        <Image
          width={500}
          height={300}
          src={imageUrl}
          alt="Advertisement"
          className="w-full h-20 object-cover"
        />
      </Link>

      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 bg-red-700/70 hover:bg-red-700 cursor-pointer text-white rounded-full p-0.5 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
}
