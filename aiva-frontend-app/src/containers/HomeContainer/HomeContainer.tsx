"use client";

import { FC } from "react";
import { useHomeContainer } from "./useHomeContainer";
import { ProductsGrid } from "src/components/ProductsGrid/ProductsGrid";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";

export const HomeContainer: FC = () => {
  const { products } = useHomeContainer();

  return (
    <section className="max-w-[1800px] w-[90vw] mx-auto bg-gradient-to-br">
      <NavigationBar />
      <ProductsGrid products={products} title="Produtos em destaque" />;
    </section>
  );
};
