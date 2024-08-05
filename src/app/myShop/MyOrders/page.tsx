"use client";

import Spinner from "@/src/components/reusables/spinner";
import { getOrders } from "@/src/config/functions";
import { OrderInterface } from "@/src/interfaces/checkOut";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function MyOrders() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(
    null
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>An Error Occurred Please Try Again</div>;
  }

  const handleCardClick = (order: OrderInterface) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  console.log(data);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-purple-600 mb-4">My Orders</h1>
      <div className="grid grid-cols-1 gap-4">
        {data?.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-white shadow-md rounded-lg cursor-pointer"
            onClick={() => handleCardClick(order)}
          >
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.created_at).toLocaleDateString("en-GB")}
            </p>
            <p>
              <strong>Delivered:</strong> {order.completed ? "Yes" : "No"}
            </p>
            <p>
              <strong>Amount:</strong> KSH {order.amount}
            </p>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div onBlur={closeModal}>
          <Modal open={true} onClose={closeModal}>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <ul>
              {selectedOrder.items.map((item) => (
                <li key={item.item_id} className="mb-2">
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p className="line-clamp-3">
                    <strong>Description:</strong> {item.description}
                  </p>
                  <p>
                    <strong>Amount:</strong> {item.amount}
                  </p>
                  <p>
                    <strong>Number Of Items:</strong> {item.total ?? 1}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              className="mt-4 bg-purple-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </Modal>
        </div>
      )}
    </div>
  );
}
