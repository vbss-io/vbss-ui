import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { inputNumberLabelStyles, inputNumberStyles } from "./styles";
import { InputNumberComponent, InputNumberProps } from "./types";

export const InputNumber: InputNumberComponent = forwardRef<
  HTMLInputElement,
  InputNumberProps
>(
  (
    {
      variant,
      height = "md",
      rounded,
      font,
      fontSize,
      className,
      disabled,
      placeholder,
      label,
      controlsProps,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = props.id ?? Math.random().toString();
    const buttonWidth =
      height === "sm" ? "w-5 h-5" : height === "md" ? "w-6 h-6" : "w-7 h-7";

    const InputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    const dispatchInputOnChangeEvent = (plus = false) => {
      const element = document.getElementById(inputId) as HTMLInputElement;
      const operation = plus ? 1 : -1;
      InputOnChange({
        target: {
          value: String(Number(element.value) - operation),
        } as EventTarget & HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>);

      element.value = String(Number(element.value) - operation);
    };

    return (
      <div className="flex relative w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn("pl-0.5", inputNumberLabelStyles({ font, fontSize }))}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type="number"
          disabled={disabled}
          placeholder={placeholder}
          ref={ref}
          onChange={InputOnChange}
          className={cn(
            `text-center`,
            inputNumberStyles({
              variant,
              height,
              font,
              fontSize,
              className,
            })
          )}
          {...props}
        />
        {controlsProps && (
          <div className={`select-none absolute w-auto self-end bottom-0`}>
            <Button
              className={`${buttonWidth} border relative bottom-[0.2rem] right-1.5`}
              rounded={rounded}
              disabled={disabled}
              size="icon-sm"
              icon="plus"
              onClick={() => {
                dispatchInputOnChangeEvent();
              }}
              {...controlsProps}
            />
          </div>
        )}
        {controlsProps && (
          <div className={`select-none absolute w-auto self-start bottom-0`}>
            <Button
              className={`${buttonWidth} border relative bottom-[0.15rem] left-1.5`}
              rounded={rounded}
              disabled={disabled}
              size="icon-sm"
              icon="minus"
              onClick={() => {
                dispatchInputOnChangeEvent(true);
              }}
              {...controlsProps}
            />
          </div>
        )}
      </div>
    );
  }
);
