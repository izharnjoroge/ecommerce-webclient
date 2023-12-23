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
    <div className="flex overflow-x-auto">
      {data.map((e) => (
        <Link key={e.category_id} href={`/myShop/${e.category_id}`}>
          <div
            className={`flex flex-col items-center justify-center mr-10 ml-10 h-[100px] w-[100px] ${
              pathname.includes(e.category_id)
                ? "bg-yellow-200"
                : "bg-slate-200"
            }  rounded-full`}
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
