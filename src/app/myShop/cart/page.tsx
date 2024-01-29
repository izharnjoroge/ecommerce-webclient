"use client";
import useStore from "@/src/store/cartStore";
import React from "react";

export default function Cart() {
  const { items, removeItems, checkOut } = useStore();

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.item_id}>
            {item.name} - {item.amount}
            <button onClick={() => removeItems(item.item_id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={checkOut}>Check Out</button>
    </div>
  );
}
