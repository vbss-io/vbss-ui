import { cva } from "class-variance-authority";

export const inputStyles = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none ",
  {
    variants: {
      variant: {
        primary: `border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white`,
        secondary: `border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-white`,
        outline: `border-primary data-[state=checked]:bg-white data-[state=checked]:text-primary`,
        ghost: `border-black`,
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      disabled: {
        true: "cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
      rounded: "md",
      disabled: false,
    },
  }
);
