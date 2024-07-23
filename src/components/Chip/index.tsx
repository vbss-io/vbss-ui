import { PolymorphicRef } from "@/lib/types";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { chipStyles } from "./styles";
import { ChipComponent, ExtendableChipProps } from "./types";

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
);
