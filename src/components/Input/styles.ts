import { cva } from "class-variance-authority";
import { InputVariantProps } from "./types";

const defaultInputStyles =
  "flex border px-3 py-2 focus-visible:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

export const inputStyles = cva("", {
  variants: {
    variant: {
      primary: `${defaultInputStyles} focus-visible:border-primary`,
      secondary: `${defaultInputStyles} focus-visible:border-secondary`,
      outline: `${defaultInputStyles} border-primary focus-visible:border-secondary`,
      ghost: `${defaultInputStyles} focus-visible:ring-0`,
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

export const inputLabelStyles = ({
  font,
  fontSize,
}: Partial<InputVariantProps>) =>
  inputStyles({
    variant: null,
    height: null,
    rounded: null,
    font,
    fontSize,
  });

export const inputErrorStyles = ({ font }: Partial<InputVariantProps>) =>
  inputStyles({
    variant: null,
    height: null,
    rounded: null,
    font,
    fontSize: "sm",
  });
