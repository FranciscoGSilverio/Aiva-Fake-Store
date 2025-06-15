import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "src/types/Product.type";
import { getProductById } from "src/useCases/products/getProductById";
import { getRelatedProducts } from "src/useCases/products/getRelatedProducts";

export const useProductContainer = () => {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isUpdateProductDialogOpen, setIsUpdateProductDialogOpen] =
    useState(false);

  const fetchProduct = async () => {
    try {
      const [_product, _relatedProduct] = await Promise.allSettled([
        getProductById(params.id as string),
        getRelatedProducts(params.id as string),
      ]);

      if (_product.status === "fulfilled") {
        setProduct(_product.value);
      }
      if (_relatedProduct.status === "fulfilled") {
        setRelatedProducts(_relatedProduct.value);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params]);

  const backToHome = () => {
    router.push("/");
  };

  return {
    product,
    relatedProducts,
    isUpdateProductDialogOpen,
    setIsUpdateProductDialogOpen,
    fetchProduct,
    backToHome,
  };
};
