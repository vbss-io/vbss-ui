import "./index.css"
import { PolymorphicRef, cn } from "vbss-ui-lib";
import { forwardRef } from "react";
import { chipStyles } from "./styles";
import { ChipComponent, ExtendableChipProps } from "./types";

/**
 * To-Do
 */
export const Chip: ChipComponent = forwardRef(
  <C extends React.ElementType>(
    {
      as,
      variant,
      size,
      rounded,
      font,
      fontSize,
      className,
      ...props
    }: ExtendableChipProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "div";
    return (
      <Component
        className={cn(
          chipStyles({ variant, size, rounded, font, fontSize, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
)

Chip.displayName = "Chip"
