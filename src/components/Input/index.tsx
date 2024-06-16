import { Button, ButtonProps } from "@/components/Button";
import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef, useState } from "react";

const defaultInput =
  "flex w-full border px-3 py-2 focus-visible:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const inputStyles = cva("", {
  variants: {
    variant: {
      primary: `${defaultInput} focus-visible:border-primary`,
      secondary: `${defaultInput} focus-visible:border-secondary`,
      outline: `${defaultInput} border-primary focus-visible:border-secondary`,
      ghost: `${defaultInput} focus-visible:ring-0`,
    },
    height: {
      sm: "h-8",
      md: "h-9",
      lg: "h-10",
    },
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    font: {
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    fontSize: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-md",
    },
    disabled: {
      true: "cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
    },
  },
  defaultVariants: {
    variant: "primary",
    height: "md",
    rounded: "md",
    font: "medium",
    fontSize: "md",
    disabled: false,
  },
});

type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputStyles> & {
    type?: "text" | "password" | "number";
    label?: string;
    showPasswordSwitch?: boolean;
    buttonProps?: ButtonProps;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      height = "md",
      rounded,
      font,
      fontSize,
      className,
      type = "text",
      disabled,
      placeholder,
      label,
      showPasswordSwitch,
      buttonProps,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const inputId = props.id ?? Math.random().toString();

    const switchPasswordVisibility = (): void => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "pl-0.5",
              inputStyles({
                variant: null,
                height: null,
                rounded: null,
                font,
                fontSize,
              })
            )}
          >
            {label}
          </label>
        )}
        <div className="flex flex-row item-end">
          <div className="flex relative w-full">
            <input
              id={inputId}
              type={inputType}
              disabled={disabled}
              placeholder={placeholder}
              ref={ref}
              value={props.value}
              className={cn(
                `${buttonProps && "!rounded-e-none"}`,
                inputStyles({
                  variant,
                  height,
                  rounded,
                  font,
                  fontSize,
                  className,
                })
              )}
              {...props}
            />
            {showPasswordSwitch && !showPassword && (
              <div
                className={`${disabled ? "pointer-events-none" : "cursor-pointer"} select-none absolute w-auto right-0 bottom-0`}
                onClick={switchPasswordVisibility}
              >
                <div
                  className={`relative opacity-50 bottom-[0.3rem] right-1.5 ${height === "sm" ? "w-5" : height === "md" ? "w-6" : "w-7"}`}
                >
                  {IconsMap["eye"]}
                </div>
              </div>
            )}
            {showPasswordSwitch && showPassword && (
              <div
                className={`${disabled ? "pointer-events-none" : "cursor-pointer"} select-none absolute w-auto right-0 bottom-0`}
                onClick={switchPasswordVisibility}
              >
                <div
                  className={`relative opacity-50 bottom-[0.3rem] right-1.5 ${height === "sm" ? "w-5" : height === "md" ? "w-6" : "w-7"}`}
                >
                  {IconsMap["eye-slash"]}
                </div>
              </div>
            )}
          </div>
          {buttonProps && (
            <Button
              className={`rounded-s-none`}
              rounded={rounded}
              disabled={disabled}
              size={height}
              {...buttonProps}
            />
          )}
        </div>
      </div>
    );
  }
);
