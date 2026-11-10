import { Button, ExtendableButtonProps } from "@vbss-ui/button"
import { cn, ExtendableComponentProps, PolymorphicComponent, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps, ElementType, forwardRef, ReactNode } from "react"
import ArrowLeft from "./arrow-left.svg"
import ArrowRight from "./arrow-right.svg"
import "./index.css"

export type HistoryNavButtonProps = Omit<ExtendableButtonProps<ElementType>, "onClick" | "icon"> & {
  size?: "icon-sm" | "icon-md" | "icon-lg"
}

export type HistoryNavProps = ComponentProps<"div"> &
  VariantProps<typeof historyNavStyles> & {
    buttonsProps?: HistoryNavButtonProps
    leftButtonProps?: HistoryNavButtonProps
    rightButtonProps?: HistoryNavButtonProps
    leftOnClick?: () => void
    rightOnClick?: () => void
    leftIcon?: ReactNode
    rightIcon?: ReactNode
  }

export type ExtendableHistoryNavProps<C extends ElementType> = ExtendableComponentProps<C, HistoryNavProps>

export type HistoryNavComponent = PolymorphicComponent<"div", HistoryNavProps>

export const HistoryNav = forwardRef(
  <C extends ElementType>(
    {
      as,
      gap,
      className,
      buttonsProps,
      leftButtonProps,
      rightButtonProps,
      leftOnClick,
      rightOnClick,
      leftIcon,
      rightIcon,
      ...props
    }: ExtendableHistoryNavProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "div"
    return (
      <Component ref={ref} className={cn("historyNavContainer flex", historyNavStyles({ gap }), className)} {...props}>
        <Button
          aria-label="Go back"
          onClick={leftOnClick}
          {...buttonsProps}
          {...leftButtonProps}
          size={leftButtonProps?.size ?? buttonsProps?.size ?? "icon-md"}
        >
          {leftIcon ? leftIcon : <ArrowLeft />}
        </Button>
        <Button
          aria-label="Go forward"
          onClick={rightOnClick}
          {...buttonsProps}
          {...rightButtonProps}
          size={rightButtonProps?.size ?? buttonsProps?.size ?? "icon-md"}
        >
          {rightIcon ? rightIcon : <ArrowRight />}
        </Button>
      </Component>
    )
  }
) as HistoryNavComponent

HistoryNav.displayName = "HistoryNav"

export const historyNavStyles = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors", {
  variants: {
    gap: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-5",
    },
  },
  defaultVariants: {
    gap: "md",
  },
})
