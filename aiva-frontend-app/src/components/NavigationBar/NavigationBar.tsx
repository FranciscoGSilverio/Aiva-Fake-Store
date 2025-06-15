"use client";

import { FC } from "react";
import { CirclePlus, LogOut, Trash2 } from "lucide-react";
import { useNavigationBar } from "./useNavigationBar";
import { CustomSelectComponent } from "../CustomSelectComponent/CustomSelectComponent";
import { Button } from "../ui/button";
import { NewProductDialog } from "../NewProductDialog/NewProductDialog";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";

export const NavigationBar: FC = () => {
  const {
    addProductDialogOpen,
    setAddProductDialogOpen,
    categoryOptions,
    updateProductsByCategory,
    logout,
    categoryId,
    resetProducts,
  } = useNavigationBar();
  return (
    <>
      <section className="min-h-[120px] my-5 max-w-[800px] w-full flex items-center px-10 shadow-custom rounded-full mx-auto">
        <div className="flex-1 flex items-center justify-center ">
          {categoryId && (
            <CustomTooltip delayDuration={0} content="Remover filtro">
              <Button
                className="cursor-pointer bg-off-white mx-1 border"
                variant="ghost"
                onClick={() => resetProducts()}
              >
                <Trash2
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
              </Button>
            </CustomTooltip>
          )}
          <CustomSelectComponent
            options={categoryOptions}
            className="w-full bg-off-white min-w-[50px]"
            onChange={updateProductsByCategory}
            value={categoryId}
            placeholder="Selecione uma categoria"
          />
        </div>
        <div className="flex gap-2 ml-4">
          <CustomTooltip delayDuration={0} content="Adicionar um produto">
            <Button
              className="cursor-pointer hover:bg-gray-100 rounded-full !px-1"
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
              className="cursor-pointer hover:bg-gray-100 rounded-full !px-1"
              variant="ghost"
              onClick={logout}
            >
              <LogOut
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
