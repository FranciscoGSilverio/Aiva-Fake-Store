import { api } from "src/services/api";
import { Product } from "src/types/Product.type";
import { getProductsByCategory } from "../categories/getProductsByCategory";

export const getProducts = async (
  limit = 10,
  offset = 0,
  categoryId?: number
): Promise<Product[]> => {
  try {
    if (categoryId) {
      return await getProductsByCategory(limit, offset, Number(categoryId));
    }
    const { data } = await api.get(`/products?limit=${limit}&offset=${offset}`);

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};
