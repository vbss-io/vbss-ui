import { cn } from "@/lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const tooltipStyles = cva(
  "z-50 overflow-hidden bg-primary animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        primary: "border bg-primary text-white",
        secondary: "border bg-secondary text-white",
        outline: "bg-background border border-primary text-primary",
      },
      size: {
        sm: "px-2.5 pb-0.5 text-xs",
        md: "px-3 pb-0.5 pt-0.5 text-sm",
        lg: "px-4 pb-1.5 pt-1 text-md",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      font: {
        regular: "font-normal",
        bold: "font-semibold",
        extrabold: "font-extrabold",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      font: "regular",
    },
  }
);

type TooltipProps = ComponentProps<"div"> &
  VariantProps<typeof tooltipStyles> & {
    trigger: React.ReactNode;
    sideOffset?: number;
    side?: "top" | "right" | "bottom" | "left";
  };

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    { trigger, variant, size, rounded, font, side, className, ...props },
    ref
  ) => (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side}
          ref={ref}
          sideOffset={4}
          className={cn(
            tooltipStyles({ variant, size, rounded, font, className })
          )}
          {...props}
        >
          {props.children}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
);
Tooltip.displayName = TooltipPrimitive.Content.displayName;
