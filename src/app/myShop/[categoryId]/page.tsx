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
                className="h-[500px] p-10 overflow-auto"
                key={product.item_id}
              >
                <div className="bg-zinc-100  relative">
                  <div className="flex w-[full] mb-5 ml-2 mr-2 justify-between">
                    <Link href={"/myShop/cart"} className="">
                      <Image
                        src={"/cart.svg"}
                        alt={"cart"}
                        width={30}
                        height={30}
                      />
                    </Link>

                    <div className="flex h-[30px] w-[30px] bg-purple-500 text-white rounded-md text-xl justify-center">
                      <h3 className="">{product.rating}</h3>
                    </div>
                  </div>
                  <img src={product.image} height={150} />
                  <div className=" overflow-auto">
                    <h1 className="text-xl text-black">{product.name}</h1>
                    <p className="text-gray-400 ">{product.description}</p>
                    <h3 className="text-green-600 mt-5">{product.amount}</h3>
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
