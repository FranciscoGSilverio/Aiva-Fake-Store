import { useDataContext } from "@/providers/DataContext";
import { NewProductDto } from "@/types/Product.type";
import { getCategories } from "@/useCases/categories/getCategories";
import { createProduct } from "@/useCases/products/createProduct";
import { getProducts } from "@/useCases/products/getProducts";
import { updateProduct } from "@/useCases/products/updateProduct";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type UseNewProductDialogProps = {
  setAddProductDialogOpen: (open: boolean) => void;
  initialValues?: NewProductDto;
  handleRefresh: () => void;
};

const EMPTY_PRODUCT: NewProductDto = {
  title: "",
  price: 0,
  description: "",
  categoryId: "",
  images: [""],
};

export const useNewProductDialog = ({
  setAddProductDialogOpen,
  initialValues,
  handleRefresh,
}: UseNewProductDialogProps) => {
  const { setProducts, categories, setCategories } = useDataContext();
  const params = useParams();

  const [isCreateLoading, setIsCreateLoading] = useState<boolean>(false);

  const isEdditingProduct = useMemo(() => {
    return Boolean(initialValues && initialValues.title);
  }, [initialValues]);

  const handleAddNewProduct = useCallback(
    async (values: NewProductDto) => {
      if (isEdditingProduct) {
        setIsCreateLoading(true);
        const _updatedProduct = await updateProduct(
          values,
          params?.id as unknown as number
        );

        if (_updatedProduct) {
          toast.success("Produto atualizado com sucesso!");
          const _products = await getProducts();
          setProducts(_products);

          setAddProductDialogOpen(false);
        } else {
          toast.error("Erro ao atualizar o produto.");
        }
        setIsCreateLoading(false);
        handleRefresh();
        return;
      }

      setIsCreateLoading(true);
      const _newProduct = await createProduct(values);
      if (_newProduct) {
        toast.success("Produto criado com sucesso!");
        const _products = await getProducts();
        setProducts(_products);

        setIsCreateLoading(false);

        setAddProductDialogOpen(false);
      }
    },
    [isEdditingProduct]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const _categories = await getCategories();
        setCategories(_categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const formikInitialValues: NewProductDto = useMemo(() => {
    if (isEdditingProduct) {
      return {
        title: initialValues?.title || "",
        price: initialValues?.price || 0,
        description: initialValues?.description || "",
        categoryId: String(
          categories.find((_c) => _c.id === Number(initialValues?.categoryId))
            ?.id || ""
        ),
        images: initialValues?.images || [""],
      };
    }
    return EMPTY_PRODUCT;
  }, [initialValues, categories]);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      value: String(category.id),
      label: category.name,
    }));
  }, [categories]);

  return {
    handleAddNewProduct,
    categoryOptions,
    isCreateLoading,
    formikInitialValues,
    isEdditingProduct,
  };
};
