"use client";
import { usePathname } from "next/navigation";
import { CategoriesInterface } from "../interfaces/categories";
import Link from "next/link";

export default async function CategoriesComponent() {
  const pathname = usePathname();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/categories?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
  );
  const data: CategoriesInterface[] | null = await response.json();

  return data !== null ? (
    <div className="flex h-fit">
      {data.map((e) => (
        <Link key={e.category_id} href={`/myShop/${e.category_id}`}>
          <div
            className={`flex flex-col items-center justify-center ml-2 mr-2 md:mr-10 md:ml-10  ${
              pathname.includes(e.category_id)
                ? "border-b-[5px] border-purple-600"
                : ""
            } `}
            key={e.category_id}
          >
            <img src={e.url} alt={"icon"} height={50} width={50} />
            <h3 className="text-center">{e.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div>No data</div>
  );
}
