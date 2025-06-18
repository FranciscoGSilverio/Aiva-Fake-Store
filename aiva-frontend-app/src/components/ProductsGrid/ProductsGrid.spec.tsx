import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProductsGrid } from "./ProductsGrid";
import { Product } from "@/types/Product.type";

import { DataContextProvider } from "@/providers/DataContext";

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

const PRODUCT_2: Product = {
  id: 2,
  title: "Product B",
  slug: "product-b",
  price: 200,
  description: "Description for Product B",
  category: {
    id: 2,
    name: "Category B",
    slug: "category-b",
    image: "/aiva_logo.png",
    creationAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-04T00:00:00Z",
  },
  images: ["/aiva_logo.png"],
  creationAt: "2023-01-03T00:00:00Z",
  updatedAt: "2023-01-04T00:00:00Z",
};

describe("ProductsGrid", () => {
  it("renders 'No products available' when product list is empty", () => {
    render(<ProductsGrid products={[]} title="Test Title" />);
    expect(screen.getByText(/no products available/i)).toBeInTheDocument();
  });

  it("renders the title", () => {
    const mockProducts: Product[] = [PRODUCT_1, PRODUCT_2];
    render(
      <DataContextProvider>
        <ProductsGrid products={mockProducts} title="Featured Products" />
      </DataContextProvider>
    );
    expect(screen.getByText("Featured Products")).toBeInTheDocument();
  });

  it("renders the correct number of ProductCard components", () => {
    const mockProducts: Product[] = [PRODUCT_1, PRODUCT_2];

    render(
      <DataContextProvider>
        <ProductsGrid products={mockProducts} title="Test Title" />
      </DataContextProvider>
    );

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });
});
