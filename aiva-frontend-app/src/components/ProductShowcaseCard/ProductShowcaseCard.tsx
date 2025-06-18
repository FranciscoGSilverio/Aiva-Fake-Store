import { FC } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Pencil, ShoppingCart } from "lucide-react";
import { Product } from "@/types/Product.type";

type ProductShowcaseCardProps = {
  product: Product;
  setIsUpdateProductDialogOpen: (open: boolean) => void;
};

export const ProductShowcaseCard: FC<ProductShowcaseCardProps> = ({
  product,
  setIsUpdateProductDialogOpen,
}) => {
  return (
    <section className="flex lg:flex-row flex-col items-center justify-around p-6 gap-5 lg:max-w-[60vw] shadow-custom mx-2 my-5 sm:mx-auto sm:my-10 rounded-lg relative">
      <Button
        variant="ghost"
        className="border border-black/10 rounded-full cursor-pointer h-12 absolute sm:top-4 sm:right-4 right-6 z-10 bg-gray-100 transition duration-500"
        onClick={() => setIsUpdateProductDialogOpen(true)}
        data-testid="edit-product-button"
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
        <p className="mt-4 text-gray-600 line-clamp-4">{product.description}</p>
        <div className="flex gap-4">
          <Button
            className="mt-4 flex items-center gap-2 rounded-full cursor-not-allowed hover:border-red-500 hover:scale-105 transition duration-500"
            disabled
            data-testid="add-to-cart-button"
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
  );
};
