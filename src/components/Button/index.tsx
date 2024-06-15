import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-2 border-primary bg-primary text-white hover:bg-secondary hover:border-secondary",
        secondary:
          "border-2 border-secondary bg-secondary text-white hover:bg-primary hover:border-primary",
        outline:
          "border-2 border-primary text-primary bg-background hover:bg-primary/10",
        outlineSolid:
          "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-white",
        ghost:
          "border-2 border-background hover:bg-primary/10 hover:border-primary/10",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      disabled: {
        true: "cursor-not-allowed bg-gray-400 border-gray-400 hover:bg-gray-300 hover:border-gray-300",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      disabled: false,
    },
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> & {
    icon?: keyof typeof IconsMap;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, rounded, className, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size, rounded, className }))}
        {...props}
      >
        {typeof icon === "string" && (
          <div className={`${size === "icon" ? "w-9/12" : ""}`}>
            {IconsMap[icon]}
          </div>
        )}
        {props.children}
      </button>
    );
  }
);
