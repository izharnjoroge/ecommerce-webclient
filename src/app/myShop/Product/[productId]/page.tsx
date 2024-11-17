"use client";

import { fetchItemsById } from "@/src/config/functions";
import { ProductInterface } from "@/src/interfaces/product";
import useCartStore, { extractNumericValue } from "@/src/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ItemsToggle } from "@/src/components/reusables/ItemsToggle";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/reusables/spinner";

type ProductPageProps = {
  params: {
    productId: string;
  };
};


const ErrorComponent = () => (
  <div className="text-center text-red-500 p-4">
    <p>Oops! Something went wrong. Please try again later.</p>
  </div>
);

export default function ProductPage({ params }: ProductPageProps) {
  const { addItems, items, removeItems, updateTotalAndAmount } = useCartStore();
  const [quantity, setQuantity] = useState(1);



  const { isLoading, isError, data } = useQuery({
    queryKey: ["categoriesById", params.productId],
    queryFn: () => fetchItemsById(params.productId),
  });

  const product = data?.[0];

  if (isLoading) return  <Spinner />;
  if (isError) return <ErrorComponent />;

  if (!product) {
    return <ErrorComponent />;
  }

  const itemInCart = items.find((item) => item.item_id === product.item_id);

  
const handleAddToCart = (product: ProductInterface,items: number) => {
  addItems({
      ...product,
      total: items,
      newAmount: "",
    });
  };

  const handleRemoveFromCart = () => {
    removeItems(product.item_id);
  };

  const handleIncrement = () => {
   
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

 

  return (
    <div className="p-3 md:p-6 lg:p-0 bg-white md:w-auto">
     <div className="flex flex-col sm:flex-row rounded-lg sm:shadow-lg p-3 md:p-6 items-center md:items-stretch">
       {/* Image Section */}
       <div className="flex-shrink-0 md:w-1/3">
        <Image
          priority
          src={product.image}
          alt={product.name}
          className="rounded-md mb-4 md:mb-0"
          width={300}
          height={150}
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col justify-between sm:w-2/3 sm:pl-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <h3 className="text-green-600 text-lg mb-4">
          KSH {extractNumericValue(product.amount ?? "0").toLocaleString()}
        </h3>

        <div className="flex w-full justify-between md:gap-x-10 md:justify-normal mb-4">
          {/* Quantity Controls */}
        <div className="flex items-center ">
          <label className="mr-2">Quantity:</label>
          {itemInCart ? (
            <ItemsToggle
              items={itemInCart.total > 1 ? itemInCart.total : quantity}
              itemId={product.item_id}
              updateTotalAndAmount={updateTotalAndAmount}
            />
          ) : (
            <div className="flex items-center">
              <button
                onClick={handleDecrement}
                className="border border-gray-300 rounded-md p-1 bg-gray-100 hover:bg-gray-200"
              >
                <Image src="/minus.svg" alt="decrement" height={24} width={24} />
              </button>
              <span className="mx-2 text-lg">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="border border-gray-300 rounded-md p-1 bg-gray-100 hover:bg-gray-200"
              >
                <Image src="/add.svg" alt="increment" height={24} width={24} />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
       <div className="flex p-4 md:p-0">
       {itemInCart ? (
          <Button
            className="w-fit bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
            onClick={handleRemoveFromCart}
          >
            Remove
          </Button>
        ) : (
          <Button
            className="w-fit bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600"
            onClick={() => handleAddToCart(product,quantity)}
          >
            Add to Cart
          </Button>
        )}
       </div>
        </div>
      </div>
     </div>
    </div>
  );
}
