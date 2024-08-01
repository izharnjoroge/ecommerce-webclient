"use client";
import { GridItems } from "./gridItems";
import { fetchCarousels, fetchItems } from "@/src/config/functions";
import { useQuery } from "@tanstack/react-query";
import { ProductLoading, ErrorLoading } from "./loading";

export default function Product() {
  const {
    isLoading,
    isError,
    data: products,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isLoading) {
    return <ProductLoading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }
  return (
    <main>
      {products!.length > 0 ? (
        <GridItems products={products!} />
      ) : (
        <div>No Products</div>
      )}
    </main>
  );
}
