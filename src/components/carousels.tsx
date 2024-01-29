"use client";

import Image from "next/image";
import { ImageInterface } from "../interfaces/carousels";
import { Card, CardContent } from "./ui/card";
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
        <div
          key={image.id}
          className="mr-8 ml-8 flex-none h-[200px] w-[300px] md:h-[300px] md:w-[700px] "
        >
          <img src={image.url} className="m-2" />
        </div>
      ))}
    </div>
  ) : (
    // <Carousel
    //   className="w-[300px] max-w-xs h-[400px]"
    //   opts={{
    //     align: "start",
    //   }}
    // >
    //   <CarouselContent>
    //     {images.map((image) => (
    //       <CarouselItem key={image.id}>
    //         <Card>
    //           <CardContent className="flex  items-center justify-center p-6">
    //             <img src={image.url} alt={"Image"} />
    //           </CardContent>
    //         </Card>
    //       </CarouselItem>
    //     ))}
    //   </CarouselContent>
    //   <CarouselPrevious />
    //   <CarouselNext />
    // </Carousel>
    <div>No Carousels</div>
  );
}
