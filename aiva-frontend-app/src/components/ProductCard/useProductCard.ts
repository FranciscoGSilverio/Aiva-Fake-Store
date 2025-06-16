import { useDataContext } from "@/providers/DataContext";
import { deleteProduct } from "@/useCases/products/deleteProduct";
import { getProducts } from "@/useCases/products/getProducts";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useProductCard = () => {
  const { setProducts } = useDataContext();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    setIsMobile(/android|iphone|ipad|mobile/i.test(userAgent));
  }, []);

  const handleDeleteProduct = useCallback(
    async (id: number) => {
      setIsDeleteLoading(true);
      const isDeleted = await deleteProduct(id);
      if (isDeleted) {
        const _products = await getProducts();
        setProducts(_products);
        toast.success("Produto excluído com sucesso!");
      } else {
        toast.error("Erro ao excluir o produto. Tente novamente.");
      }

      setIsDeleteLoading(false);
      setIsConfirmationOpen(false);
    },
    [setProducts]
  );

  const handleCardClick = (id: number) => {
    if (!isMobile) {
      window.open(`/product/${id}`, "_blank");
      return;
    }

    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      window.open(`/product/${id}`, "_blank");
    }
  };

  return {
    isConfirmationOpen,
    setIsConfirmationOpen,
    handleDeleteProduct,
    isDeleteLoading,
    isExpanded,
    setIsExpanded,
    isMobile,
    handleCardClick,
  };
};
