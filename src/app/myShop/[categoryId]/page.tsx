import Link from "next/link";
import Image from "next/image";
import { ProductInterface } from "@/src/interfaces/product";
import CategoriesComponent from "@/src/components/reusables/categories";
import { GridItems } from "@/src/components/reusables/gridItems";

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
          <div className="mt-1 mb-3 md:mt-10 md:mb-10">
            <CategoriesComponent />
          </div>
          <GridItems products={CategoryProducts} />
        </section>
      </main>
    ) : (
      <main>
        <div className="mt-1 mb-3 md:mt-10 md:mb-10">
          <CategoriesComponent />
        </div>
        <div>No Products...</div>
      </main>
    )
  ) : (
    <main>
      <div className="mt-1 mb-3 md:mt-10 md:mb-10">
        <CategoriesComponent />
      </div>
      <div>No Products...</div>
    </main>
  );
}
