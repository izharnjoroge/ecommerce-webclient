"use client";

import { ImageInterface } from "../interfaces/carousels";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

type ImageCarousels = {
  images: ImageInterface[];
};

export default function Carousels({ images }: ImageCarousels) {
  return images !== null ? (
    <div className="flex overflow-x-auto">
      {images.map((image) => (
        <div key={image.id} className="mr-8 ml-8 flex-none h-[300px] w-[700px]">
          <img src={image.url} className="m-2" />
        </div>
      ))}
    </div>
  ) : (
    <div>No Carousels</div>
  );
}
