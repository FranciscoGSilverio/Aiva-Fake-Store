import { api } from "src/services/api";
import { Product } from "src/types/Product.type";

export const getProductById = async (id: number | string): Promise<Product> => {
  try {
    const { data } = await api.get(`/products/${id}`);

    return data;
  } catch (error) {
    console.error("Error fetching product with id: " + id, error);
    throw new Error("Failed to fetch productt with id: " + id);
  }
};
