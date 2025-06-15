"use client";

import Image from "next/image";
import { useProductContainer } from "./useProductContainer";
import { ProductsGrid } from "src/components/ProductsGrid/ProductsGrid";
import { ArrowLeft, Pencil, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewProductDialog } from "@/components/NewProductDialog/NewProductDialog";

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
        className="cursor-pointer hover:bg-gray-100 rounded-full p-2 inset-shadow-sm inset-shadow-gray-400/100 mr-5 absolute top-0 left-5"
      >
        <ArrowLeft />
      </button>

      <section className="flex lg:flex-row flex-col items-center justify-around p-6 gap-5 lg:max-w-[60vw] shadow-custom mx-auto my-10 rounded-lg relative">
        <Button
          variant="ghost"
          className="border border-black/10 rounded-full cursor-pointer h-12 absolute top-4 right-4 z-10 hover:border-black/20 transition duration-500"
          onClick={() => setIsUpdateProductDialogOpen(true)}
        >
          <Pencil
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </Button>
        <div className="max-w-[500px]">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={350}
            className="rounded-xl shadow-sm"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <span className="rounded-full text-sm border bg-cyan-100 py-1 px-4 border-cyan-300 text-gray-600 font-semibold">
              {product.category.name}
            </span>
          </div>

          <p className="text-lg text-gray-700">${product.price}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <div className="flex gap-4">
            <Button
              className="mt-4 flex items-center gap-2 rounded-full cursor-not-allowed hover:border-red-500 hover:scale-105 transition duration-500"
              disabled
            >
              <ShoppingCart
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </section>

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
