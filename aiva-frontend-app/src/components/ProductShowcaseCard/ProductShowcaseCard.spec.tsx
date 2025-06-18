import { render, screen, fireEvent } from "@testing-library/react";
import { ProductShowcaseCard } from "@/components/ProductShowcaseCard";
import { Product } from "@/types/Product.type";

const PRODUCT_1: Product = {
  id: 1,
  title: "Product A",
  slug: "product-a",
  price: 100,
  description: "Description for Product A",
  category: {
    id: 1,
    name: "Category A",
    slug: "category-a",
    image: "/aiva_logo.png",
    creationAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  images: ["/aiva_logo.png"],
  creationAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-02T00:00:00Z",
};

describe("ProductShowcaseCard", () => {
  it("renders product details correctly", () => {
    const mockSetDialogOpen = jest.fn();

    render(
      <ProductShowcaseCard
        product={PRODUCT_1}
        setIsUpdateProductDialogOpen={mockSetDialogOpen}
      />
    );

    // Title
    expect(screen.getByText(PRODUCT_1.title)).toBeInTheDocument();

    // Category name
    expect(screen.getByText(PRODUCT_1.category.name)).toBeInTheDocument();

    // Price
    expect(screen.getByText("$" + PRODUCT_1.price)).toBeInTheDocument();

    // Description
    const descriptionRegex = new RegExp(PRODUCT_1.description, "i");
    expect(screen.getByText(descriptionRegex)).toBeInTheDocument();

    // Image
    const img = screen.getByAltText(PRODUCT_1.title);
    expect(img).toHaveAttribute("src");

    // Cart button (disabled)
    const cartButton = screen.getByRole("button", {
      name: /Adicionar ao carrinho/i,
    });
    expect(cartButton).toBeDisabled();
  });

  it("calls setIsUpdateProductDialogOpen when edit button is clicked", () => {
    const mockSetDialogOpen = jest.fn();

    render(
      <ProductShowcaseCard
        product={PRODUCT_1}
        setIsUpdateProductDialogOpen={mockSetDialogOpen}
      />
    );

    const editButton = screen.getByTestId("edit-product-button");
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(mockSetDialogOpen).toHaveBeenCalledWith(true);
  });
});
