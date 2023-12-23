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
      <section className="grid grid-cols-4">
        {products?.map((product) => (
          <div className="col-span-1 h-auto w-auto p-10 " key={product.item_id}>
            <div className="bg-zinc-100  relative">
              <div className="flex w-[full] mb-5 ml-2 mr-2 justify-between">
                <Link href={"/myShop/cart"} className="">
                  <Image
                    src={"/cart.svg"}
                    alt={"cart"}
                    width={30}
                    height={30}
                  />
                </Link>

                <div className="flex h-[30px] w-[30px] bg-purple-500 text-white rounded-md text-xl justify-center">
                  <h3 className="">{product.rating}</h3>
                </div>
              </div>
              <img src={product.image} height={150} />
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl text-black">{product.name}</h1>
                <p className="text-gray-400">{product.description}</p>
                <h3 className="text-green-600 mt-5">{product.amount}</h3>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  ) : (
    <div>Please refresh...</div>
  );
}
