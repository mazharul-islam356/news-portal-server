// components/NewsCardSmall.jsx
import Image from "next/image";

export default function NewsCardSmall({ news }) {
  return (
    <div className="flex gap-3">
      <div className="relative w-24 h-16 flex-shrink-0">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover rounded"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium leading-snug">{news.title}</h4>
        <p className="text-xs text-gray-500 mt-1">{news.time}</p>
      </div>
    </div>
  );
}
