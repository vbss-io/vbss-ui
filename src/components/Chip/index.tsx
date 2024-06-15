import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const chipStyles = cva("inline-flex items-center transition-colors", {
  variants: {
    variant: {
      primary: "border bg-primary text-white",
      secondary: "border bg-secondary text-white",
      outline: "border border-primary text-primary",
    },
    size: {
      sm: "px-2.5 pb-0.5 text-xs",
      md: "px-3 pb-1 pt-0.5 text-sm",
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
    variant: "outline",
    size: "sm",
    rounded: "md",
    font: "regular",
  },
});

type ChipProps = ComponentProps<"div"> & VariantProps<typeof chipStyles>;

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ variant, size, rounded, font, className, ...props }) => {
    return (
      <div
        className={cn(chipStyles({ variant, size, rounded, font, className }))}
        {...props}
      />
    );
  }
);
