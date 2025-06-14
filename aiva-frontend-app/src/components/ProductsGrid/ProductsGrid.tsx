import { Product } from "src/types/Product.type";
import { ProductCard } from "../ProductCard/ProductCard";
import { FC } from "react";

type ProductsGridProps = { products: Product[]; title: string };

export const ProductsGrid: FC<ProductsGridProps> = ({ products, title }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500">No products available</div>
    );
  }

  return (
    <div className="flex flex-col w-full shadow-xl p-8 rounded-lg">
      <p className="text-xl font-bold mb-5">{title}</p>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 w-full h-full pb-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
