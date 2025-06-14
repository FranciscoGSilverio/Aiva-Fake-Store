"use client";

import { FC } from "react";
import { useHomeContainer } from "./useHomeContainer";
import { ProductsGrid } from "src/components/ProductsGrid/ProductsGrid";

export const HomeContainer: FC = () => {
  const { products } = useHomeContainer();

  return <ProductsGrid products={products} title="Produtos em destaque"/>;
};
