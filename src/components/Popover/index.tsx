import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef } from "react";
import { popoverStyles } from "./styles";
import { PopoverComponent, PopoverProps } from "./types";

export const Popover: PopoverComponent = forwardRef<
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
