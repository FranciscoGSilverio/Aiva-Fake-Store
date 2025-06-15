"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDataContext } from "@/providers/DataContext";
import { getProductsByCategory } from "@/useCases/categories/getProductsByCategory";
import { getProducts } from "@/useCases/products/getProducts";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export const useNavigationBar = () => {
  const { categories, setProducts } = useDataContext();
  const [categoryId, setCategoryId] = useState<string | undefined>("");

  const [, setIsLoggedIn] = useLocalStorage<boolean>("isLoggedIn", false);

  const router = useRouter();

  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);

  const updateProductsByCategory = async (categoryId: string) => {
    setCategoryId(categoryId);
    const limit = 10;
    const offset = 0;
    const newProducts = await getProducts(limit, offset, Number(categoryId));
    setProducts(newProducts);
  };

  const resetProducts = async () => {
    setCategoryId("");
    const newProducts = await getProducts();
    setProducts(newProducts);
  };

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      value: String(category.id),
      label: category.name,
    }));
  }, [categories]);

  const logout = () => {
    setIsLoggedIn(false);
    router.push("/login");
  };

  return {
    addProductDialogOpen,
    setAddProductDialogOpen,
    updateProductsByCategory,
    categoryOptions,
    logout,
    categoryId,
    resetProducts,
  };
};
