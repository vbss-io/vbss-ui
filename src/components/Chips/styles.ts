import { cva } from "class-variance-authority";

export const chipsStyles = cva("leading-none inline-flex items-center", {
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
});
