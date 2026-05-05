// components/FeaturedGrid.jsx
import Image from "next/image";

const data = [
  {
    id: 1,
    title: "রোহিঙ্গায় বিনা মূল্যে বাংলাদেশি শিক্ষার্থীদের কোচ করার সুযোগ",
    category: "শিক্ষা",
    image: "/news01.jpg",
  },
  {
    id: 2,
    title: "নতুন কৌশলে ৩০ হাজার ফেসবুক অ্যাকাউন্ট হ্যাক করে অনলাইনে বিক্রি",
    category: "প্রযুক্তি",
    image: "/news02.jpg",
  },
  {
    id: 3,
    title: "আল্লাহর উপর ভরসা করা কেন ঈমানের অপরিহার্য অংশ",
    category: "ধর্ম",
    image: "/news03.jpg",
  },
  {
    id: 4,
    title: "শত শত মারিনরা মরছে...",
    category: "একটু ঘুরুন",
    image: "/news04.jpg",
  },
];

export default function FeaturedGrid() {
  return (
    <section className="bg-[#e9e3e3] py-8 mt-14">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative h-32 rounded-xs overflow-hidden group"
          >
            {/* Background Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <span className="text-yellow-400 text-sm font-semibold mb-1">
                {item.category}
              </span>

              <h3 className="text-white text-sm leading-snug font-medium">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
