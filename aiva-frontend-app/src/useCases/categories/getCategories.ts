import { api } from "@/services/api";
import { Category } from "@/types/Category.type";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await api.get(`/categories?limit=100`);

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
