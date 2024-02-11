"use client";
import CategoriesComponent from "@/src/components/reusables/categories";
import { GridItems } from "@/src/components/reusables/gridItems";
import { ErrorLoading } from "@/src/components/reusables/loading";
import { fetchItems, fetchItemsPerCategory } from "@/src/config/functions";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";

type CategoryPageProps = {
  params: {
    categoryId: string;
  };
};

export default function categories({ params }: CategoryPageProps) {
  const {
    isLoading,
    isError,
    data: CategoryProducts,
  } = useQuery({
    queryKey: ["categories", params.categoryId],
    queryFn: () => fetchItemsPerCategory(params.categoryId),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }
  return CategoryProducts!.length > 0 ? (
    <main>
      <section>
        <div className="mt-1 mb-3 md:mt-10 md:mb-10">
          <CategoriesComponent />
        </div>
        <GridItems products={CategoryProducts!} />
      </section>
    </main>
  ) : (
    <main>
      <div className="mt-1 mb-3 md:mt-10 md:mb-10">
        <CategoriesComponent />
      </div>
      <div>No Products...</div>
    </main>
  );
}
