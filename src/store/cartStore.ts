import { create } from "zustand";
import { ProductInterface } from "../interfaces/product";
import { postOrders } from "../config/functions";

interface CartStore {
  items: ProductInterface[];
  addItems: (item: ProductInterface) => void;
  removeItems: (itemId: string) => void;
  checkOut: () => void;
}

const extractNumericValue = (price: string): number => {
  const numericValue = parseInt(price.replace(/[^0-9]/g, ""), 10);
  return isNaN(numericValue) ? 0 : numericValue;
};

const calculateTotalAmount = (items: ProductInterface[]): number => {
  return items.reduce(
    (total, item) => total + extractNumericValue(item.amount),
    0
  );
};

const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItems: (item) => {
    set((state) => ({
      items: [...state.items, item],
    }));
  },
  removeItems: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.item_id !== itemId),
    }));
  },
  checkOut: async () => {
    set((state) => {
      const postOrder = async () => {
        const totalAmount = calculateTotalAmount(state.items);

        try {
          const data = await postOrders({
            completed: false,
            amount: totalAmount,
            items: state.items,
          });
          alert("Order Placed");
          // Handle the response as needed
        } catch (error) {
          // Handle error
          console.error("Error posting order:", error);
        }
      };

      // Call the async function
      postOrder();
      return { items: [] };
    });
  },
}));

export default useCartStore;
