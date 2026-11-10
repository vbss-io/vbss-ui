import { Content, Provider, Root, Trigger } from "@radix-ui/react-tooltip"
import { cn, ExtendableComponentProps, PolymorphicComponent, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentPropsWithoutRef, ElementType, forwardRef, isValidElement, ReactNode } from "react"
import "./index.css"

type TooltipProps = ComponentPropsWithoutRef<typeof Content> &
  VariantProps<typeof tooltipStyles> &
  Pick<ComponentPropsWithoutRef<typeof Root>, "open" | "defaultOpen" | "onOpenChange" | "delayDuration"> &
  Pick<ComponentPropsWithoutRef<typeof Provider>, "skipDelayDuration"> & {
    trigger?: ReactNode
    provider?: boolean
  }

export type ExtendableTooltipProps<C extends ElementType> = ExtendableComponentProps<C, TooltipProps>

export type TooltipComponent = PolymorphicComponent<"div", TooltipProps>

export const TooltipProvider = Provider

/**
 * A customizable and accessible Tooltip component.
 */
export const Tooltip = forwardRef(
  <C extends ElementType>(
    {
      trigger,
      side,
      variant,
      size,
      sideOffset = 4,
      rounded,
      fontSize,
      fontWeight,
      className,
      provider = true,
      delayDuration,
      skipDelayDuration,
      open,
      defaultOpen,
      onOpenChange,
      ...props
    }: ExtendableTooltipProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const root = (
      <Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} delayDuration={delayDuration}>
        {isValidElement(trigger) ? (
          <Trigger asChild className="tooltipTrigger">
            {trigger}
          </Trigger>
        ) : (
          <Trigger className="tooltipTrigger">{trigger === undefined ? <div /> : trigger}</Trigger>
        )}
        <Content
          side={side}
          sideOffset={sideOffset}
          className={cn("tooltipContent", tooltipStyles({ variant, size, rounded, fontWeight, fontSize, className }))}
          ref={ref}
          {...props}
        >
          {props.children}
        </Content>
      </Root>
    )
    return provider ? <Provider skipDelayDuration={skipDelayDuration}>{root}</Provider> : root
  }
) as TooltipComponent

Tooltip.displayName = "Tooltip"

export const tooltipStyles = cva(
  "z-50 overflow-hidden bg-primary animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        primary: "border bg-primary text-white",
        secondary: "border bg-secondary text-white",
        outline: "bg-white border border-primary text-primary",
      },
      size: {
        xs: "px-2 py-0.5",
        sm: "px-2.5 py-0.5",
        md: "px-3 py-1",
        lg: "px-4 py-2",
        xl: "px-5 py-3",
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
