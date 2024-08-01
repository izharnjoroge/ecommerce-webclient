import supabase from "@/src/config/client";
import useCartStore from "@/src/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const cartItems = items.length;
  const BASE_URL = "/myShop";
  const [initials, setInitials] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const username: string = user.user_metadata["username"] || user.email;
        const userInitials = username
          .split(" ")
          .map((name) => name[0])
          .join("");
        setInitials(userInitials);
      }
    };
    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <header
      className={`flex w-full justify-between bg-slate-100 sticky top-0 left-0 mb-2 z-10 ${
        pathname === "/" ? "hidden" : ""
      }`}
    >
      <section className="flex items-center px-2">
        <Link href={`${BASE_URL}`} className="">
          <Image src={"/trLogo.png"} alt="logo" height={100} width={80} />
        </Link>
        <h1 className="ml-2 md:ml-8 justify-center font-bold leading-3 text-[20px]">
          Metalle Mart
        </h1>
      </section>
      <div className="flex w-1/3  justify-end">
        <ul className="flex   items-center md:mr-8 gap-2 p-2">
          <li>
            <Link href={`${BASE_URL}/Cart`}>
              <div className="relative">
                <div className="absolute flex top-0 right-0 rounded-full h-[20px] w-[20px] bg-red-500 items-center justify-center text-white">
                  {cartItems}
                </div>
                <Image src={"/cart.svg"} alt={"Cart"} height={50} width={50} />
              </div>
            </Link>
          </li>
          <li className="relative">
            <div
              className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-500 text-white text-lg font-semibold cursor-pointer"
              onClick={toggleDropdown}
            >
              {initials}
            </div>
            {dropdownVisible && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <Image
                    src="/cart.svg"
                    alt="My Orders"
                    height={20}
                    width={20}
                    className="mr-2"
                  />
                  <Link
                    href={`${BASE_URL}/MyOrders`}
                    className="w-full"
                    onClick={toggleDropdown}
                  >
                    My Orders
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <Image
                    src="/settings.svg"
                    alt="Settings"
                    height={20}
                    width={20}
                    className="mr-2"
                  />
                  <Link href={`${BASE_URL}/Settings`} onClick={toggleDropdown}>
                    Settings
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <Image
                    src="/contact.svg"
                    alt="Contact Us"
                    height={20}
                    width={20}
                    className="mr-2"
                  />
                  <Link href={`${BASE_URL}/ContactUs`} onClick={toggleDropdown}>
                    Contact Us
                  </Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={handleLogout}
                >
                  <Image
                    src="/logout.svg"
                    alt="LogOut"
                    height={20}
                    width={20}
                    className="mr-2"
                  />
                  LogOut
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
