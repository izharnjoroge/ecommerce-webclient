"use client";
import CategoriesComponent from "@/src/components/reusables/categories";
import { GridItems } from "@/src/components/reusables/gridItems";
import {
  ProductLoading,
  ErrorLoading,
} from "@/src/components/reusables/loading";
import { Input } from "@/src/components/ui/input";
import { fetchItemsPerCategory } from "@/src/config/functions";
import { ProductInterface } from "@/src/interfaces/product";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useReducer, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type CategoryPageProps = {
  params: {
    categoryId: string;
  };
};

// Initial State for the useReducer
const initialState = {
  items: 10,
  hasMore: true,
  categoryProducts: [] as ProductInterface[],
  initialLoading: true,
  searchTerm: "",
};

// Action Types
type Action =
  | { type: "SET_PRODUCTS"; payload: ProductInterface[] }
  | { type: "RESET_STATE" }
  | { type: "LOAD_MORE" }
  | { type: "UPDATE_ITEMS"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SEARCH_TERM"; payload: string };

// Reducer Function
function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        categoryProducts: [...state.categoryProducts, ...action.payload].reduce(
          (acc, product) => {
            if (!acc.find((p) => p.item_id === product.item_id)) {
              acc.push(product);
            }
            return acc;
          },
          [] as ProductInterface[]
        ),
        hasMore:
          action.payload.length % 10 === 0 && action.payload.length !== 0,
        initialLoading: false,
      };
    case "RESET_STATE":
      return { ...initialState };
    case "LOAD_MORE":
      return { ...state, items: state.items + 10 };
    case "UPDATE_ITEMS":
      return { ...state, items: action.payload };
    case "SET_LOADING":
      return { ...state, initialLoading: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
}

export default function Categories({ params }: CategoryPageProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, isError, isFetching, data } = useQuery({
    queryKey: ["categoriesById", params.categoryId, state.items],
    queryFn: () => fetchItemsPerCategory(params.categoryId, state.items),
    enabled: !!state.items,
  });

  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
  }, [params.categoryId]);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_PRODUCTS", payload: data });
    }
  }, [data]);

  const fetchMoreData = () => {
    if (!isFetching && !isLoading) {
      dispatch({ type: "LOAD_MORE" });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: event.target.value });
  };

  const filteredProducts = state.categoryProducts.filter((product) =>
    product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  if (state.initialLoading && isLoading) {
    return (
      <main className="w-full mb-5 mt-2">
        <section>
          <div className="mt-1 mb-3 md:mt-10 md:mb-10">
            <CategoriesComponent />
          </div>
          <div className="px-1 md:px-3">
            <div className=" mb-5">
              <Input
                type="text"
                className="w-full"
                placeholder="Search products..."
              />
            </div>
            <div>
              <ProductLoading />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return state.categoryProducts && state.categoryProducts.length > 0 ? (
    <main className="mb-5 mt-2">
      <section>
        <div className="mt-1 mb-3 md:mt-10 md:mb-10">
          <CategoriesComponent />
        </div>
        <div className="">
          <div className="p-2 mb-5">
            <Input
              type="text"
              className="w-full"
              placeholder="Search products..."
              onChange={handleInputChange}
              value={state.searchTerm}
            />
          </div>
          <div>
            <InfiniteScroll
              dataLength={filteredProducts.length}
              next={fetchMoreData}
              hasMore={state.hasMore}
              loader={<ProductLoading />}
              endMessage={<p></p>}
            >
              <GridItems products={filteredProducts} />
            </InfiniteScroll>
          </div>
        </div>
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
