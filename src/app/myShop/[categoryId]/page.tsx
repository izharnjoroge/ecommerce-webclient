import Link from "next/link";
import Image from "next/image";
import { ProductInterface } from "@/src/interfaces/product";
import CategoriesComponent from "@/src/components/categories";

type CategoryPageProps = {
  params: {
    categoryId: string;
  };
};

export default async function categories({ params }: CategoryPageProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/items?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    {
      cache: "no-store",
    }
  );

  const products: ProductInterface[] | null = await response.json();
  const CategoryProducts =
    products?.filter((product) => product.categoryId === params.categoryId) ||
    [];

  return CategoryProducts !== null ? (
    CategoryProducts.length > 0 ? (
      <main>
        <section>
          <div className="mt-10">
            <CategoriesComponent />
          </div>
          <div className="grid grid-cols-4">
            {CategoryProducts.map((product) => (
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
      <div>Please refresh...</div>
    )
  ) : (
    <div>Please refresh...</div>
  );
}
