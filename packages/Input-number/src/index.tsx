import { Button, ExtendableButtonProps } from "@vbss-ui/button"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import "./index.css"
import Minus from "./minus.svg"
import Plus from "./plus.svg"

type InputNumberControlsProps = Omit<ExtendableButtonProps<ElementType>, "rounded" | "onClick" | "disabled" | "size" | "icon">

type InputNumberProps = ComponentProps<"input"> &
  VariantProps<typeof inputNumberStyles> & {
    label?: string
    disableControls?: boolean
    controlsProps?: InputNumberControlsProps
    plusIcon?: ReactNode
    minusIcon?: ReactNode
    error?: string
    isFloat?: boolean
    step?: number
    denyNegative?: boolean
  }

export type ExtendableInputNumberProps<C extends ElementType> = ExtendableComponentProps<C, InputNumberProps>

export type InputNumberComponent = ForwardRefExoticComponent<ExtendableInputNumberProps<ElementType> & RefAttributes<ElementType>>

/**
 * A customizable and accessible Number Input component with increment/decrement controls.
 */
export const InputNumber: InputNumberComponent = forwardRef(
  <C extends ElementType>(
    {
      variant,
      height = "md",
      rounded,
      fontSize,
      fontWeight,
      className,
      disabled,
      placeholder,
      label,
      disableControls = false,
      controlsProps,
      plusIcon,
      minusIcon,
      onChange,
      error,
      isFloat = false,
      step = 1,
      denyNegative = false,
      ...props
    }: ExtendableInputNumberProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const inputId = props.id ?? Math.random().toString()

    const InputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        const value = e.target.value
        if (value !== "") {
          if (isFloat && (value === "-" || value === "." || value === "-.")) {
            onChange(e)
            return
          }
          if (!/^-?\d*\.?\d*$/.test(value)) {
            return
          }
          const numValue = parseFloat(value)
          if (!isNaN(numValue)) {
            if (denyNegative && numValue < 0) {
              e.target.value = "0"
            } else if (isFloat) {
              e.target.value = value
            } else {
              e.target.value = Math.round(numValue).toString()
            }
          }
        }
        onChange(e)
      }
    }

    const dispatchInputOnChangeEvent = (plus = false) => {
      const element = document.getElementById(inputId) as HTMLInputElement
      const currentValue = element.value ? parseFloat(element.value) : 0
      const operation = plus ? step : -step
      const newValue = isFloat ? Number((currentValue + operation).toFixed(10)) : currentValue + operation
      if (denyNegative && newValue < 0) {
        return
      }

      const formattedValue = isFloat ? newValue.toString() : Math.round(newValue).toString()

      InputOnChange({
        target: {
          value: formattedValue,
        } as EventTarget & HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>)

      element.value = formattedValue
    }

    return (
      <div className="inputNumberContainer flex relative flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className={cn("inputNumberLabel pl-0.5", inputNumberLabelStyles({ fontSize, fontWeight }))}>
            {label}
          </label>
        )}
        <div className="inputNumberContent flex relative w-full">
          {!disableControls && (
            <div className={`inputNumberLeftControlContainer select-none absolute left-1 top-1/2 -translate-y-1/2`}>
              <Button
                className={`inputNumberLeftControl`}
                variant={controlsProps?.variant ?? variant}
                rounded={rounded}
                disabled={disabled || (denyNegative && props.value ? parseFloat(props.value.toString()) - step < 0 : false)}
                size="icon-xs"
                onClick={() => dispatchInputOnChangeEvent(false)}
                {...controlsProps}
              >
                {minusIcon ? minusIcon : <Minus />}
              </Button>
            </div>
          )}
          <input
            id={inputId}
            type={isFloat ? "text" : "number"}
            disabled={disabled}
            placeholder={placeholder}
            ref={ref}
            onChange={InputOnChange}
            step={isFloat ? step : 1}
            min={denyNegative ? 0 : undefined}
            className={cn(
              `inputNumber w-full text-center ${minusIcon && "pl-8"} ${plusIcon && "pr-8"}`,
              inputNumberStyles({
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
          {!disableControls && (
            <div className={`inputNumberRightControlContainer select-none absolute right-1 top-1/2 -translate-y-1/2`}>
              <Button
                className={`inputNumberRightControl`}
                variant={controlsProps?.variant ?? variant}
                rounded={rounded}
                disabled={disabled}
                size="icon-xs"
                onClick={() => dispatchInputOnChangeEvent(true)}
                {...controlsProps}
              >
                {plusIcon ? plusIcon : <Plus />}
              </Button>
            </div>
          )}
        </div>
        {error && (
          <span className={cn("inputNumberError pl-0.5 text-red-500", inputNumberErrorStyles({ fontWeight }))}>{error}</span>
        )}
      </div>
    )
  }
)

InputNumber.displayName = "InputNumber"

const defaultInputNumber =
  "flex border px-3 py-2 focus-visible:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

export const inputNumberStyles = cva("", {
  variants: {
    variant: {
      primary: `${defaultInputNumber} focus-visible:border-primary`,
      secondary: `${defaultInputNumber} focus-visible:border-secondary`,
      outline: `${defaultInputNumber} border-primary focus-visible:border-secondary`,
      ghost: `${defaultInputNumber} focus-visible:ring-0`,
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

export const inputNumberLabelStyles = ({ fontSize, fontWeight }: Partial<InputNumberProps>) =>
  inputNumberStyles({
    variant: null,
    height: null,
    rounded: null,
    fontSize,
    fontWeight,
  })

export const inputNumberErrorStyles = ({ fontWeight }: Partial<InputNumberProps>) =>
  inputNumberStyles({
    variant: null,
    height: null,
    rounded: null,
    fontSize: "sm",
    fontWeight,
  })
