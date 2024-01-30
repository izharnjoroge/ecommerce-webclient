"use client";
import useCartStore from "@/src/store/cartStore";
import Image from "next/image";
import React from "react";

export default function Cart() {
  const { items, removeItems, checkOut } = useCartStore();

  return (
    <main className="p-2 md:p-10 h-[100dvh] w-full">
      <p className="text-purple-600 font-bold text-xl mb-2 md:mb-10">
        Shopping Cart
      </p>
      {items.length > 0 ? (
        <section>
          <ul className="w-full">
            {items.map((item) => (
              <li
                key={item.item_id}
                className="grid grid-cols-4 md:grid-cols-6 mb-1 md:mb-5"
              >
                <div className="col-span-2 md:col-span-3 flex items-center">
                  <img src={item.image} height={50} width={50} />
                  <p className="line-clamp-2">{item.name} </p>
                </div>
                <div>{item.amount}</div>
                <div className="flex justify-center ">
                  <button onClick={() => removeItems(item.item_id)}>
                    {" "}
                    <Image
                      src={"/cancel.svg"}
                      alt={"checkout"}
                      height={30}
                      width={30}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={checkOut} className="justify-end mt-5 md:mt-10 ">
            <div className="flex w-100px md:w-[200px] p-1 md:p-2 rounded-xl justify-evenly items-center bg-green-300 text-black">
              <Image
                src={"/checkOut.svg"}
                alt={"checkout"}
                height={30}
                width={30}
              />
              <p>Check Out</p>
            </div>
          </button>
        </section>
      ) : (
        <div>No Items Yet....</div>
      )}
    </main>
  );
}
