import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const radioStyles = cva("aspect-square border", {
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
    rounded: "lg",
    disabled: false,
  },
});

type RadioValue = {
  value: string;
  label: string;
};

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> &
  VariantProps<typeof radioStyles> & {
    label?: string;
    icon?: keyof typeof IconsMap;
    values: RadioValue[];
    defaultValue?: string;
    itemProps?: Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
      "value" | "id" | "key"
    >;
  };

export const Radio = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  CheckboxProps
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
