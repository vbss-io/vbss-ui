import { Button } from "@/components/Button";
import { PolymorphicRef } from "@/lib/types";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { historyNavStyles } from "./styles";
import { ExtendableHistoryNavProps, HistoryNavComponent } from "./types";

export const HistoryNav: HistoryNavComponent = forwardRef(
  <C extends React.ElementType = "div">(
    {
      as,
      backOnClick,
      forwardOnClick,
      arrow = "arrow",
      gap,
      className,
      buttonsProps,
      ...props
    }: ExtendableHistoryNavProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "div";
    return (
      <Component
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
      </Component>
    );
  }
);
