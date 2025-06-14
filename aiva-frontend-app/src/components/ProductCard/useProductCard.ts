import { useDataContext } from "@/providers/DataContext";

export const useProductCard = () => {
  const { toggleConfirmation } = useDataContext();

  return {
    toggleConfirmation,
  };
};
