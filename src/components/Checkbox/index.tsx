import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { forwardRef } from "react";
import { inputStyles } from "./styles";
import { CheckboxComponent, CheckboxProps } from "./types";

export const Checkbox: CheckboxComponent = forwardRef<
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
