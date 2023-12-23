import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-[100vh] bg-black ">
      <Image src="/hero2.jpg" alt="logo" fill={true} className="object-cover" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-8 text-white font-bold text-4xl">
        <Link href={"/myShop"}>
          <h1 className="transition-all hover:border-grey hover:border-8">
            Go Shopping!
          </h1>
        </Link>
      </div>
    </div>
  );
}
