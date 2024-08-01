import Carousels from "@/src/components/reusables/carousels";
import CategoriesComponent from "@/src/components/reusables/categories";
import Product from "@/src/components/reusables/product";
import React from "react";

export default function MyShop() {
  return (
    <main className="w-full h-full mb-5">
      <section className="mb-2 md:mb-10 w-full h-[220px] md:h-[330px]">
        <Carousels />
      </section>
      <section>
        <h1 className="text-2xl text-purple-600 font-bold  ml-1 md:ml-8 mb-2 md:mb-4">
          Categories
        </h1>
        <div className="mb-3 md:mb-10 ml-1 md:ml-8">
          <CategoriesComponent />
        </div>
      </section>
      <section>
        <h1 className="text-2xl text-purple-600 font-bold ml-1 mb-3 md:ml-8">
          Popular
        </h1>
        <div className="ml-1 md:ml-8">
          <Product />
        </div>
      </section>
    </main>
  );
}
