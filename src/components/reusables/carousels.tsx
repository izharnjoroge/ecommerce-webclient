"use client";
import { fetchCarousels } from "@/src/config/functions";
import { useQuery } from "@tanstack/react-query";
import { CarouselLoading, ErrorLoading } from "./loading";
import { useState, useRef, useEffect } from "react";

export default function Carousels() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["carousels"],
    queryFn: fetchCarousels,
  });

  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 due to the cloned first image
  const scrollRef = useRef<HTMLDivElement>(null);

  // Clone first and last images for infinite loop effect
  const clonedData = data ? [data[data.length - 1], ...data, data[0]] : [];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Change images every 3 seconds

    return () => clearInterval(interval);
  }, [clonedData]);

  // Scroll to the current image with loop handling
  useEffect(() => {
    if (scrollRef.current && clonedData.length > 0) {
      const scrollPosition = scrollRef.current.scrollWidth / clonedData.length;

      if (currentIndex >= clonedData.length - 1) {
        // // Reset to the actual first image (index 1) after reaching the cloned last image
        // scrollRef.current.scrollTo({
        //   left: scrollPosition,
        //   behavior: "smooth",
        // });
        // setCurrentIndex(1); // Reset to index 1 for a continuous loop
      } else {
        // Normal scrolling
        scrollRef.current.scrollTo({
          left: currentIndex * scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex, clonedData]);

  if (isLoading) {
    return <CarouselLoading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto space-x-1 scroll-smooth snap-x"
    >
      {clonedData.map((image, index) => (
        <div
          className={`flex-none md:mr-2 md:ml-2 snap-center transition-transform duration-500 ${
            currentIndex === index ? "scale-105" : "scale-90"
          }`}
          key={index}
        >
          <img
            src={image.url}
            className="h-[200px] w-[300px] md:h-[350px] md:w-fit aspect-video rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
