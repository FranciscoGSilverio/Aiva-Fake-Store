import { api } from "@/services/api";
import { Product } from "@/types/Product.type";

export const getProductsByCategory = async (
  categoryId: number
): Promise<Product[]> => {
  try {
    const { data } = await api.get(
      `/categories/${categoryId}/products?limit=100&offset=0`
    );
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error(
      "Failed to fetch products by category. Please try again later."
    );
  }
};
