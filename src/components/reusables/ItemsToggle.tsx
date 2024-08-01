import React, { useState } from "react";
import Image from "next/image";

export const ItemsToggle = ({
  items,
  updateTotalAndAmount,
  itemId,
}: {
  items: number;
  itemId: string;
  updateTotalAndAmount: (itemId: string, newTotal: number) => void;
}) => {
  const [itemz, setItems] = useState(items);
  return (
    <div className="flex justify-between items-center">
      <button
        className="border border-gray-300 rounded-md p-1"
        onClick={() => {
          if (itemz > 1) {
            setItems(itemz - 1);
            updateTotalAndAmount(itemId, itemz - 1);
          }
        }}
      >
        {" "}
        <Image src={"/minus.svg"} alt={"checkout"} height={30} width={30} />
      </button>
      <span className="mx-2">{itemz}</span>
      <button
        className="border border-gray-300 rounded-md p-1"
        onClick={() => {
          setItems(itemz + 1);
          updateTotalAndAmount(itemId, itemz + 1);
        }}
      >
        {" "}
        <Image src={"/add.svg"} alt={"checkout"} height={30} width={30} />
      </button>
    </div>
  );
};
