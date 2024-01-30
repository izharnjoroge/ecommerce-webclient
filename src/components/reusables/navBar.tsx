"use client";

import useCartStore from "@/src/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const cartItems = items.length;

  return (
    <header
      className={`flex w-[full] justify-between  bg-slate-100 sticky top-0 left-0 ${
        pathname === "/" ? "hidden" : ""
      }`}
    >
      <section className="flex items-center ">
        <Link href={"/"}>
          <Image src={"/shop.jpeg"} alt="logo" height={100} width={80} />
        </Link>
        <h1 className="ml-3 md:ml-8 justify-center">SupaBase Ecommerce </h1>
      </section>
      <ul className="flex w-1/6 md:w-1/6 justify-between items-center md:mr-8 gap-2">
        <li>
          <Link href={"/myShop"}>
            <Image src={"/shop.svg"} alt={"Cart"} height={50} width={50} />
          </Link>
        </li>
        <li>
          <Link href={"myShop/cart"}>
            <div className="relative">
              <div className="absolute flex top-0 right-0 rounded-full h-[20px] w-[20px] bg-red-500 items-center justify-center text-white">
                {cartItems}
              </div>
              <Image src={"/cart.svg"} alt={"Cart"} height={50} width={50} />
            </div>
          </Link>
        </li>
      </ul>
    </header>
  );
}
