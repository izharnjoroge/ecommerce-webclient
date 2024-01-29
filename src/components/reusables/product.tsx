import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductInterface } from "@/src/interfaces/product";
import { GridItems } from "./gridItems";

export default async function Product() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/items?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    {
      cache: "no-store",
    }
  );
  const products: ProductInterface[] | [] = await response.json();

  return products !== null ? (
    <main>
      {products.length > 0 ? (
        <GridItems products={products} />
      ) : (
        <div>No Products</div>
      )}
    </main>
  ) : (
    <div>Please refresh...</div>
  );
}
