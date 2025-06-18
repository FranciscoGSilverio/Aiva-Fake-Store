import { screen, render, fireEvent } from "@testing-library/react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { toast } from "sonner";

// Mock toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockUseProductCard = jest.fn();

// Mock hook behavior
const mockSetIsConfirmationOpen = jest.fn();
const mockHandleDeleteProduct = jest.fn();
const mockHandleCardClick = jest.fn();

jest.mock("@/components/ProductCard/useProductCard", () => ({
  useProductCard: () => mockUseProductCard(),
}));

// Mock modal
jest.mock(
  "@/components/SimpleConfirmationModal/SimpleConfirmationModal",
  () => ({
    SimpleConfirmationModal: ({ open, onConfirm }: any) =>
      open ? <button onClick={onConfirm}>Confirm Delete</button> : null,
  })
);

const MOCK_PRODUCT = {
  id: 1,
  title: "Test Product",
  price: 199.99,
  images: ["https://via.placeholder.com/300"],
  slug: "test-product",
  description: "Sample description",
  category: {
    id: 1,
    name: "Category A",
    slug: "cat-a",
    image: "",
    creationAt: "",
    updatedAt: "",
  },
  creationAt: "",
  updatedAt: "",
};

describe("ProductCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProductCard.mockReturnValue({
      isConfirmationOpen: true,
      setIsConfirmationOpen: mockSetIsConfirmationOpen,
      handleDeleteProduct: mockHandleDeleteProduct,
      isDeleteLoading: false,
      handleCardClick: mockHandleCardClick,
      isMobile: false,
      isExpanded: false,
    });
  });

  it("renders product image, title, and price", () => {
    render(<ProductCard {...MOCK_PRODUCT} />);
    expect(screen.getByAltText("Test Product-image")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$199.99")).toBeInTheDocument();
  });

  it("calls handleCardClick when card is clicked", () => {
    render(<ProductCard {...MOCK_PRODUCT} />);
    fireEvent.click(screen.getByRole("img"));
    expect(mockHandleCardClick).toHaveBeenCalledWith(MOCK_PRODUCT.id);
  });

  it("calls toast.success when shopping cart button is clicked", () => {
    render(<ProductCard {...MOCK_PRODUCT} />);
    const cartButton = screen.getAllByRole("button")[0];
    fireEvent.click(cartButton);
    expect(toast.success).toHaveBeenCalledWith("Product added to cart!");
  });

  it("opens confirmation modal when trash button is clicked", () => {
    render(<ProductCard {...MOCK_PRODUCT} />);
    const deleteButton = screen.getAllByRole("button")[1];
    fireEvent.click(deleteButton);
    expect(mockSetIsConfirmationOpen).toHaveBeenCalledWith(true);
  });

  it("calls handleDeleteProduct when modal confirm is clicked", () => {
    render(<ProductCard {...MOCK_PRODUCT} />);
    const confirmBtn = screen.getByText("Confirm Delete");
    fireEvent.click(confirmBtn);
    expect(mockHandleDeleteProduct).toHaveBeenCalledWith(MOCK_PRODUCT.id);
  });
});
