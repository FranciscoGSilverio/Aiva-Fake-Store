"use client";

import { useProductContainer } from "./useProductContainer";
import { ProductsGrid } from "src/components/ProductsGrid/ProductsGrid";
import { ArrowLeft } from "lucide-react";
import { NewProductDialog } from "@/components/NewProductDialog/NewProductDialog";
import { ProductShowcaseCard } from "@/components/ProductShowcaseCard/ProductShowcaseCard";

export const ProductContainer = () => {
  const {
    product,
    relatedProducts,
    isUpdateProductDialogOpen,
    setIsUpdateProductDialogOpen,
    fetchProduct,
    backToHome,
  } = useProductContainer();

  if (!product) {
    return <div className="text-center text-gray-500">Loading product...</div>;
  }
  return (
    <div className="relative">
      <button
        onClick={() => backToHome()}
        className="cursor-pointer bg-gray-100 rounded-full p-2 inset-shadow-sm inset-shadow-gray-400/100 absolute top-2 sm:top-0 left-5 z-10"
      >
        <ArrowLeft />
      </button>

      <ProductShowcaseCard
        product={product}
        setIsUpdateProductDialogOpen={setIsUpdateProductDialogOpen}
      />

      <ProductsGrid products={relatedProducts} title="Produtos relacionados" />
      <NewProductDialog
        addProductDialogOpen={isUpdateProductDialogOpen}
        setAddProductDialogOpen={setIsUpdateProductDialogOpen}
        initialValues={{
          title: product.title,
          price: product.price,
          description: product.description,
          categoryId: String(product.category.id),
          images: product.images,
        }}
        handleRefresh={fetchProduct}
      />
    </div>
  );
};
