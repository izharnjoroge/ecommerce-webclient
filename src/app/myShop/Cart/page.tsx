"use client";

import { ItemsToggle } from "@/src/components/reusables/ItemsToggle";
import Spinner from "@/src/components/reusables/spinner";
import { getUser } from "@/src/config/functions";
import { useAuthContext } from "@/src/context/AuthContext";
import useCartStore, { calculateTotalAmount } from "@/src/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const { loading, isAuthenticated } = useAuthContext();

  const router = useRouter();

  const {
    items,
    removeItems,
    checkOut,
    updateTotalAndAmount,
    locationDetails,
  } = useCartStore();

  const {
    isLoading: isUserLoading,
    isError: isUserError,
    data: userData,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (userData) {
      const userId = userData.id;
      const description =
        (userData.user_metadata["phone"] || "") +
        (userData.user_metadata["username"] || "");
      const area = userData.user_metadata["area"] || "";
      const street = userData.user_metadata["street"] || "";
      locationDetails(area, street, description, userId);
    }
  }, [userData]);

  if (!isAuthenticated) {
    router.replace("/myShop/auth");
  }

  if (isUserLoading || loading) {
    return <Spinner />;
  }

  if (isUserError) {
    return <div>An Error Occurred. Please Try Again.</div>;
  }

  const total = calculateTotalAmount(items);

  return (
    <main className="p-2 md:p-10 h-[100dvh] w-full">
      <p className="text-purple-600 font-[800] text-xl mb-5 md:mb-10">
        Shopping Cart
      </p>
      {items.length > 0 ? (
        <section>
          <ul className="w-full">
            <div className="grid grid-cols-4 md:grid-cols-6 mb-1 md:mb-5">
              <div className="col-span-2 md:col-span-3 font-bold">Item</div>
              <div className="font-bold">Amount</div>
              <div className="hidden md:flex font-bold">Items</div>
              <div className="flex justify-center font-bold">Remove</div>
            </div>
            {items.map((item) => (
              <li
                key={item.item_id}
                className="grid grid-cols-4 md:grid-cols-6 mb-1 md:mb-5 items-end md:items-center gap-x-1 font-[500]"
              >
                <div className="flex flex-col md:flex-row col-span-2 md:col-span-3 md:items-center ">
                  <img src={item.image} height={50} width={50} />
                  <p className="line-clamp-1">{item.name}</p>
                </div>
                <div>{item.newAmount}</div>
                <div className="hidden md:flex">
                  <ItemsToggle
                    items={item.total}
                    itemId={item.item_id}
                    updateTotalAndAmount={updateTotalAndAmount}
                  />
                </div>
                <div className="flex justify-center px-2">
                  <button onClick={() => removeItems(item.item_id)}>
                    <Image
                      src={"/cancel.svg"}
                      alt={"cancel"}
                      height={30}
                      width={30}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="w-full md:w-[400px] flex  items-center justify-between mt-5 md:mt-10 bg-gradient-to-r from-purple-600 to-purple-500 p-2 rounded-lg text-white">
            <div className="flex flex-col items-start mb-3 md:mb-0 ">
              <p className="text-lg font-[500]">Total:</p>
              <p className="text-lg font-bold">KSH {total.toLocaleString()}</p>
            </div>
            <button
              onClick={() => checkOut()}
              className="flex items-center p-2 rounded-xl border-white border-2"
            >
              <Image
                src={"/checkOut.svg"}
                alt={"checkout"}
                height={30}
                width={30}
              />
              <p className="ml-2">Order Now</p>
            </button>
          </div>
        </section>
      ) : (
        <div>No Items Yet....</div>
      )}
    </main>
  );
}
