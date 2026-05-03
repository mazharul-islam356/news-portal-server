"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const staticBanners = [
  {
    id: 1,
    image: "/Ghorerbazar_cover_design_02.jpg",
    title: "Rufaida Elegance",
  },
  { id: 2, image: "/slider2.jpg", title: "New Collection" },
  { id: 3, image: "/slider3.jpg", title: "Trending Now" },
];

export default function HeroSlider() {
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-[80vh] container mx-auto relative overflow-hidden"
    >
      <CarouselContent className="h-screen">
        {staticBanners.map((banner) => (
          <CarouselItem key={banner.id} className="relative h-screen">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority
              className="object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute top-1/2 left-6 -translate-y-1/2 z-10 bg-black/40 text-white hover:bg-black/60" />
      <CarouselNext className="absolute top-1/2 right-6 -translate-y-1/2 z-10 bg-black/40 text-white hover:bg-black/60" />
    </Carousel>
  );
}
