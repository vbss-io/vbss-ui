import { Button, ExtendableButtonProps } from "@vbss-ui/button"
import { cn, ExtendableComponentProps, PolymorphicComponent, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ChangeEvent, ComponentProps, ElementType, forwardRef, ReactNode, useCallback, useId, useRef } from "react"
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

export type InputNumberComponent = PolymorphicComponent<"input", InputNumberProps>

const setNativeInputValue = (element: HTMLInputElement, value: string) => {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(element, value)
}

/**
 * A customizable and accessible Number Input component with increment/decrement controls.
 */
export const InputNumber = forwardRef(
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
    const generatedId = useId()
    const inputId = props.id ?? generatedId
    const inputRef = useRef<HTMLInputElement | null>(null)
    const lastValidValue = useRef(props.value !== undefined ? String(props.value) : String(props.defaultValue ?? ""))

    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          Object.assign(ref, { current: node })
        }
      },
      [ref]
    )

    const InputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (value !== "") {
        if (isFloat && (value === "-" || value === "." || value === "-.")) {
          lastValidValue.current = value
          onChange?.(e)
          return
        }
        if (!/^-?\d*\.?\d*$/.test(value)) {
          e.target.value = props.value !== undefined ? String(props.value) : lastValidValue.current
          return
        }
        const numValue = parseFloat(value)
        if (!isNaN(numValue)) {
          if (denyNegative && numValue < 0) {
            e.target.value = "0"
          } else if (!isFloat) {
            e.target.value = Math.round(numValue).toString()
          }
        }
      }
      lastValidValue.current = e.target.value
      onChange?.(e)
    }

    const dispatchInputOnChangeEvent = (plus = false) => {
      const element = inputRef.current
      if (!element) {
        return
      }
      const currentValue = element.value ? parseFloat(element.value) : 0
      const operation = plus ? step : -step
      const newValue = isFloat ? Number((currentValue + operation).toFixed(10)) : currentValue + operation
      if (denyNegative && newValue < 0) {
        return
      }

      const formattedValue = isFloat ? newValue.toString() : Math.round(newValue).toString()

      setNativeInputValue(element, formattedValue)
      element.dispatchEvent(new Event("input", { bubbles: true }))
    }

    const minusDisabledByLimit = denyNegative && props.value !== undefined && props.value !== "" && Number(props.value) - step < 0

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
                {...controlsProps}
                className={cn("inputNumberLeftControl", controlsProps?.className)}
                variant={controlsProps?.variant ?? variant}
                rounded={rounded}
                disabled={disabled || minusDisabledByLimit}
                size="icon-xs"
                onClick={() => dispatchInputOnChangeEvent(false)}
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
            ref={setInputRef}
            onChange={InputOnChange}
            step={isFloat ? step : 1}
            min={denyNegative ? 0 : undefined}
            className={cn(
              "inputNumber w-full text-center",
              minusIcon ? "pl-8" : false,
              plusIcon ? "pr-8" : false,
              inputNumberStyles({
                variant,
                height,
                rounded,
                fontSize,
                fontWeight,
                disabled,
                className,
              })
            )}
            {...props}
          />
          {!disableControls && (
            <div className={`inputNumberRightControlContainer select-none absolute right-1 top-1/2 -translate-y-1/2`}>
              <Button
                {...controlsProps}
                className={cn("inputNumberRightControl", controlsProps?.className)}
                variant={controlsProps?.variant ?? variant}
                rounded={rounded}
                disabled={disabled}
                size="icon-xs"
                onClick={() => dispatchInputOnChangeEvent(true)}
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
) as InputNumberComponent

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
