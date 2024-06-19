import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const defaultInput =
  "flex min-h-[80px] w-full border px-3 py-2 focus-visible:outline-none";

const textareaIdStyles = cva("", {
  variants: {
    variant: {
      primary: `${defaultInput} focus-visible:border-primary`,
      secondary: `${defaultInput} focus-visible:border-secondary`,
      outline: `${defaultInput} border-primary focus-visible:border-secondary`,
      ghost: `${defaultInput} focus-visible:ring-0`,
    },
    height: {
      sm: "h-16",
      md: "h-18",
      lg: "h-20",
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

type InputProps = ComponentProps<"textarea"> &
  VariantProps<typeof textareaIdStyles> & {
    label?: string;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
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
              textareaIdStyles({
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
        <textarea
          id={textareaId}
          disabled={disabled}
          placeholder={placeholder}
          value={props.value}
          ref={ref}
          className={cn(
            textareaIdStyles({
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
