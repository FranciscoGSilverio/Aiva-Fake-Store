import { screen, fireEvent } from "@testing-library/react";
import { NewProductDialog } from "@/components/NewProductDialog/NewProductDialog";
import { renderWithProviders } from "@/lib/test-utils";
import { act } from "react";

const mockUseNewProductDialog = jest.fn();

// Mock hook
jest.mock("@/components/NewProductDialog/useNewProductDialog", () => ({
  useNewProductDialog: () => mockUseNewProductDialog(),
}));

describe("NewProductDialog", () => {
  const mockSetOpen = jest.fn();

  beforeEach(() => {
    mockSetOpen.mockClear();
  });

  it("renders form inputs when open", () => {
    mockUseNewProductDialog.mockReturnValue({
      handleAddNewProduct: jest.fn(),
      categoryOptions: [],
      isCreateLoading: false,
      formikInitialValues: {
        title: "Edit Me",
        price: 123,
        description: "Edit this",
        categoryId: "1",
        images: ["https://via.placeholder.com/150"],
      },
      isEdditingProduct: true,
    });
    renderWithProviders(
      <NewProductDialog
        addProductDialogOpen={true}
        setAddProductDialogOpen={mockSetOpen}
      />
    );

    expect(screen.getByLabelText("Título")).toBeInTheDocument();
    expect(screen.getByLabelText("Preço")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toBeInTheDocument();
    expect(screen.getByLabelText("Image URL #1")).toBeInTheDocument();
  });

  it("can add and remove image fields", async () => {
    await act(async () =>
      renderWithProviders(
        <NewProductDialog
          addProductDialogOpen={true}
          setAddProductDialogOpen={mockSetOpen}
        />
      )
    );

    const addButton = screen.getByRole("button", { name: /Adicionar Imagem/i });
    fireEvent.click(addButton);
    expect(screen.getAllByLabelText(/Image URL/i).length).toBe(2);

    const removeButtons = screen.getAllByRole("button", { name: "" });
    fireEvent.click(removeButtons[0]);
    expect(screen.getAllByLabelText(/Image URL/i).length).toBe(1);
  });

  it("calls setAddProductDialogOpen when dialog closes", () => {
    renderWithProviders(
      <NewProductDialog
        addProductDialogOpen={true}
        setAddProductDialogOpen={mockSetOpen}
      />
    );

    fireEvent.click(screen.getByText("Fechar"));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("renders 'Atualizar' title when editing", async () => {
    mockUseNewProductDialog.mockReturnValue({
      handleAddNewProduct: jest.fn(),
      categoryOptions: [],
      isCreateLoading: false,
      formikInitialValues: {
        title: "Edit Me",
        price: 123,
        description: "Edit this",
        categoryId: "1",
        images: ["https://via.placeholder.com/150"],
      },
      isEdditingProduct: true,
    });

    await act(async () =>
      renderWithProviders(
        <NewProductDialog
          addProductDialogOpen={true}
          setAddProductDialogOpen={mockSetOpen}
          initialValues={{
            title: "Edit Me",
            price: 123,
            description: "Edit this",
            categoryId: "1",
            images: ["https://via.placeholder.com/150"],
          }}
        />
      )
    );

    expect(screen.getByText("Atualizar item")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Edit Me")).toBeInTheDocument();
  });
});
