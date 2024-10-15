import React from "react";
import { Skeleton } from "../ui/skeleton";

export function Loading() {
  return (
    <div className="flex w-full justify-between px-1 md:px-2">
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className="animate-pulse w-[80px] md:w-[200px] h-[55px] rounded-md bg-gray-300"
        ></div>
      ))}
    </div>
  );
}

export function CarouselLoading() {
  return (
    <div className="flex overflow-x-auto space-x-1 px-1 md:px-2">
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className="animate-pulse h-[200px] w-[300px] md:h-[350px] rounded-md bg-gray-300 flex-shrink-0"
        ></div>
      ))}
    </div>
  );
}

export function ProductLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5  mt-2">
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className="animate-pulse h-[200px] md:h-[300px] rounded-xl bg-gray-300"
        />
      ))}
    </div>
  );
}

export function ErrorLoading() {
  return <div>Error ....</div>;
}
