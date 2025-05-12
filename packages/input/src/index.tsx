import { Button, ExtendableButtonProps } from "@vbss-ui/button"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, useState } from "react"
import EyeSlash from "./eye-slash.svg"
import Eye from "./eye.svg"
import "./index.css"

type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputStyles> & {
    type?: "text" | "password" | "number"
    label?: string
    showPasswordSwitch?: boolean
    iconOn?: ReactNode
    iconOff?: ReactNode
    buttonProps?: ExtendableButtonProps<ElementType>
    error?: string
  }

export type ExtendableInputProps<C extends ElementType> = ExtendableComponentProps<C, InputProps>

export type InputComponent = ForwardRefExoticComponent<ExtendableInputProps<ElementType> & RefAttributes<ElementType>>

/**
 * A customizable and accessible Input component.
 */
export const Input: InputComponent = forwardRef(
  <C extends ElementType>(
    {
      variant,
      height = "md",
      rounded,
      fontSize,
      fontWeight,
      className,
      type = "text",
      disabled,
      placeholder,
      label,
      error,
      showPasswordSwitch,
      iconOn,
      iconOff,
      buttonProps,
      ...props
    }: ExtendableInputProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type
    const inputId = props.id ?? Math.random().toString()

    const switchPasswordVisibility = (): void => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="inputRoot flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className={cn("inputLabel pl-0.5", inputLabelStyles({ fontSize, fontWeight }))}>
            {label}
          </label>
        )}
        <div className="inputContainer flex flex-row item-end">
          <div className="inputContent flex relative w-full">
            <input
              id={inputId}
              type={inputType}
              disabled={disabled}
              placeholder={placeholder}
              ref={ref}
              value={props.value}
              className={cn(
                `input w-full ${buttonProps && "!rounded-e-none"} ${(showPasswordSwitch || iconOn || iconOff) && "pr-8"}`,
                inputStyles({
                  variant,
                  height,
                  rounded,
                  fontSize,
                  fontWeight,
                  className,
                })
              )}
              {...props}
            />
            {showPasswordSwitch && !showPassword && (
              <div
                className={`inputIconOnContainer ${disabled ? "pointer-events-none" : "cursor-pointer"} select-none absolute right-2 top-1/2 -translate-y-1/2`}
                onClick={switchPasswordVisibility}
              >
                <div className={cn("inputIconOn", inputIconStyles({ height }))}>{iconOn ? iconOn : <Eye />}</div>
              </div>
            )}
            {showPasswordSwitch && showPassword && (
              <div
                className={`inputIconOffContainer ${disabled ? "pointer-events-none" : "cursor-pointer"} select-none absolute right-2 top-1/2 -translate-y-1/2`}
                onClick={switchPasswordVisibility}
              >
                <div className={cn("inputIconOff", inputIconStyles({ height }))}>{iconOff ? iconOff : <EyeSlash />}</div>
              </div>
            )}
          </div>
          {buttonProps && (
            <Button className={"rounded-s-none"} rounded={rounded} disabled={disabled} size={height} {...buttonProps} />
          )}
        </div>
        {error && <span className={cn("inputError pl-0.5 text-red-500", inputErrorStyles({ fontWeight }))}>{error}</span>}
      </div>
    )
  }
)

Input.displayName = "Input"

const defaultInputStyles =
  "flex border px-3 py-2 focus-visible:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

export const inputStyles = cva("", {
  variants: {
    variant: {
      primary: `${defaultInputStyles} focus-visible:border-primary`,
      secondary: `${defaultInputStyles} focus-visible:border-secondary`,
      outline: `${defaultInputStyles} border-primary focus-visible:border-secondary`,
      ghost: `${defaultInputStyles} focus-visible:ring-0`,
    },
    height: {
      xs: "h-6",
      sm: "h-8",
      md: "h-9",
      lg: "h-14",
      xl: "h-16",
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
    height: "md",
    rounded: "md",
    fontSize: "md",
    fontWeight: "normal",
    disabled: false,
  },
})

export const inputIconStyles = cva("relative opacity-50", {
  variants: {
    height: {
      xs: "px-2 [&>svg]:w-3 [&>svg]:h-3",
      sm: "px-2 [&>svg]:w-4 [&>svg]:h-4",
      md: "px-2 [&>svg]:w-5 [&>svg]:h-5",
      lg: "px-2 [&>svg]:w-6 [&>svg]:h-6",
      xl: "px-2 [&>svg]:w-7 [&>svg]:h-7",
    },
  },
  defaultVariants: {
    height: "md",
  },
})

export const inputLabelStyles = ({ fontSize, fontWeight }: Partial<InputProps>) =>
  inputStyles({
    variant: null,
    height: null,
    rounded: null,
    fontSize,
    fontWeight,
  })

export const inputErrorStyles = ({ fontWeight }: Partial<InputProps>) =>
  inputStyles({
    variant: null,
    height: null,
    rounded: null,
    fontSize: "sm",
    fontWeight,
  })
