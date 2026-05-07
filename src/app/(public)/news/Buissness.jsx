"use client";
import NewsSection from "@/app/components/NewsSection";

import { getNewsByCategory } from "@/service/newsApi";
import React, { useEffect, useState } from "react";

const Buissness = () => {
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getNewsByCategory("business", "en");

        setBusiness(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  console.log("business news", business);
  return (
    <div>
      <NewsSection title="বাণিজ্য" data={business} />
    </div>
  );
};

export default Buissness;
