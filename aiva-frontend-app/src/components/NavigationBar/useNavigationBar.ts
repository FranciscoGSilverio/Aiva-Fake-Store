"use client";

import { useDataContext } from "@/providers/DataContext";
import { getProductsByCategory } from "@/useCases/categories/getProductsByCategory";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export const useNavigationBar = () => {
  const { categories, setProducts } = useDataContext();

  const pathname = usePathname();
  const router = useRouter();
  const isProductPage = pathname.includes("/product/");

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

  return {
    isProductPage,
    backToHome,
    addProductDialogOpen,
    setAddProductDialogOpen,
    updateProductsByCategory,
    categoryOptions,
  };
};
