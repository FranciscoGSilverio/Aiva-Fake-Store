import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "src/types/Product.type";
import { getProductById } from "src/useCases/products/getProductById";
import { getRelatedProducts } from "src/useCases/products/getRelatedProducts";

export const useProductContainer = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
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

    if (params.id) {
      fetchProduct();
    }
  }, [params]);

  return {
    product,
    relatedProducts,
  };
};
