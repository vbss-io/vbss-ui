import { cva } from "class-variance-authority";
import { InputNumberVariantProps } from "./types";

const defaultInputNumber =
  "flex w-full border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

export const inputNumberStyles = cva("", {
  variants: {
    variant: {
      primary: `${defaultInputNumber} focus-visible:ring-primary`,
      secondary: `${defaultInputNumber} focus-visible:ring-secondary`,
      outline: `${defaultInputNumber} border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0`,
      ghost: `${defaultInputNumber} focus-visible:ring-0`,
    },
    height: {
      sm: "h-8",
      md: "h-9",
      lg: "h-10",
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
    disabled: {
      true: "cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
    },
  },
  defaultVariants: {
    variant: "primary",
    height: "md",
    rounded: "md",
    font: "medium",
    fontSize: "md",
    disabled: false,
  },
});

export const inputNumberLabelStyles = ({
  font,
  fontSize,
}: Partial<InputNumberVariantProps>) =>
  inputNumberStyles({
    variant: null,
    height: null,
    rounded: null,
    font,
    fontSize,
  });
