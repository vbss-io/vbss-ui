import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const historyNavStyles = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors",
  {
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
  }
);

export type HistoryNavProps = ComponentProps<"div"> &
  VariantProps<typeof historyNavStyles> & {
    arrow?: "arrow-arc" | "arrow-circle" | "arrow" | "arrow-square" | "caret";
    buttonsProps?: Omit<ComponentProps<typeof Button>, "onClick" | "icon"> & {
      size?: "icon-sm" | "icon-md" | "icon-lg";
    };
    backOnClick: () => void;
    forwardOnClick?: () => void;
  };

export const HistoryNav = forwardRef<HTMLDivElement, HistoryNavProps>(
  (
    {
      backOnClick,
      forwardOnClick,
      arrow = "arrow",
      gap,
      className,
      buttonsProps,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex", historyNavStyles({ gap }), className)}
        {...props}
      >
        <Button
          size={buttonsProps?.size ?? "icon-md"}
          icon={`${arrow}-left`}
          onClick={backOnClick}
          {...buttonsProps}
        />
        <Button
          size={buttonsProps?.size ?? "icon-md"}
          icon={`${arrow}-right`}
          onClick={forwardOnClick}
          {...buttonsProps}
        />
      </div>
    );
  }
);
