"use client";
import CategoriesComponent from "@/src/components/reusables/categories";
import { GridItems } from "@/src/components/reusables/gridItems";
import {
  ProductLoading,
  ErrorLoading,
} from "@/src/components/reusables/loading";
import { fetchItemsPerCategory } from "@/src/config/functions";
import { ProductInterface } from "@/src/interfaces/product";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type CategoryPageProps = {
  params: {
    categoryId: string;
  };
};

export default function Categories({ params }: CategoryPageProps) {
  const [items, setItems] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState<ProductInterface[]>(
    []
  );
  const [initialLoading, setInitialLoading] = useState(true);

  const { isLoading, isError, isFetching, data } = useQuery({
    queryKey: ["categoriesById", params.categoryId, items],
    queryFn: () => fetchItemsPerCategory(params.categoryId, items),
    enabled: !!items,
  });

  useEffect(() => {
    if (data) {
      setCategoryProducts((prevProducts) => {
        const newProducts = [...prevProducts, ...data];
        setHasMore(data.length % 10 === 0 && data.length !== 0);
        return newProducts;
      });
      setInitialLoading(false);
    }
  }, [data]);

  const fetchMoreData = () => {
    if (!isFetching && !isLoading) {
      setItems((prevItems) => prevItems + 10);
    }
  };

  if (initialLoading && isLoading) {
    return (
      <main className="mb-5 mt-2">
        <section>
          <div className="mt-1 mb-3 md:mt-10 md:mb-10">
            <CategoriesComponent />
          </div>
          <div>
            <ProductLoading />
          </div>
        </section>
      </main>
    );
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return categoryProducts && categoryProducts.length > 0 ? (
    <main className="mb-5 mt-2">
      <section>
        <div className="mt-1 mb-3 md:mt-10 md:mb-10">
          <CategoriesComponent />
        </div>
        <InfiniteScroll
          dataLength={categoryProducts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<ProductLoading />}
          endMessage={<p></p>}
        >
          <GridItems products={categoryProducts} />
        </InfiniteScroll>
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
