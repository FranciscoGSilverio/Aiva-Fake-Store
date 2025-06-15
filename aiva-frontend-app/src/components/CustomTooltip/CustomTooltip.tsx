import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface CustomTooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}

export const CustomTooltip = ({
  content,
  children,
  side = "top",
  delayDuration = 200,
}: CustomTooltipProps) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className="text-sm">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
