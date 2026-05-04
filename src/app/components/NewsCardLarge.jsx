// components/NewsCardLarge.jsx
import Image from "next/image";

export default function NewsCardLarge({ news }) {
  return (
    <div>
      <div className="relative w-full h-[260px]">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <h3 className="text-xl font-semibold mt-3 leading-snug">{news.title}</h3>

      <p className="text-gray-600 mt-2 text-sm">{news.description}</p>
    </div>
  );
}
