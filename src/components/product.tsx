import React from "react";
import { ProductInterface } from "../interfaces/product";
import Link from "next/link";
import Image from "next/image";

export default async function Product() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/items?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    {
      cache: "no-store",
    }
  );
  const products: ProductInterface[] | null = await response.json();

  return products !== null ? (
    <main>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 ml-1 mr-1">
        {products?.map((product) => (
          <div
            className="h-[300px] md:h-[500px]  md:p-10 bg-zinc-200 rounded-lg"
            key={product.item_id}
          >
            <div className="flex w-[full] mb-2 mt-1 md:mt-5 md:mb-5 ml-2 mr-2 justify-between">
              <Link href={"/myShop/cart"} className="">
                <Image src={"/cart.svg"} alt={"cart"} width={30} height={30} />
              </Link>

              <div className="flex h-[20px] w-[20px] md:h-[30px] md:w-[30px] bg-purple-500 text-white rounded-md text-sm md:text-xl justify-center">
                <h3 className="">{product.rating}</h3>
              </div>
            </div>
            <div className="flex flex-col w-full justify-center">
              <img src={product.image} className="h-[100px]  md:h-[150px]" />

              <h1 className="text-sm md:text-xl font-bold text-black ">
                {product.name}
              </h1>
              <div className="h-[100px] md:h-[250px] overflow-auto">
                <p className="text-black ">{product.description}</p>
              </div>

              <h3 className="text-sm md:text-xl text-green-600 md:mt-5">
                {product.amount}
              </h3>
            </div>
          </div>
        ))}
      </section>
    </main>
  ) : (
    <div>Please refresh...</div>
  );
}
