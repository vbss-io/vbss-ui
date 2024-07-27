import { cva } from "class-variance-authority";

export const variantTable = cva("text-black", {
  variants: {
    variant: {
      primary: ``,
      secondary: ``,
      outline: ``,
      ghost: ``,
    },
    fontSize: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-md",
    },
  },
  defaultVariants: {
    variant: "primary",
    fontSize: "md",
  },
});

export const heightTable = cva("", {
  variants: {
    height: {
      sm: "h-8",
      md: "h-10",
      lg: "h-14",
    },
  },
  defaultVariants: {
    height: "md",
  },
});

export const tableStyles = cva("", {
  variants: {
    variant: {
      primary: ``,
      secondary: ``,
      outline: `border-primary`,
      ghost: ``,
    },
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
    outBorder: {
      true: "border",
    },
  },
  defaultVariants: {
    variant: "primary",
    rounded: "lg",
    outBorder: false,
  },
});

export const headerStyle: { [key: string]: string } = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  outline: "bg-white text-primary",
};

export const rowStyle: { [key: string]: string } = {
  primary: "hover:bg-secondary/5 data-[state=selected]:bg-secondary/10",
  secondary: "hover:bg-primary/5 data-[state=selected]:bg-primary/10",
  outline:
    "border-primary hover:bg-secondary/5 data-[state=selected]:bg-primary/10",
  ghost: "hover:bg-secondary/5 data-[state=selected]:bg-primary/10",
};

export const footerStyle: { [key: string]: string } = {
  outline: "border-primary text-primary",
};
