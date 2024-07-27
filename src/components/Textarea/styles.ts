import { cva } from "class-variance-authority";
import { TextAreaVariantProps } from "./types";

const defaultInput =
  "flex min-h-[80px] w-full border px-3 py-2 focus-visible:outline-none";

export const textareaStyles = cva("", {
  variants: {
    variant: {
      primary: `${defaultInput} focus-visible:border-primary`,
      secondary: `${defaultInput} focus-visible:border-secondary`,
      outline: `${defaultInput} border-primary focus-visible:border-secondary`,
      ghost: `${defaultInput} focus-visible:ring-0`,
    },
    height: {
      sm: "h-16",
      md: "h-18",
      lg: "h-20",
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

export const textAreaLabelStyles = ({
  font,
  fontSize,
}: Partial<TextAreaVariantProps>) =>
  textareaStyles({
    variant: null,
    height: null,
    rounded: null,
    font,
    fontSize,
  });
