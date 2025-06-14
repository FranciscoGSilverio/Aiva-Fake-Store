import { useDataContext } from "@/providers/DataContext";

export const useSimpleConfirmationModal = () => {
  const { isConfirmationOpen, toggleConfirmation } = useDataContext();

  return {
    isConfirmationOpen,
    toggleConfirmation,
  };
};
