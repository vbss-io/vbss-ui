import { Chip } from "@/components/Chip";
import { PolymorphicRef } from "@/lib/types";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { chipsStyles } from "./styles";
import { ChipsComponent, ExtendableChipsProps } from "./types";

export const Chips: ChipsComponent = forwardRef(
  <C extends React.ElementType = "div">(
    {
      as,
      chips,
      gap,
      className,
      chipsProps,
      ...props
    }: ExtendableChipsProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "div";
    return (
      <Component
        className={cn(chipsStyles({ gap, className }))}
        ref={ref}
        {...props}
      >
        {chips.map((chip, index) => (
          <Chip key={index} {...chipsProps}>
            {chip}
          </Chip>
        ))}
      </Component>
    );
  }
);
