import { Root, Thumb } from "@radix-ui/react-switch"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import "./index.css"

type SwitchProps = ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof switchStyles> &
  VariantProps<typeof switchLabelStyles> & {
    inverted?: boolean
    iconOn?: ReactNode
    iconOff?: ReactNode
    label?: string
  }

export type ExtendableSwitchProps<C extends ElementType> = ExtendableComponentProps<C, SwitchProps>

export type SwitchComponent = ForwardRefExoticComponent<ExtendableSwitchProps<ElementType> & RefAttributes<ElementType>>

/**
 * A customizable and accessible Switch component.
 */
export const Switch: SwitchComponent = forwardRef(
  <C extends ElementType>(
    {
      variant,
      rounded,
      fontSize,
      fontWeight,
      inverted,
      disabled,
      className,
      label,
      iconOn,
      iconOff,
      onChange,
      ...props
    }: ExtendableSwitchProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const inputId = props.id ?? Math.random().toString()
    return (
      <div className={`switchContainer flex ${inverted && "flex-row-reverse"} gap-2 items-center`}>
        <Root
          className={cn("switchRoot", switchStyles({ variant, rounded, className }))}
          ref={ref}
          disabled={disabled}
          onCheckedChange={onChange ?? props.onCheckedChange}
          id={inputId}
          {...props}
        >
          {iconOn && (
            <div
              className={cn(
                "switchIconOnContainer p-1 text-background absolute top-1/3 right-1/3 transform -translate-x-[3px] -translate-y-[0.475rem] [&_*]:w-full [&_*]:h-full"
              )}
            >
              {iconOn}
            </div>
          )}
          <Thumb className={cn("switchThumb", switchThumbStyles({ rounded }))} />
          {iconOff && (
            <div
              className={cn(
                "switchIconOffContainer p-1 text-black absolute top-1/3 left-1/3 transform -translate-x-[-3px] -translate-y-[0.475rem] [&_*]:w-full [&_*]:h-full"
              )}
            >
              {iconOff}
            </div>
          )}
        </Root>
        {label && (
          <label htmlFor={inputId} className={cn("switchLabel", switchLabelStyles({ fontSize, fontWeight }))}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Switch.displayName = "Switch"

export const switchStyles = cva(
  "peer inline-flex relative h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50  data-[state=unchecked]:bg-gray-200",
  {
    variants: {
      variant: {
        primary: "border-transparent data-[state=checked]:bg-primary",
        secondary: "border-transparent data-[state=checked]:bg-secondary",
        outline: "border-primary data-[state=checked]:bg-primary",
        ghost: "border-transparent data-[state=checked]:bg-primary/50",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      disabled: {
        true: "disabled:pointer-events-none disabled:opacity-50",
      },
    },
    defaultVariants: {
      variant: "primary",
      rounded: "full",
      disabled: false,
    },
  }
)

export const switchThumbStyles = cva(
  "pointer-events-none block h-4 w-4 bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 z-50",
  {
    variants: {
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      rounded: "full",
    },
  }
)

export const switchLabelStyles = cva("leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
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
    fontSize: "sm",
    fontWeight: "normal",
  },
})
