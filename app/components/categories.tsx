import Image from "next/image";
import { CategoriesInterface } from "../interfaces/categories";

export default async function Categories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/categories?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
  );
  const data: CategoriesInterface[] | null = await response.json();

  return data !== null ? (
    <div className="flex overflow-x-auto">
      {data.map((e) => (
        <div className="flex-col mr-10 ml-10" key={e.category_id}>
          <img src={e.url} alt={"icon"} height={100} width={100} />
          <h3>{e.name}</h3>
        </div>
      ))}
    </div>
  ) : (
    <div>No data</div>
  );
}
