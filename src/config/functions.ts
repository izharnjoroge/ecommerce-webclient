import { CarouselInterface } from "../interfaces/carousels";
import { CategoriesInterface } from "../interfaces/categories";
import { CheckOutInterface } from "../interfaces/checkOut";
import { ProductInterface } from "../interfaces/product";
import supabase from "./client";

export async function fetchCarousels() {
  try {
    const { data } = await supabase.from("carousels").select();
    const carousels: CarouselInterface[] = data || [];
    return carousels;
  } catch (error) {
    throw error;
  }
}

export async function fetchCategories() {
  try {
    const { data } = await supabase.from("categories").select();
    const categories: CategoriesInterface[] = data || [];
    return categories;
  } catch (error) {
    throw error;
  }
}

export async function fetchItems() {
  try {
    const { data } = await supabase.from("items").select();
    const products: ProductInterface[] = data || [];
    return products;
  } catch (error) {
    throw error;
  }
}

export async function fetchItemsPerCategory(categoryId: string) {
  try {
    const { data } = await supabase
      .from("items")
      .select()
      .eq("categoryId", categoryId);
    const categoryItems: ProductInterface[] = data || [];
    return categoryItems;
  } catch (error) {
    throw error;
  }
}

export async function postOrders(cart: CheckOutInterface) {
  try {
    const { data } = await supabase.from("orders").insert([cart]);
    if (data) {
    }
  } catch (error) {
    throw error;
  }
}
