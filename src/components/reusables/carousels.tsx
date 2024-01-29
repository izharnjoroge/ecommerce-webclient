import { CarouselInterface } from "@/src/interfaces/carousels";

export default async function Carousels() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/carousels?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    {
      cache: "no-store",
    }
  );

  const images: CarouselInterface[] | [] = await response.json();

  return images !== null ? (
    <div className="flex overflow-x-auto">
      {images.map((image) => (
        <div
          key={image.id}
          className=" flex-none h-[200px] w-[300px] md:h-[300px] md:w-fit md:mr-2 md:ml-2"
        >
          <img src={image.url} className="" />
        </div>
      ))}
    </div>
  ) : (
    <div>No Carousels</div>
  );
}
