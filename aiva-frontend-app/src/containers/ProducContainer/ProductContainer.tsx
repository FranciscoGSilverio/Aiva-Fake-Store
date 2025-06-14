"use client";

import Image from "next/image";
import { useProductContainer } from "./useProductContainer";
import { ProductsGrid } from "src/components/ProductsGrid/ProductsGrid";
import { ShoppingCart } from "lucide-react";

export const ProductContainer = () => {
  const { product, relatedProducts } = useProductContainer();

  if (!product) {
    return <div className="text-center text-gray-500">Loading product...</div>;
  }
  return (
    <>
      <section className="flex lg:flex-row flex-col items-center justify-center p-6 gap-5 max-w-[80vw] shadow-xl mx-auto mb-5 rounded-lg">
        <Image
          src={product.images[0]}
          alt={product.title}
          width={500}
          height={350}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-lg text-gray-700">${product.price}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <button className="flex items-center gap-3 mt-6 px-4 py-2 bg-gray-500 text-gray-800 rounded-full hover:bg-gray-400 hover:scale-110 transition duration-300 text-lg font-semibold cursor-pointer">
            <ShoppingCart />
            Add to Cart
          </button>
        </div>
      </section>

      <ProductsGrid products={relatedProducts} title="Produtos relacionados" />
    </>
  );
};
