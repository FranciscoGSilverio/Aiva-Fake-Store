import { api } from "src/services/api";
import { Product } from "src/types/Product.type";

export const getRelatedProducts = async (
  productId: string
): Promise<Product[]> => {
  try {
    const { data } = await api.get(`/products/${productId}/related`);
    return data;
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw new Error("Failed to fetch related products");
  }
};
