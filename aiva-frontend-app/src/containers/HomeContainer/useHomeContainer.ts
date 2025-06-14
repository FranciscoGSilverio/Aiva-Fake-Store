import { useDataContext } from "@/providers/DataContext";
import { getCategories } from "@/useCases/categories/getCategories";
import { useEffect, useState } from "react";
import { Product } from "src/types/Product.type";
import { getProducts } from "src/useCases/products/getProducts";

export const useHomeContainer = () => {
  const { setCategories, products, setProducts } = useDataContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [_categories, _products] = await Promise.allSettled([
          getCategories(),
          getProducts(),
        ]);

        if (_categories.status === "fulfilled") {
          setCategories(_categories.value);
        }
        if (_products.status === "fulfilled") {
          setProducts(_products.value);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
  };
};
