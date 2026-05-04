// components/NewsSection.jsx
import SectionHeader from "./SectionHeader";
import NewsCardLarge from "./NewsCardLarge";
import NewsCardSmall from "./NewsCardSmall";

export default function NewsSection({ title, data }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <SectionHeader title={title} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT BIG */}
        <div className="lg:col-span-2">
          <NewsCardLarge news={data[0]} />
        </div>

        {/* RIGHT LIST */}
        <div className="space-y-4">
          {data.slice(1, 5).map((item, i) => (
            <NewsCardSmall key={i} news={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
