import { api } from "src/services/api";

export const deleteProduct = async (id: number | string): Promise<boolean> => {
  try {
    const { data } = await api.delete(`/products/${id}`);

    return data;
  } catch (error) {
    console.error("Error deleting product with id: " + id, error);
    throw new Error("Failed to delete product with id: " + id);
  }
};
