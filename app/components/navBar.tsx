import Image from "next/image";
import Link from "next/link";
export default function NavBar() {
  return (
    <header className=" flex w-[full] shadow-xl mr-4 ml-4 justify-between ">
      <section className="flex items-center">
        <Link href={"/"}>
          <Image src={"/shop.jpeg"} alt="logo" height={50} width={50} />
        </Link>
        <h1 className="ml-8">SupaBase Ecommerce Client Next</h1>
      </section>
      <ul className="flex w-1/6 justify-between items-center mr-8">
        <li>
          <Link href={"/myShop"}>Shop</Link>
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
