"use client";
import { fetchCarousels } from "@/src/config/functions";
import { CarouselInterface } from "@/src/interfaces/carousels";
import { useQuery } from "@tanstack/react-query";
import { ErrorLoading, Loading } from "./loading";

export default function Carousels() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["carousels"],
    queryFn: fetchCarousels,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <div className="flex overflow-x-auto">
      {data!.map((image) => (
        <div className=" flex-none  md:mr-2 md:ml-2 " key={image.id}>
          <img
            src={image.url}
            className="h-[200px] w-[300px] md:h-[350px] md:w-fit aspect-video"
          />
        </div>
      ))}
    </div>
  );
}
