import Link from "next/link";
import Image from "next/image";
import { ProductInterface } from "@/app/interfaces/product";
import Categories from "@/app/components/categories";

type CategoryPageProps = {
  params: {
    id: string;
  };
};
export default async function Categorie({ params }: CategoryPageProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/items?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}&eq('categoryId',${params.id})`
  );
  const products: ProductInterface[] | null = await response.json();
  return products !== null ? (
    products.length > 0 ? (
      <main>
        <section>
          <div className="mt-10">
            <Categories />
          </div>
          <div className="grid grid-cols-4">
            {products.map((product) => (
              <div
                className="col-span-1 h-auto w-auto  gap-10 p-10 "
                key={product.item_id}
              >
                <div className="bg-zinc-100  relative">
                  <img src={product.image} height={150} className="mt-10" />
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-xl text-black">{product.name}</h1>
                    <p className="text-gray-400">{product.description}</p>
                    <h3>{product.amount}</h3>
                    <div className="w-full flex justify-end">
                      <div className="text-purple-700 top-0 right-0">
                        <Link href={"/myShop/cart"}>
                          <Image
                            src={"/cart.svg"}
                            alt={"cart"}
                            width={30}
                            height={30}
                          />
                        </Link>
                      </div>
                    </div>
                    <h3 className="text-purple-700 top-0 text-xl right-0 absolute">
                      {product.rating}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    ) : (
      <div key={products[0].item_id} className="max-h-[250px]">
        <img src={products[0].image} height={150} />
        <h1 className="text-xl text-black">{products[0].name}</h1>
        <p className="text-gray-400">{products[0].description}</p>
        <div className="w-full flex justify-between ">
          <div className="top-[200px] left-0 text-green-700 ">
            <h3>{products[0].amount}</h3>
          </div>
          <div className="text-purple-700 top-0 right-0">
            <Link href={"/myShop/cart"}>
              <Image src={"/cart.svg"} alt={"cart"} width={30} height={30} />
            </Link>
          </div>
        </div>
        <div className="text-purple-700 top-0 right-0 absolute">
          <h3>{products[0].rating}</h3>
        </div>
      </div>
    )
  ) : (
    <div>Please refresh...</div>
  );
}
