import { Chip, ExtendableChipProps } from "@vbss-ui/chip"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"

type ChipsProps = ComponentProps<"div"> &
  VariantProps<typeof chipsStyles> & {
    chips?: string[] | number[] | ReactNode[]
    chipsProps?: ExtendableChipProps<ElementType>
  }

export type ExtendableChipsProps<C extends ElementType> = ExtendableComponentProps<C, ChipsProps>

export type ChipsComponent = ForwardRefExoticComponent<ExtendableChipsProps<ElementType> & RefAttributes<ElementType>>

/**
 * The Chips component is a wrapper for grouping multiple Chip components.
 */
export const Chips: ChipsComponent = forwardRef(
  <C extends ElementType>(
    { as, gap, flexDirection, className, chips, chipsProps, ...props }: ExtendableChipsProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "div"
    return (
      <Component className={cn("chips", chipsStyles({ gap, flexDirection, className }))} ref={ref} {...props}>
        {chips?.map((chip, index) => (
          <Chip key={index} {...chipsProps}>
            {chip}
          </Chip>
        ))}
      </Component>
    )
  }
)

Chips.displayName = "Chips"

export const chipsStyles = cva("leading-none inline-flex items-center", {
  variants: {
    gap: {
      xs: "gap-0",
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
      xl: "gap-4",
    },
    flexDirection: {
      row: "flex-row",
      col: "flex-col",
    },
  },
  defaultVariants: {
    gap: "md",
    flexDirection: "row",
  },
})
