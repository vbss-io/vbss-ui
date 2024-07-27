import { cva } from "class-variance-authority";

export const historyNavStyles = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors",
  {
    variants: {
      gap: {
        sm: "gap-1",
        md: "gap-2",
        lg: "gap-3",
      },
    },
    defaultVariants: {
      gap: "md",
    },
  }
);
