import { useDataContext } from "@/providers/DataContext";
import { deleteProduct } from "@/useCases/products/deleteProduct";
import { getProducts } from "@/useCases/products/getProducts";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useProductCard = () => {
  const { setProducts } = useDataContext();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const handleDeleteProduct = useCallback(
    async (id: number) => {
      const isDeleted = await deleteProduct(id);
      if (isDeleted) {
        const _products = await getProducts();
        setProducts(_products);
        toast.success("Produto excluído com sucesso!");
      } else {
        toast.error("Erro ao excluir o produto. Tente novamente.");
      }

      setIsConfirmationOpen(false);
    },
    [setIsConfirmationOpen, toast]
  );
  return {
    isConfirmationOpen,
    setIsConfirmationOpen,
    handleDeleteProduct,
  };
};
