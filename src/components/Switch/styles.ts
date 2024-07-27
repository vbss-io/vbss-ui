import { cva } from "class-variance-authority";

export const switchStyles = cva(
  "peer inline-flex relative h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50  data-[state=unchecked]:bg-gray-200",
  {
    variants: {
      variant: {
        primary: "border-transparent data-[state=checked]:bg-primary",
        secondary: "border-transparent data-[state=checked]:bg-secondary",
        outline: "border-primary data-[state=checked]:bg-primary",
        bw: "border-transparent data-[state=checked]:bg-black",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
