import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from "@radix-ui/react-dialog"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import "./index.css"
import X from "./x.svg"

export type DialogProps = ComponentPropsWithoutRef<typeof Content> &
  VariantProps<typeof dialogStyles> & {
    trigger?: ReactNode
    overlayOpacity?: number
    border?: boolean
    title?: ReactNode
    description?: ReactNode
    footer?: ReactNode
    disableTextColor?: boolean
    hideClose?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }

export type ExtendableDialogProps<C extends ElementType> = ExtendableComponentProps<C, DialogProps>

export type DialogComponent = ForwardRefExoticComponent<ExtendableDialogProps<ElementType> & RefAttributes<ElementType>>

/**
 * A customizable and accessible Dialog component with support for triggers, overlays, and various content sections.
 */
export const Dialog: DialogComponent = forwardRef(
  <C extends ElementType>(
    {
      trigger = <div />,
      overlayOpacity = 50,
      border,
      title = "",
      description = "",
      footer,
      disableTextColor = false,
      hideClose = false,
      variant = "primary",
      rounded,
      className,
      open,
      onOpenChange,
      ...props
    }: ExtendableDialogProps<C>,
    ref?: PolymorphicRef<C>
  ) => (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger className="dialogTrigger">{trigger}</Trigger>
      <Portal>
        <Overlay
          className={cn(
            "dialogOverlay fixed inset-0 z-50 bg-black",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
          style={{ opacity: overlayOpacity / 100 }}
        />
        <Content
          ref={ref}
          className={cn(
            "dialogContent",
            dialogStyles({ variant, rounded }),
            `${border && variant ? dialogBorderStyle[variant] : ""}`,
            `${!disableTextColor && variant ? dialogTextStyle[variant] : ""}`,
            className
          )}
          {...props}
        >
          <div className={"dialogInfo flex flex-col space-y-1.5 text-left"}>
            <Title className={"dialogTitle text-lg font-semibold leading-none tracking-tight"}>{title}</Title>
            {description && <Description className={"dialogDescription text-sm opacity-80"}>{description}</Description>}
          </div>
          {props.children}
          {footer && <div className={"dialogFooter w-full flex justify-end space-x-2"}>{footer}</div>}
          {!hideClose && (
            <Close className="dialogCloseContainer absolute right-4 top-4 opacity-70">
              <X className="dialogCloseIcon h-4 w-4" />
            </Close>
          )}
        </Content>
      </Portal>
    </Root>
  )
)

Dialog.displayName = "Dialog"

export const dialogStyles = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        outline: "bg-background border border-primary",
        ghost: "bg-white",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      rounded: "md",
    },
  }
)

export const dialogBorderStyle: { [key: string]: string } = {
  primary: "border border-secondary",
  secondary: "border border-primary",
  outline: "border border-primary",
  ghost: "border border-black",
}

export const dialogTextStyle: { [key: string]: string } = {
  primary: "text-white",
  secondary: "text-white",
  outline: "text-primary",
  ghost: "text-black",
}
