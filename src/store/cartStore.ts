import { create } from "zustand";
import { ProductInterface } from "../interfaces/product";

interface CartStore {
  items: ProductInterface[];
  addItems: (item: ProductInterface) => void;
  removeItems: (itemId: string) => void;
  checkOut: () => void;
}

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
  checkOut: () => {
    set((state) => {
      console.log("Checking out:", state.items);
      return { items: [] }; // Clearing the items after checkout
    });
  },
}));

export default useCartStore;
