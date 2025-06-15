import { api } from "@/services/api";
import { NewProductDto, Product } from "@/types/Product.type";

export const updateProduct = async (
  updatedProduct: NewProductDto,
  productId: Product["id"]
): Promise<Product> => {
  try {
    const { data } = await api.put<Product>(
      `/products/${productId}`,
      updatedProduct
    );

    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};
