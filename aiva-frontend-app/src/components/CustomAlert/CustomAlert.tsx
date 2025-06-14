"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { FC } from "react";

type AlertVariant = "success" | "error";

type AlertMessageProps = {
  variant: AlertVariant;
  message: string;
};

export const AlertMessage: FC<AlertMessageProps> = ({ variant, message }) => {
  const isSuccess = variant === "success";

  return (
    <Alert
      className={`flex items-start gap-4 ${
        isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {isSuccess ? (
        <CheckCircle className="h-5 w-5 mt-1 text-green-600" />
      ) : (
        <XCircle className="h-5 w-5 mt-1 text-red-600" />
      )}
      <div>
        <AlertTitle className="text-base font-semibold">
          {isSuccess ? "Success" : "Error"}
        </AlertTitle>
        <AlertDescription className="text-sm">{message}</AlertDescription>
      </div>
    </Alert>
  );
};
