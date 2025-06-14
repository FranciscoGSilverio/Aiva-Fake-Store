import { FC } from "react";
import { Product } from "src/types/Product.type";
import { Trash, ShoppingCart } from "lucide-react";
import { useProductCard } from "./useProductCard";

export const ProductCard: FC<Product> = ({
  id,
  title,
  slug,
  price,
  description,
  category,
  images,
  creationAt,
  updatedAt,
}) => {
  const { toggleConfirmation } = useProductCard();
  return (
    <div
      className="group relative rounded-xl overflow-hidden w-[100%] h-[350px] bg-white cursor-pointer shadow-md"
      onClick={() => window.open(`/product/${id}`, "_blank")}
    >
      <div className="h-full transition-all duration-500 group-hover:h-[60%]">
        <img
          src={images[0]}
          alt={`${title}-image`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="h-1/2 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm mt-1">${price}</p>
      </div>

      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Added ${title} to cart`);
          }}
          className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
        >
          <ShoppingCart className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleConfirmation();
          }}
          className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
        >
          <Trash className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  );
};
