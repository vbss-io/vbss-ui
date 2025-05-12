import { Content, Portal, Root, Trigger } from "@radix-ui/react-popover"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import "./index.css"

export type PopoverProps = ComponentPropsWithoutRef<typeof Content> &
  VariantProps<typeof popoverStyles> & {
    trigger?: ReactNode
  }

export type ExtendablePopoverProps<C extends ElementType> = ExtendableComponentProps<C, PopoverProps>

export type PopoverComponent = ForwardRefExoticComponent<ExtendablePopoverProps<ElementType> & RefAttributes<ElementType>>

/**
 * A customizable and accessible Popover component that displays content in a floating container next to a trigger element.
 */
export const Popover: PopoverComponent = forwardRef(
  <C extends ElementType>(
    {
      trigger = <div />,
      side,
      variant,
      size,
      rounded,
      fontSize,
      fontWeight,
      className,
      align = "center",
      sideOffset = 4,
      ...props
    }: ExtendablePopoverProps<C>,
    ref?: PolymorphicRef<C>
  ) => (
    <Root>
      <Trigger className="popoverTrigger">{trigger}</Trigger>
      <Portal>
        <Content
          side={side}
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn("popoverContent", popoverStyles({ variant, size, rounded, fontSize, fontWeight, className }))}
          {...props}
        >
          {props.children}
        </Content>
      </Portal>
    </Root>
  )
)

Popover.displayName = "Popover"

export const popoverStyles = cva(
  "z-50 overflow-hiddenanimate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        primary: "bg-primary bg-primary text-white",
        secondary: "bg-secondary text-white",
        outline: "bg-background border border-primary text-primary",
      },
      size: {
        xs: "px-2 py-0.5",
        sm: "px-2.5 py-0.5",
        md: "px-3 py-1",
        lg: "px-4 py-2",
        xl: "px-6 py-3",
      },
      rounded: {
        none: "rounded-none",
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
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      fontSize: "md",
      fontWeight: "normal",
    },
  }
)
