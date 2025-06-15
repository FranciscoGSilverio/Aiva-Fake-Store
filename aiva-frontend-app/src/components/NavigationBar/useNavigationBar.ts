"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDataContext } from "@/providers/DataContext";
import { getProductsByCategory } from "@/useCases/categories/getProductsByCategory";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export const useNavigationBar = () => {
  const { categories, setProducts } = useDataContext();

  const [, setIsLoggedIn] = useLocalStorage<boolean>("isLoggedIn", false);

  const router = useRouter();

  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);

  const updateProductsByCategory = async (categoryId: string) => {
    const newProducts = await getProductsByCategory(Number(categoryId));
    setProducts(newProducts);
  };

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      value: String(category.id),
      label: category.name,
    }));
  }, [categories]);

  const backToHome = () => {
    router.push("/");
  };

  const logout = () => {
    setIsLoggedIn(false);
    router.push("/login");
  };

  return {
    backToHome,
    addProductDialogOpen,
    setAddProductDialogOpen,
    updateProductsByCategory,
    categoryOptions,
    logout,
  };
};
