import React from "react";
import Carousels from "../components/carousels";
import Categories from "../components/categories";

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
    <div className="w-full h-[100vh]">
      <div className="mb-10">
        <Carousels images={imagesList} />
      </div>
      <Categories />
    </div>
  );
}
