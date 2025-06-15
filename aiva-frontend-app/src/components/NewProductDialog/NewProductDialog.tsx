import { FC } from "react";
import { CustomDialog } from "../Dialog/Dialog";
import { Field, FieldArray, Form, Formik } from "formik";
import { Input } from "../ui/input";
import { CustomSelectComponent } from "../CustomSelectComponent/CustomSelectComponent";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { useNewProductDialog } from "./useNewProductDialog";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { NewProductDto } from "@/types/Product.type";

type NewProductDialogProps = {
  addProductDialogOpen: boolean;
  setAddProductDialogOpen: (open: boolean) => void;
  initialValues?: NewProductDto;
  handleRefresh?: () => void;
};

export const NewProductDialog: FC<NewProductDialogProps> = ({
  addProductDialogOpen,
  setAddProductDialogOpen,
  initialValues,
  handleRefresh = () => {},
}) => {
  const {
    handleAddNewProduct,
    categoryOptions,
    isCreateLoading,
    formikInitialValues,
    isEdditingProduct,
  } = useNewProductDialog({
    setAddProductDialogOpen,
    initialValues,
    handleRefresh,
  });

  return (
    <CustomDialog
      title={isEdditingProduct ? "Atualizar item" : "Adicionar Item"}
      description={
        isEdditingProduct
          ? `Atualizar ${initialValues?.title}`
          : "Forneça os detalhes do produto"
      }
      open={addProductDialogOpen}
      onOpenChange={(open: boolean) => {
        setAddProductDialogOpen(open);
      }}
    >
      <Formik
        initialValues={formikInitialValues}
        onSubmit={handleAddNewProduct}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col gap-4">
            <Field
              as={Input}
              name="title"
              placeholder="Título"
              aria-label="Título"
              required
            />
            <Field
              as={Input}
              name="price"
              placeholder="Preço"
              aria-label="Preço"
              type="number"
              required
            />
            <Field
              as={Input}
              name="description"
              placeholder="Descrição"
              aria-label="Descrição"
              required
            />

            <Field
              as={CustomSelectComponent}
              options={categoryOptions}
              className="w-full"
              name="category"
              required
              onChange={(value: string) => {
                setFieldValue("categoryId", value);
              }}
              value={values.categoryId}
            />

            <FieldArray name="images">
              {({ push, remove, form }) => (
                <div className="flex flex-col gap-2">
                  {form.values.images.map((_: string, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Field
                        as={Input}
                        name={`images[${index}]`}
                        placeholder={`Image URL #${index + 1}`}
                        aria-label={`Image URL #${index + 1}`}
                        required
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => remove(index)}
                        disabled={form.values.images.length === 1}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-fit mt-2"
                    onClick={() => push("")}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Adicionar Imagem
                  </Button>
                </div>
              )}
            </FieldArray>
            <div className="flex justify-end gap-2 mt-4">
              <DefaultButton
                onClick={() => setAddProductDialogOpen(false)}
                variant="outline"
              >
                Fechar
              </DefaultButton>
              <DefaultButton type="submit" loading={isCreateLoading}>
                {isEdditingProduct ? "Atualizar" : "Adicionar"}
              </DefaultButton>
            </div>
          </Form>
        )}
      </Formik>
    </CustomDialog>
  );
};
