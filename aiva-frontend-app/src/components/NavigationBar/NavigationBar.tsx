"use client";

import { FC } from "react";
import { User, ShoppingBag, CirclePlus, ArrowLeft } from "lucide-react";
import { useNavigationBar } from "./useNavigationBar";
import { CustomDialog } from "../Dialog/Dialog";
import { Input } from "../ui/input";
import { CustomSelectComponent } from "../CustomSelectComponent/CustomSelectComponent";

export const NavigationBar: FC = () => {
  const {
    isProductPage,
    backToHome,
    addProductDialogOpen,
    setAddProductDialogOpen,
    categoryOptions,
    updateProductsByCategory,
  } = useNavigationBar();
  return (
    <>
      <section className="min-h-[120px] my-5 max-w-[800px] w-full flex items-center px-10 shadow-md rounded-full mx-auto">
        {isProductPage && (
          <button
            onClick={() => backToHome()}
            className="cursor-pointer hover:bg-gray-100 rounded-full p-2 inset-shadow-sm inset-shadow-gray-400/100 mr-5"
          >
            <ArrowLeft />
          </button>
        )}
        <div className="flex-1 flex gap-5 items-center justify-center">
          <Input className="bg-off-white py-1 px-3" placeholder="Search..." />

          <CustomSelectComponent
            options={categoryOptions}
            className="w-full bg-off-white"
            onChange={updateProductsByCategory}
          />
        </div>
        <div className="flex gap-1 ml-4">
          <button className="cursor-pointer hover:bg-gray-100 rounded-full p-2">
            <ShoppingBag />
          </button>
          <button
            className="cursor-pointer hover:bg-gray-100 rounded-full p-2"
            onClick={() => setAddProductDialogOpen(true)}
          >
            <CirclePlus />
          </button>
          <button className="cursor-pointer hover:bg-gray-100 rounded-full p-2">
            <User />
          </button>
        </div>
      </section>

      <CustomDialog
        title="Adicionar Item"
        description="Forneça os detalhes do produto que queira adicionar"
        open={addProductDialogOpen}
        onOpenChange={(open: boolean) => {
          setAddProductDialogOpen(open);
        }}
      >
        <Input placeholder="Título" aria-label="Título" />
        <Input placeholder="Preço" aria-label="Título" type="number" />
        <Input placeholder="Descrição" aria-label="Título" />
        <CustomSelectComponent options={categoryOptions} />
      </CustomDialog>
    </>
  );
};
