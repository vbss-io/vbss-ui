import { Button, ExtendableButtonProps } from "@vbss-ui/button"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import "./index.css"

type InputNumberControlsProps = Omit<ExtendableButtonProps<ElementType>, "rounded" | "onClick" | "disabled" | "size" | "icon">

type InputNumberProps = ComponentProps<"input"> &
  VariantProps<typeof inputNumberStyles> & {
    label?: string
    controlsProps?: InputNumberControlsProps
    plusIcon?: ReactNode
    minusIcon?: ReactNode
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
      controlsProps,
      plusIcon,
      minusIcon,
      onChange,
      ...props
    }: ExtendableInputNumberProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const inputId = props.id ?? Math.random().toString()

    const InputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e)
      }
    }

    const dispatchInputOnChangeEvent = (plus = false) => {
      const element = document.getElementById(inputId) as HTMLInputElement
      const operation = plus ? 1 : -1
      InputOnChange({
        target: {
          value: String(Number(element.value) - operation),
        } as EventTarget & HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>)

      element.value = String(Number(element.value) - operation)
    }

    return (
      <div className="inputNumberContainer flex relative flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className={cn("inputNumberLabel pl-0.5", inputNumberLabelStyles({ fontSize, fontWeight }))}>
            {label}
          </label>
        )}
        <div className="inputNumberContent flex relative w-full">
          {minusIcon && (
            <div className={`inputNumberLeftControlContainer select-none absolute left-1 top-1/2 -translate-y-1/2`}>
              <Button
                className={`inputNumberLeftControl`}
                variant={controlsProps?.variant ?? variant}
                rounded={rounded}
                disabled={disabled}
                size="icon-xs"
                onClick={() => dispatchInputOnChangeEvent(true)}
                {...controlsProps}
              >
                {minusIcon}
              </Button>
            </div>
          )}
          <input
            id={inputId}
            type="number"
            disabled={disabled}
            placeholder={placeholder}
            ref={ref}
            onChange={InputOnChange}
            className={cn(
              `inputNumber text-center ${minusIcon && "pl-8"} ${plusIcon && "pr-8"}`,
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
          {plusIcon && (
            <div className={`inputNumberRightControlContainer select-none absolute right-1 top-1/2 -translate-y-1/2`}>
              <Button
                className={`inputNumberRightControl`}
                variant={controlsProps?.variant ?? variant}
                rounded={rounded}
                disabled={disabled}
                size="icon-xs"
                onClick={() => dispatchInputOnChangeEvent(false)}
                {...controlsProps}
              >
                {plusIcon}
              </Button>
            </div>
          )}
        </div>
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
