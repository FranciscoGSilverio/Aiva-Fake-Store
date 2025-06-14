"use client";

import { Category } from "@/types/Category.type";
import { Product } from "@/types/Product.type";
import { createContext, useContext, useState, ReactNode } from "react";

type DataContextType = {
  isConfirmationOpen: boolean;
  toggleConfirmation: () => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const toggleConfirmation = () => {
    setIsConfirmationOpen((prev) => !prev);
  };

  return (
    <DataContext.Provider
      value={{
        isConfirmationOpen,
        toggleConfirmation,
        setCategories,
        categories,
        setProducts,
        products,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};
