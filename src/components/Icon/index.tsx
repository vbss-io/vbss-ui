import { IconsMap } from "@/components/Icons";
import { PolymorphicRef } from "@/lib/types";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ExtendableIconProps, IconComponent } from "./types";

export const Icon: IconComponent = forwardRef(
  <C extends React.ElementType = "div">(
    { as, icon, className, ...props }: ExtendableIconProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "div";
    return (
      <Component
        ref={ref}
        className={cn(
          "flex w-full h-full align-middle justify-center",
          className
        )}
        {...props}
      >
        {IconsMap[icon]}
      </Component>
    );
  }
);
