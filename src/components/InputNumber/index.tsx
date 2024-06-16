import { Button, ButtonProps } from "@/components/Button";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const defaultInput =
  "flex w-full border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const inputStyles = cva("", {
  variants: {
    variant: {
      primary: `${defaultInput} focus-visible:ring-primary`,
      secondary: `${defaultInput} focus-visible:ring-secondary`,
      outline: `${defaultInput} border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0`,
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

type InputNumberProps = Omit<ComponentProps<"input">, "type"> &
  VariantProps<typeof inputStyles> & {
    label?: string;
    showControls?: boolean;
    controlsVariant?: ButtonProps["variant"];
  };

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
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
      showControls = false,
      controlsVariant,
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
        <input
          id={inputId}
          type="number"
          disabled={disabled}
          placeholder={placeholder}
          ref={ref}
          onChange={InputOnChange}
          className={cn(
            `text-center`,
            inputStyles({
              variant,
              height,
              font,
              fontSize,
              className,
            })
          )}
          {...props}
        />
        {showControls && (
          <div className={`select-none absolute w-auto self-end bottom-0`}>
            <Button
              className={`${buttonWidth} border relative bottom-[0.2rem] right-1.5`}
              variant={controlsVariant ?? variant}
              rounded={rounded}
              disabled={disabled}
              size="icon-sm"
              icon="plus"
              onClick={() => {
                dispatchInputOnChangeEvent();
              }}
            />
          </div>
        )}
        {showControls && (
          <div className={`select-none absolute w-auto self-start bottom-0`}>
            <Button
              className={`${buttonWidth} border relative bottom-[0.15rem] left-1.5`}
              variant={controlsVariant ?? variant}
              rounded={rounded}
              disabled={disabled}
              size="icon-sm"
              icon="minus"
              onClick={() => {
                dispatchInputOnChangeEvent(true);
              }}
            />
          </div>
        )}
      </div>
    );
  }
);
