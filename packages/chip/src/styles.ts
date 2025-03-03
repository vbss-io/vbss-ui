import { cva } from "class-variance-authority";

export const chipStyles = cva("leading-none inline-flex items-center", {
  variants: {
    variant: {
      primary: "border border-primary bg-primary text-white",
      secondary: "border border-secondary bg-secondary text-white",
      outline: "border border-primary text-primary",
    },
    size: {
      sm: "px-2.5 py-0.5",
      md: "px-3 py-1",
      lg: "px-4 py-2",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    fontWeight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    fontSize: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
    rounded: "md",
    fontSize: "xs",
    fontWeight: "normal",
  },
});
