import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { textAreaLabelStyles, textareaStyles } from "./styles";
import { TextAreaComponent, TextAreaProps } from "./types";

export const Textarea: TextAreaComponent = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(
  (
    {
      variant,
      height,
      rounded,
      font,
      fontSize,
      className,
      disabled,
      placeholder,
      label,
      ...props
    },
    ref
  ) => {
    const textareaId = props.id ?? Math.random().toString();

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "pl-0.5",
              textAreaLabelStyles({
                font,
                fontSize,
              })
            )}
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          disabled={disabled}
          placeholder={placeholder}
          value={props.value}
          ref={ref}
          className={cn(
            textareaStyles({
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
      </div>
    );
  }
);
