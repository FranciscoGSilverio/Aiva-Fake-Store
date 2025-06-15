import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentProps, FC, ReactNode } from "react";

interface DefaultButtonProps extends ComponentProps<typeof Button> {
  children: ReactNode;
  onClick?: () => Promise<void> | void;
  loading?: boolean;
}

export const DefaultButton: FC<DefaultButtonProps> = ({
  children,
  onClick,
  className,
  variant = "default",
  loading = false,
  ...props
}) => {
  return (
    <Button
      type="button"
      variant={variant}
      onClick={onClick}
      className={cn(className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};
