"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavBar() {
  const pathname = usePathname();
  return (
    <header
      className={`flex w-[full] justify-between  bg-slate-100 ${
        pathname === "/" ? "hidden" : ""
      }`}
    >
      <section className="flex items-center ">
        <Link href={"/"}>
          <Image src={"/shop.jpeg"} alt="logo" height={100} width={80} />
        </Link>
        <h1 className="ml-8 justify-center">SupaBase Ecommerce Client Next</h1>
      </section>
      <ul className="flex w-1/6 justify-between items-center mr-8">
        <li>
          <Link href={"/myShop"}>
            <Image src={"/shop.svg"} alt={"Cart"} height={50} width={50} />
          </Link>
        </li>
        <li>
          <Link href={"myShop/cart"}>
            <Image src={"/cart.svg"} alt={"Cart"} height={50} width={50} />
          </Link>
        </li>
      </ul>
    </header>
  );
}
