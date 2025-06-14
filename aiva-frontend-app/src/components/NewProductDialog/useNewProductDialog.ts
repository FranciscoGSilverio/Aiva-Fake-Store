import { useDataContext } from "@/providers/DataContext";
import { NewProductDto } from "@/types/Product.type";
import { createProduct } from "@/useCases/products/createProduct";
import { getProducts } from "@/useCases/products/getProducts";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

type UseNewProductDialogProps = {
  setAddProductDialogOpen: (open: boolean) => void;
};

export const useNewProductDialog = ({
  setAddProductDialogOpen,
}: UseNewProductDialogProps) => {
  const { setProducts, categories } = useDataContext();

  const handleAddNewProduct = useCallback(async (values: NewProductDto) => {
    const _newProduct = await createProduct(values);
    if (_newProduct) {
      toast.success("Produto criado com sucesso!");
      const _products = await getProducts();
      setProducts(_products);

      setAddProductDialogOpen(false);
    }
  }, []);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      value: String(category.id),
      label: category.name,
    }));
  }, [categories]);

  return {
    handleAddNewProduct,
    categoryOptions,
  };
};
