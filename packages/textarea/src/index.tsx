import { cn, ExtendableComponentProps, PolymorphicComponent, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps, ElementType, forwardRef, useId } from "react"

type TextareaProps = ComponentProps<"textarea"> &
  VariantProps<typeof textareaStyles> & {
    label?: string
    error?: string
  }

export type ExtendableTextareaProps<C extends ElementType> = ExtendableComponentProps<C, TextareaProps>

export type TextareaComponent = PolymorphicComponent<"textarea", TextareaProps>

/**
 * A customizable and accessible Textarea component for multi-line text input.
 */
export const Textarea = forwardRef(
  <C extends ElementType>(
    {
      variant,
      rounded,
      fontSize,
      fontWeight,
      className,
      disabled,
      placeholder,
      label,
      error,
      ...props
    }: ExtendableTextareaProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const generatedId = useId()
    const textareaId = props.id ?? generatedId

    return (
      <div className="textareaContainer flex flex-col gap-1">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "textareaLabel pl-0.5",
              textAreaLabelStyles({
                fontSize,
                fontWeight,
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
            "textarea",
            textareaStyles({
              variant,
              rounded,
              fontSize,
              fontWeight,
              disabled,
              className,
            })
          )}
          {...props}
        />
        {error && <span className={cn("textareaError pl-0.5 text-red-500", textareaErrorStyles({ fontWeight }))}>{error}</span>}
      </div>
    )
  }
) as TextareaComponent

Textarea.displayName = "Textarea"

const defaultInput = "flex min-h-[80px] w-full border px-3 py-2 focus-visible:outline-none"

export const textareaStyles = cva("", {
  variants: {
    variant: {
      primary: `${defaultInput} focus-visible:border-primary`,
      secondary: `${defaultInput} focus-visible:border-secondary`,
      outline: `${defaultInput} border-primary focus-visible:border-secondary`,
      ghost: `${defaultInput} focus-visible:ring-0`,
    },
    rounded: {
      none: "rounded-none",
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    fontSize: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    fontWeight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    disabled: {
      true: "cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
    },
  },
  defaultVariants: {
    variant: "primary",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    disabled: false,
  },
})

export const textAreaLabelStyles = ({ fontSize, fontWeight }: Partial<TextareaProps>) =>
  textareaStyles({
    variant: null,
    rounded: null,
    fontSize,
    fontWeight,
  })

export const textareaErrorStyles = ({ fontWeight }: Partial<TextareaProps>) =>
  textareaStyles({
    variant: null,
    rounded: null,
    fontSize: "sm",
    fontWeight,
  })
