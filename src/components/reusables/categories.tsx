"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchCategories } from "@/src/config/functions";
import { ErrorLoading, Loading } from "./loading";

export default function CategoriesComponent() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (!isLoading && scrollRef.current) {
      const savedScrollPosition = sessionStorage.getItem("scroll-position");
      if (savedScrollPosition) {
        scrollRef.current.scrollLeft = parseInt(savedScrollPosition, 10);
      }
    }
  }, [isLoading]);

  // Save scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        sessionStorage.setItem(
          "scroll-position",
          scrollRef.current.scrollLeft.toString()
        );
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <div className="flex h-fit overflow-x-auto" ref={scrollRef}>
      {data!.map((e) => (
        <Link key={e.category_id} href={`/myShop/Category/${e.category_id}`}>
          <div
            className={`flex flex-col items-center justify-center ml-2 mr-2 md:mr-10 md:ml-10  ${
              pathname.includes(e.category_id)
                ? "border-b-[5px] border-purple-600"
                : ""
            } `}
            key={e.category_id}
          >
            <img src={e.url} alt={"icon"} height={30} width={30} />
            <h3 className="text-center">{e.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
