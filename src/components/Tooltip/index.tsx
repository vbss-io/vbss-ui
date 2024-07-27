import { cn } from "@/lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef } from "react";
import { tooltipStyles } from "./styles";
import { TooltipComponent, TooltipProps } from "./types";

export const Tooltip: TooltipComponent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps
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
      ...props
    },
    ref
  ) => (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side}
          ref={ref}
          sideOffset={4}
          className={cn(
            tooltipStyles({ variant, size, rounded, font, fontSize, className })
          )}
          {...props}
        >
          {props.children}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
);
