import { Indicator, Item, Root } from "@radix-ui/react-radio-group"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import Check from "./check.svg"
import "./index.css"

export type RadioValue = {
  value: string
  label: string
}

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof radioGroupStyles> & {
    values?: RadioValue[]
    label?: string
    icon?: ReactNode
    defaultValue?: string
    itemProps?: Omit<React.ComponentPropsWithoutRef<typeof Item>, "value" | "id" | "key">
    direction?: "col" | "row"
  }

export type ExtendableRadioGroupProps<C extends ElementType> = ExtendableComponentProps<C, RadioGroupProps>

export type RadioGroupComponent = ForwardRefExoticComponent<ExtendableRadioGroupProps<ElementType> & RefAttributes<ElementType>>

export const RadioGroup: RadioGroupComponent = forwardRef(
  <C extends ElementType>(
    {
      values = [],
      defaultValue,
      variant,
      size,
      rounded,
      fontSize,
      fontWeight,
      className,
      disabled,
      label,
      itemProps,
      icon,
      direction = "col",
      ...props
    }: ExtendableRadioGroupProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const radioGroupId = props.id ?? Math.random().toString()

    return (
      <div className="radioGroupContainer flex flex-col space-y-2">
        {label && (
          <label htmlFor={radioGroupId} className={cn(`radioGroupLabel`, radioGroupFontStyle({ fontSize, fontWeight }))}>
            {label}
          </label>
        )}
        <Root
          id={radioGroupId}
          disabled={disabled}
          defaultValue={defaultValue}
          ref={ref}
          className={cn(`radioGroupRoot flex flex-${direction} gap-2`)}
          {...props}
        >
          {values.map((item: RadioValue) => (
            <div key={item.value} className="radioGroupItemContainer flex gap-2 items-center">
              <Item
                id={item.value}
                value={item.value}
                className={cn(
                  "radioGroupItem",
                  radioGroupStyles({ variant, rounded, size, disabled, className }),
                  radioGroupFontStyle({ fontSize, fontWeight })
                )}
                {...itemProps}
              >
                <Indicator className="radioGroupIndicator flex items-center justify-center w-full h-full">
                  {icon ? icon : <Check />}
                </Indicator>
              </Item>
              <label
                htmlFor={item.value}
                className={cn("radioGroupItemLabel", radioGroupFontStyle({ fontSize, fontWeight, disabled }))}
              >
                {item.label}
              </label>
            </div>
          ))}
        </Root>
      </div>
    )
  }
)

RadioGroup.displayName = "RadioGroup"

export const radioGroupStyles = cva("aspect-square border", {
  variants: {
    variant: {
      primary: `border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white`,
      secondary: `border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-white`,
      outline: `border-primary data-[state=checked]:bg-white data-[state=checked]:text-primary`,
      ghost: `border-black`,
    },
    size: {
      xs: "w-3.5 h-3.5",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7",
    },
    rounded: {
      none: "rounded-none",
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
})

export const radioGroupFontStyle = cva("leading-none", {
  variants: {
    fontSize: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    fontWeight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    disabled: {
      true: "cursor-not-allowed opacity-70",
    },
  },
  defaultVariants: {
    fontSize: "md",
    fontWeight: "normal",
    disabled: false,
  },
})
