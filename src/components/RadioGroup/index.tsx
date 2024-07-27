import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { forwardRef } from "react";
import { radioStyles } from "./styles";
import { RadioComponent, RadioProps, RadioValue } from "./types";

export const Radio: RadioComponent = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioProps
>(
  (
    {
      values,
      defaultValue,
      variant,
      size,
      rounded,
      className,
      disabled,
      itemProps,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <RadioGroupPrimitive.Root
        disabled={disabled}
        defaultValue={defaultValue}
        ref={ref}
        className={cn("flex flex-col gap-2")}
        {...props}
      >
        {values.map((item: RadioValue) => (
          <div className="flex gap-2 items-center">
            <RadioGroupPrimitive.Item
              id={item.value}
              key={item.value}
              value={item.value}
              className={cn(
                radioStyles({ variant, rounded, size, disabled, className })
              )}
              {...itemProps}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <div className="h-2.5 w-2.5 fill-current text-current">
                  {icon ? IconsMap[icon] : IconsMap.check}
                </div>
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <label
              htmlFor={item.value}
              className={`text-${size} font-regular leading-none ${disabled && "cursor-not-allowed opacity-70"}`}
            >
              {item.label}
            </label>
          </div>
        ))}
      </RadioGroupPrimitive.Root>
    );
  }
);
