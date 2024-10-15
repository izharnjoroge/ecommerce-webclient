import { CarouselInterface } from "../interfaces/carousels";
import { CategoriesInterface } from "../interfaces/categories";
import { CheckOutInterface, OrderInterface } from "../interfaces/checkOut";
import { LocationInterface } from "../interfaces/locations";
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
    const { data } = await supabase.from("items").select().limit(10);
    const products: ProductInterface[] = data || [];
    return products;
  } catch (error) {
    throw error;
  }
}

export async function fetchItemsPerCategory(categoryId: string, items: number) {
  try {
    const start = items <= 10 ? 0 : items - 10;
    const end = items - 1;

    const { data, error } = await supabase
      .from("items")
      .select()
      .eq("categoryId", categoryId)
      .range(start, end);

    if (error) {
      throw error;
    }

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

export async function fetchLocations() {
  try {
    const { data } = await supabase.from("location").select();

    const locations: LocationInterface[] = data || [];
    return locations;
  } catch (error) {
    throw error;
  }
}

export async function LoginUser(email: string) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
      },
    });
    return { data, error };
  } catch (error) {
    throw error;
  }
}

export async function VerifyOtp(email: string, token: string) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    return { data, error };
  } catch (error) {
    throw error;
  }
}

export async function SignOut() {
  await supabase.auth.signOut();
}

export async function DeleteAccount() {
  try {
    await supabase.functions.invoke("delete_user_account");
  } catch (error) {
    throw error;
  }
}

export async function SignUpUser(
  username: string,
  email: string,
  password: string,
  area: string,
  street: string,
  phone: string
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          phone: phone,
          area: area ?? "",
          street: street ?? "",
        },
      },
    });
    return { data, error };
  } catch (error) {
    throw error;
  }
}

export async function getLocations() {
  try {
    const { data } = await supabase.from("location").select();
    const locations: LocationInterface[] = data || [];
    return locations;
  } catch (error) {
    throw error;
  }
}

export async function getUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function UpdateUser(
  username: string,
  email: string,
  area: string,
  street: string,
  phone: string
) {
  try {
    await supabase.auth.updateUser({
      email: email,
      data: {
        username: username,
        phone: phone,
        area: area,
        street: street,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getOrders() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("orders")
      .select()
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });
    const orders: OrderInterface[] = data || [];
    return orders;
  } catch (error) {
    throw error;
  }
}
