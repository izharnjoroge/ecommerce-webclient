import { create } from "zustand";
import { ProductInterface } from "../interfaces/product";
import { postOrders } from "../config/functions";
import { toast } from "react-toastify";

export interface CartItems extends ProductInterface {
  newAmount: string;
}

interface CartStore {
  items: CartItems[];
  area: string;
  street: string;
  description: string;
  userId: string;
  addItems: (item: CartItems) => void;
  removeItems: (itemId: string) => void;
  updateTotalAndAmount: (itemId: string, newTotal: number) => void;
  locationDetails: (
    area: string,
    street: string,
    description: string,
    userId: string
  ) => void;
  checkOut: () => void;
}

export const extractNumericValue = (price: string): number => {
  const numericValue = parseInt(price.replace(/[^0-9]/g, ""), 10);
  return isNaN(numericValue) ? 0 : numericValue;
};

export const calculateTotalAmount = (items: CartItems[]): number => {
  return items.reduce(
    (total, item) => total + extractNumericValue(item.newAmount),
    0
  );
};

const useCartStore = create<CartStore>((set) => ({
  items: [],
  area: "",
  street: "",
  description: "",
  userId: "",
  addItems: (item) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.item_id === item.item_id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        existingItem.total += 1;
        const numericValue = extractNumericValue(existingItem.amount);
        const newAmountNumeric = numericValue * existingItem.total;
        existingItem.newAmount = `KSH ${newAmountNumeric.toLocaleString()}`;
        return { items: updatedItems };
      } else {
        const newTotal = 1;
        const numericValue = extractNumericValue(item.amount);
        const newAmountNumeric = numericValue * newTotal;
        const newItem = {
          ...item,
          total: newTotal,
          newAmount: `KSH ${newAmountNumeric.toLocaleString()}`,
        };
        return {
          items: [...state.items, newItem],
        };
      }
    });
  },
  updateTotalAndAmount: (itemId, newTotal) => {
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.item_id === itemId) {
          const numericValue = extractNumericValue(item.amount);
          const newAmountNumeric = numericValue * newTotal;
          const updatedAmount = `KSH ${newAmountNumeric.toLocaleString()}`;
          return { ...item, total: newTotal, newAmount: updatedAmount };
        }
        return item;
      });
      return { items: updatedItems };
    });
  },
  locationDetails: async (area, street, description, userId) => {
    set((state) => ({
      area: area,
      street: street,
      description: description,
      userId: userId,
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
            details: {
              area: state.area,
              street: state.street,
              description: state.description,
            },
            completed: false,
            amount: totalAmount,
            items: state.items,
            user_id: state.userId,
          });
          //alert("Order Placed");
          toast.success("Order Placed");
          // Handle the response as needed
        } catch (error) {
          //alert("Error posting order");
          toast.error("Error posting order");
        }
      };

      // Call the async function
      postOrder();
      return { items: [] };
    });
  },
}));

export default useCartStore;
