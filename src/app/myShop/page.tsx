import React from "react";
import Carousels from "../../components/carousels";
import Product from "../../components/product";
import CategoriesComponent from "../../components/categories";

export default function MyShop() {
  const imagesList = [
    {
      id: "1",
      url: "https://peaseandcurren.com/wp-content/uploads/2020/03/Retail-and-online-shopping.jpg",
    },
    {
      id: "2",
      url: "https://abookgeek.com/wp-content/uploads/2018/09/Shopping.jpg",
    },
    {
      id: "3",
      url: "https://peaseandcurren.com/wp-content/uploads/2020/03/Retail-and-online-shopping.jpg",
    },
    {
      id: "4",
      url: "https://abookgeek.com/wp-content/uploads/2018/09/Shopping.jpg",
    },
  ];
  return (
    <main className="w-full h-[100dvh] ">
      <section className="mb-2 md:mb-10 w-full h-[220px] md:h-[330px]">
        <Carousels images={imagesList} />
      </section>
      <section>
        <h1 className="text-2xl text-purple-600 font-bold  ml-1 md:ml-8 mb-2 md:mb-4">
          Categories
        </h1>
        <div className="mg-3 md:mb-10">
          <CategoriesComponent />
        </div>
      </section>
      <section>
        <h1 className="text-2xl text-purple-600 font-bold ml-1 md:ml-8">
          Popular
        </h1>
        <Product />
      </section>
    </main>
  );
}
