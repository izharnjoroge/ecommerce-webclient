import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ProductInterface } from "@/src/interfaces/product";
import useCartStore, { extractNumericValue } from "@/src/store/cartStore";
import Image from "next/image";
import { ItemsToggle } from "./ItemsToggle";
import "../../components/modal.css";

interface ProductModalProps {
  product: ProductInterface;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onRequestClose,
}: ProductModalProps) {
  const { addItems, items, removeItems, updateTotalAndAmount } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const itemInCart = items.find((item) => item.item_id === product.item_id);

  const handleAddToCart = () => {
    addItems({
      ...product,
      total: 0,
      newAmount: (quantity * extractNumericValue(product.amount)).toString(),
    });
  };

  const handleRemoveFromCart = () => {
    removeItems(product.item_id);
  };

  const handleIncrement = () => {
    handleAddToCart();
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      center
      classNames={{
        modal: "customModal",
      }}
    >
      <div className="rounded-lg md:w-96">
        <h2 className="text-xl font-bold mt-5 mb-4">{product.name}</h2>
        <div className="flex w-full justify-center">
          <img src={product.image} className="h-[150px] mb-4" />
        </div>
        <p className="text-black mb-4">{product.description}</p>
        <h3 className="text-green-600 mb-4">
          KSH {extractNumericValue(product.amount).toLocaleString()}
        </h3>
        <div className="w- flex items-center mb-4 ">
          <label className="mr-2">Quantity:</label>
          {itemInCart ? (
            <ItemsToggle
              items={quantity}
              itemId={product.item_id}
              updateTotalAndAmount={updateTotalAndAmount}
            />
          ) : (
            <div className="flex items-center">
              <button
                onClick={handleDecrement}
                className="border border-gray-300 rounded-md p-1"
              >
                <Image
                  src={"/minus.svg"}
                  alt={"checkout"}
                  height={30}
                  width={30}
                />
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="border border-gray-300 rounded-md p-1"
              >
                <Image
                  src={"/add.svg"}
                  alt={"checkout"}
                  height={30}
                  width={30}
                />
              </button>
            </div>
          )}
        </div>
        {itemInCart ? (
          <button
            className="bg-red-500 text-white rounded-lg px-4 py-2"
            onClick={handleRemoveFromCart}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="bg-purple-500 text-white rounded-lg px-4 py-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
        <button className="ml-2 text-gray-600" onClick={onRequestClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
