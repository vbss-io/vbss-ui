import { Button } from "@/components/Button";
import { IconsMap } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { inputErrorStyles, inputLabelStyles, inputStyles } from "./styles";
import { InputComponent, InputProps } from "./types";

export const Input: InputComponent = forwardRef<HTMLInputElement, InputProps>(
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
      error,
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
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn("pl-0.5", inputLabelStyles({ font, fontSize }))}
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
        {error && (
          <span
            className={cn("pl-0.5 text-red-500", inputErrorStyles({ font }))}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);
