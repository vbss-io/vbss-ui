import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps, ElementType, forwardRef, ForwardRefExoticComponent, RefAttributes } from "react"
import "./index.css"

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonStyles>

export type ExtendableButtonProps<C extends ElementType> = ExtendableComponentProps<C, ButtonProps>

export type ButtonComponent = ForwardRefExoticComponent<ExtendableButtonProps<ElementType> & RefAttributes<ElementType>>

/**
 * A customizable and accessible Button component.
 */
export const Button: ButtonComponent = forwardRef(
  <C extends ElementType>(
    { as, variant, size, rounded, fontWeight, fontSize, inverted, disabled, className, ...props }: ExtendableButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "button"
    return (
      <Component
        className={cn(
          "button",
          buttonStyles({
            variant,
            size,
            rounded,
            fontWeight,
            fontSize,
            inverted,
            disabled,
            className,
          })
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {props.children}
      </Component>
    )
  }
)

Button.displayName = "Button"

export const buttonStyles = cva("outline-none inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors", {
  variants: {
    variant: {
      primary: "border-2 border-primary bg-primary text-white hover:bg-secondary hover:border-secondary",
      secondary: "border-2 border-secondary bg-secondary text-white hover:bg-primary hover:border-primary",
      outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10",
      outlineSolid: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
      ghost: "border-background hover:bg-primary/10 hover:border-primary/10",
    },
    size: {
      xs: "h-6 px-2",
      sm: "h-8 px-3",
      md: "h-9 px-4 py-2",
      lg: "h-10 px-8",
      "icon-xs": "[&_*]:w-full [&_*]:h-full h-7 w-7 p-1",
      "icon-sm": "[&_*]:w-full [&_*]:h-full h-8 w-8 p-1",
      "icon-md": "[&_*]:w-full [&_*]:h-full h-9 w-9 p-1",
      "icon-lg": "[&_*]:w-full [&_*]:h-full h-10 w-10 p-1",
    },
    rounded: {
      none: "rounded-none",
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
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
    inverted: {
      true: "flex-row-reverse",
    },
    disabled: {
      true: "disabled:pointer-events-none disabled:opacity-50",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    inverted: false,
    disabled: false,
  },
})
