import { api } from "@/services/api";
import { NewProductDto, Product } from "@/types/Product.type";

export const createProduct = async (
  product: NewProductDto
): Promise<Product> => {
  try {
    const { data } = await api.post("/products", product);
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
};
