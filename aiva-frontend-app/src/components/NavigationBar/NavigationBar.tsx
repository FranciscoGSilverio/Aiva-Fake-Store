"use client";

import { FC } from "react";
import { User, ShoppingCart, CirclePlus, ArrowLeft } from "lucide-react";
import { useNavigationBar } from "./useNavigationBar";
import { Input } from "../ui/input";
import { CustomSelectComponent } from "../CustomSelectComponent/CustomSelectComponent";
import { Button } from "../ui/button";
import { NewProductDialog } from "../NewProductDialog/NewProductDialog";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";

export const NavigationBar: FC = () => {
  const {
    isProductPage,
    backToHome,
    addProductDialogOpen,
    setAddProductDialogOpen,
    categoryOptions,
    updateProductsByCategory,
    logout,
  } = useNavigationBar();
  return (
    <>
      <section className="min-h-[120px] my-5 max-w-[800px] w-full flex items-center px-10 shadow-custom rounded-full mx-auto">
        <div className="flex-1 flex gap-5 items-center justify-center">
          <CustomSelectComponent
            options={categoryOptions}
            className="w-full bg-off-white"
            onChange={updateProductsByCategory}
          />
        </div>
        <div className="flex gap-1 ml-4">
          <CustomTooltip delayDuration={0} content="Adicionar um produto">
            <Button
              className="cursor-pointer hover:bg-gray-100 rounded-full p-2"
              onClick={() => setAddProductDialogOpen(true)}
              variant="ghost"
            >
              <CirclePlus
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
            </Button>
          </CustomTooltip>
          <CustomTooltip delayDuration={0} content="Logout">
            <Button
              className="cursor-pointer hover:bg-gray-100 rounded-full p-2"
              variant="ghost"
              onClick={logout}
            >
              <User
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
            </Button>
          </CustomTooltip>
        </div>
      </section>

      <NewProductDialog
        addProductDialogOpen={addProductDialogOpen}
        setAddProductDialogOpen={setAddProductDialogOpen}
      />
    </>
  );
};
