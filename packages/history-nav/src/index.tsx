import { Button, ExtendableButtonProps } from "@vbss-ui/button"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import ArrowLeft from "./arrow-left.svg"
import ArrowRight from "./arrow-right.svg"
import "./index.css"

export type HistoryNavProps = ComponentProps<"div"> &
  VariantProps<typeof historyNavStyles> & {
    buttonsProps?: Omit<ExtendableButtonProps<ElementType>, "onClick" | "icon"> & {
      size?: "icon-sm" | "icon-md" | "icon-lg"
    }
    leftOnClick?: () => void
    rightOnClick?: () => void
    leftIcon?: ReactNode
    rightIcon?: ReactNode
  }

export type ExtendableHistoryNavProps<C extends ElementType> = ExtendableComponentProps<C, HistoryNavProps>

export type HistoryNavComponent = ForwardRefExoticComponent<ExtendableHistoryNavProps<ElementType> & RefAttributes<ElementType>>

export const HistoryNav: HistoryNavComponent = forwardRef(
  <C extends ElementType>(
    { as, gap, className, buttonsProps, leftOnClick, rightOnClick, leftIcon, rightIcon, ...props }: ExtendableHistoryNavProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "div"
    return (
      <Component ref={ref} className={cn("historyNavContainer flex", historyNavStyles({ gap }), className)} {...props}>
        <Button size={buttonsProps?.size ?? "icon-md"} onClick={leftOnClick} {...buttonsProps}>
          {leftIcon ? leftIcon : <ArrowLeft />}
        </Button>
        <Button size={buttonsProps?.size ?? "icon-md"} onClick={rightOnClick} {...buttonsProps}>
          {rightIcon ? rightIcon : <ArrowRight />}
        </Button>
      </Component>
    )
  }
)

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
