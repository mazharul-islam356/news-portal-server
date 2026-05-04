import NewsSection from "@/app/components/NewsSection";
import SpecialNews from "@/app/components/Special";
import { businessNews } from "@/lib/data";
import React from "react";

const Politics = () => {
  return (
    <div>
      <SpecialNews />
      <NewsSection title="বাণিজ্য" data={businessNews} />
    </div>
  );
};

export default Politics;
