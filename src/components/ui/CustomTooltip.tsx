import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  content: string;
  className?: string;
  children: React.ReactNode;
}

const CustomTooltip = ({ content, className, children }: TooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className={className}>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
