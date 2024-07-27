import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  "outline-none inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        primary:
          "border-2 border-primary bg-primary text-white hover:bg-secondary hover:border-secondary",
        secondary:
          "border-2 border-secondary bg-secondary text-white hover:bg-primary hover:border-primary",
        outline:
          "border-2 border-primary text-primary bg-background hover:bg-primary/10",
        "outline-solid":
          "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-white",
        ghost: "border-background hover:bg-primary/10 hover:border-primary/10",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        "icon-sm": "h-8 w-8",
        "icon-md": "h-9 w-9",
        "icon-lg": "h-10 w-10",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      font: {
        regular: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
      },
      fontSize: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-md",
      },
      inverted: {
        true: "flex-row-reverse",
      },
      disabled: {
        true: "disabled:pointer-events-none disabled:opacity-50",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      font: "medium",
      fontSize: "md",
      inverted: false,
      disabled: false,
    },
  }
);
