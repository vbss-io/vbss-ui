import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const inputStyles = cva(
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

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> &
  VariantProps<typeof inputStyles> & {
    label?: string;
    icon?: keyof typeof IconsMap;
  };

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    { variant, size, rounded, className, disabled, label, icon, ...props },
    ref
  ) => {
    const checkboxId = props.id ?? Math.random().toString();

    return (
      <div className="flex items-center space-x-2">
        <CheckboxPrimitive.Root
          id={checkboxId}
          disabled={disabled}
          ref={ref}
          className={cn(
            inputStyles({
              variant,
              size,
              rounded,
              disabled,
              className,
            })
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center text-current")}
          >
            {icon ? IconsMap[icon] : IconsMap.check}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label
            htmlFor={checkboxId}
            className={`text-${size} font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
