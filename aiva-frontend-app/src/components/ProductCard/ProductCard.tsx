import { FC } from "react";
import { Product } from "src/types/Product.type";
import { Trash, ShoppingCart } from "lucide-react";
import { useProductCard } from "./useProductCard";
import { toast } from "sonner";
import { SimpleConfirmationModal } from "../SimpleConfirmationModal/SimpleConfirmationModal";
import { Button } from "../ui/button";
import clsx from "clsx";

export const ProductCard: FC<Product> = ({ id, title, price, images }) => {
  const {
    isConfirmationOpen,
    setIsConfirmationOpen,
    handleDeleteProduct,
    isDeleteLoading,
    handleCardClick,
    isMobile,
    isExpanded,
  } = useProductCard();
  return (
    <>
      <div
        className="group relative rounded-xl overflow-hidden w-[100%] max-w-[500px] h-[350px] bg-white cursor-pointer shadow-md"
        onClick={() => handleCardClick(id)}
      >
        <div
          className={clsx(
            "transition-all duration-500",
            isMobile
              ? isExpanded
                ? "h-[60%]"
                : "h-full"
              : "h-full group-hover:h-[60%]"
          )}
        >
          <img
            src={images[0]}
            alt={`${title}-image`}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className={clsx(
            "h-1/2 p-4 transition-opacity duration-500",
            isMobile
              ? isExpanded
                ? "opacity-100"
                : "opacity-0"
              : "opacity-0 group-hover:opacity-100"
          )}
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm mt-1">${price}</p>
        </div>

        <div
          className={clsx(
            "absolute top-2 right-2 flex gap-2 transition-opacity duration-300 z-10",
            isMobile
              ? isExpanded
                ? "opacity-100"
                : "opacity-0"
              : "opacity-0 group-hover:opacity-100"
          )}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toast.success("Product added to cart!");
            }}
            className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsConfirmationOpen(true);
            }}
            className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100 cursor-pointer"
          >
            <Trash className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>

      <SimpleConfirmationModal
        open={isConfirmationOpen}
        onOpenChange={(state) => setIsConfirmationOpen(state)}
        onConfirm={() => handleDeleteProduct(id)}
        loading={isDeleteLoading}
      />
    </>
  );
};
