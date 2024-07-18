import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const popoverStyles = cva(
  "z-50 overflow-hidden bg-primary animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        primary: "border bg-primary text-white",
        secondary: "border bg-secondary text-white",
        outline: "bg-background border border-primary text-primary",
      },
      size: {
        sm: "px-2.5 py-0.5",
        md: "px-3 py-1",
        lg: "px-4 py-2",
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
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      font: "regular",
      fontSize: "md",
    },
  }
);

type PopoverProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> &
  VariantProps<typeof popoverStyles> & {
    trigger: React.ReactNode;
  };

export const Popover = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverProps
>(
  (
    {
      trigger,
      side,
      variant,
      size,
      rounded,
      font,
      fontSize,
      className,
      align = "center",
      sideOffset = 4,
      ...props
    },
    ref
  ) => (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            popoverStyles({ variant, size, rounded, font, fontSize, className })
          )}
          {...props}
        >
          {props.children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
);

Popover.displayName = PopoverPrimitive.Content.displayName;
