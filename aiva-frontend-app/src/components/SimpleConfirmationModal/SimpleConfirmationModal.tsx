"use client";

import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSimpleConfirmationModal } from "./useSimpleConfirmationModal";

type SimpleConfirmationModalProps = {
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
};

export const SimpleConfirmationModal: FC<
  Partial<SimpleConfirmationModalProps>
> = ({
  onOpenChange,
  title = "Confirmação de Exclusão",
  description = "Tem certeza que deseja excluir este item? Esta ação não poderá ser desfeita.",
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  onConfirm,
}) => {
  const { isConfirmationOpen, toggleConfirmation } =
    useSimpleConfirmationModal()

  console.log("isConfirmationOpen", isConfirmationOpen);
  return (
    <Dialog open={isConfirmationOpen} onOpenChange={toggleConfirmation}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            {cancelLabel}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
