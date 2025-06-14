import { api } from "src/services/api";
import { Product } from "src/types/Product.type";

export const getProducts = async (
  limit = 8,
  offset = 0
): Promise<Product[]> => {
  try {
    const { data } = await api.get(`/products?limit=${limit}&offset=${offset}`);

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};
