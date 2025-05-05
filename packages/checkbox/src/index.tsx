import { Indicator, Root } from "@radix-ui/react-checkbox"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import Check from "./check.svg"
import "./index.css"

type CheckboxProps = ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof checkboxStyles> &
  VariantProps<typeof checkboxLabelStyles> & { label?: string; icon?: ReactNode }

export type ExtendableCheckboxProps<C extends ElementType> = ExtendableComponentProps<C, CheckboxProps>

export type SwitchComponent = ForwardRefExoticComponent<ExtendableCheckboxProps<ElementType> & RefAttributes<ElementType>>

/**
 * A customizable and accessible Checkbox component with label support.
 */
export const Checkbox: SwitchComponent = forwardRef(
  <C extends ElementType>(
    { variant, size, rounded, fontSize, fontWeight, className, disabled, label, icon, ...props }: ExtendableCheckboxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const checkboxId = props.id ?? Math.random().toString()
    return (
      <div className="checkboxContainer flex items-center space-x-2">
        <Root
          id={checkboxId}
          disabled={disabled}
          ref={ref}
          className={cn(
            "checkboxRoot",
            checkboxStyles({
              variant,
              size,
              rounded,
              disabled,
              className,
            })
          )}
          {...props}
        >
          <Indicator className={cn("checkboxIconContainer flex items-center justify-center w-full h-full")}>
            {icon ? icon : <Check />}
          </Indicator>
        </Root>
        {label && (
          <label htmlFor={checkboxId} className={cn(`checkboxLabel text-${size}`, checkboxLabelStyles({ fontSize, fontWeight }))}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export const checkboxStyles = cva("peer h-4 w-4 shrink-0 border focus-visible:outline-none", {
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

export const checkboxLabelStyles = cva("font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
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
  },
  defaultVariants: {
    fontSize: "md",
    fontWeight: "normal",
  },
})
