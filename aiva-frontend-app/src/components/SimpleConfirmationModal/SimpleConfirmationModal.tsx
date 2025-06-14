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
import { DefaultButton } from "../DefaultButton/DefaultButton";

type SimpleConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
};

export const SimpleConfirmationModal: FC<SimpleConfirmationModalProps> = ({
  open,
  onOpenChange,
  title = "Confirmação de Exclusão",
  description = "Tem certeza que deseja excluir este item? Esta ação não poderá ser desfeita.",
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  onConfirm,
  loading = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <DefaultButton variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </DefaultButton>
          <DefaultButton
            variant="destructive"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </DefaultButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
