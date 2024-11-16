import React, { useState } from "react";
import { ProductInterface } from "@/src/interfaces/product";
import  { extractNumericValue } from "@/src/store/cartStore";
import Link from "next/link";

interface GridItemsProps {
  products: ProductInterface[];
}

export function GridItems({ products }: GridItemsProps) {
 return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 ml-1 mr-1 p-2">
        {products.map((product) => (
          <Link
            className="h-[200px] md:h-[300px] px-2 bg-zinc-200 hover:bg-white rounded-lg md:shadow-neumorph"
            key={product.item_id} href={`/myShop/Product/${product.item_id}`}          
          >
            <div className="flex w-full mb-2 mt-1 md:mb-5 px-1 justify-end ">
              {/* <div className="flex h-[20px] w-[20px] md:h-[30px] md:w-[30px] bg-purple-500 text-white rounded-md text-sm md:text-xl justify-center">
                <h3 className="">{product.rating}</h3>
              </div> */}
            </div>
            <div className="flex flex-col w-full justify-center gap-y-3">
              <img src={product.image} className="h-[100px] md:h-[150px]" />

              <h1 className="text-sm md:text-xl font-bold text-black line-clamp-1">
                {product.name}
              </h1>

              <h3 className="text-sm md:text-xl mb-1 md:mb-3 text-green-600 md:mt-2">
                KSH {extractNumericValue(product.amount).toLocaleString()}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
