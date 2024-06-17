import { Chip, ChipProps } from "@/components/Chip";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const chipsStyles = cva("leading-none inline-flex items-center", {
  variants: {
    gap: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    gap: "md",
  },
});

type ChipsProps = ComponentProps<"div"> &
  VariantProps<typeof chipsStyles> & {
    chips: string[] | number[] | React.ReactNode[];
    chipsProps?: ChipProps;
  };

export const Chips = forwardRef<HTMLDivElement, ChipsProps>(
  ({ gap, className, chipsProps, ...props }) => {
    return (
      <div className={cn(chipsStyles({ gap, className }))} {...props}>
        {props.chips.map((chip, index) => (
          <Chip key={index} {...chipsProps}>
            {chip}
          </Chip>
        ))}
      </div>
    );
  }
);
