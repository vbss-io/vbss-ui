import { IconsMap } from "@/components/Icons";
import { PolymorphicRef } from "@/lib/types";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { buttonStyles } from "./styles";
import { ButtonComponent, ExtendableButtonProps } from "./types";

export const Button: ButtonComponent = forwardRef(
  <C extends React.ElementType = "button">(
    {
      as,
      variant,
      size,
      rounded,
      font,
      fontSize,
      inverted,
      disabled,
      className,
      icon,
      type = "button",
      ...props
    }: ExtendableButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as ?? "button";
    return (
      <Component
        ref={ref}
        className={cn(
          buttonStyles({
            variant,
            size,
            rounded,
            font,
            fontSize,
            inverted,
            disabled,
            className,
          })
        )}
        type={type}
        disabled={disabled}
        {...props}
      >
        {typeof icon === "string" && (
          <div
            className={`${size?.includes("icon") ? "w-9/12" : "w-[1.25rem]"}`}
          >
            {IconsMap[icon]}
          </div>
        )}
        {props.children}
      </Component>
    );
  }
);
