"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

type CustomButtonProps = {
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
} & React.ComponentProps<typeof Button>;

export default function CustomButton({
  loading,
  loadingText = "Please wait...",
  icon,
  iconPosition = "left",
  children,
  disabled,
  className,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      {...props}
      className={cn("relative", className)}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}

      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}

      {loading ? loadingText : children}

      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </Button>
  );
}
