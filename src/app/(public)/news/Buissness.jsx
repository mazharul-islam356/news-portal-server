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

  const t = {
    title: {
      en: "Business",
      bn: "বাণিজ্য",
    },
  };

  return (
    <div>
      <NewsSection title={t} data={business} />
    </div>
  );
};

export default Buissness;
