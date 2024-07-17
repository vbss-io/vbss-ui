import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const dialogStyles = cva(
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
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      rounded: "md",
    },
  }
);

const borderStyle: { [key: string]: string } = {
  primary: "border border-secondary",
  secondary: "border border-primary",
  outline: "border border-primary",
  ghost: "border border-black",
};

const textStyle: { [key: string]: string } = {
  primary: "text-white",
  secondary: "text-white",
  outline: "text-primary",
  ghost: "text-black",
};

type DialogProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> &
  VariantProps<typeof dialogStyles> & {
    trigger: React.ReactNode;
    overlayOpacity?: number;
    border?: boolean;
    title?: React.ReactNode | string;
    description?: React.ReactNode | string;
    footer?: React.ReactNode | string;
    textColor?: boolean;
    showClose?: boolean;
  };

export const Dialog = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogProps
>(
  (
    {
      trigger,
      overlayOpacity = null,
      border,
      title,
      description,
      footer,
      textColor = true,
      showClose = true,
      variant,
      rounded,
      className,
      ...props
    },
    ref
  ) => (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={`fixed inset-0 z-50 bg-black/${overlayOpacity ?? 50}  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}
        />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            dialogStyles({ variant, rounded }),
            `${border && variant ? borderStyle[variant] : ""}`,
            `${textColor && variant ? textStyle[variant] : ""}`,
            className
          )}
          {...props}
        >
          {(title || description) && (
            <div className={"flex flex-col space-y-1.5 text-left"}>
              {title && (
                <DialogPrimitive.Title
                  className={
                    "text-lg font-semibold leading-none tracking-tight"
                  }
                >
                  {title}
                </DialogPrimitive.Title>
              )}
              {description && (
                <DialogPrimitive.Description className={"text-sm opacity-80"}>
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
          )}
          {props.children}
          {footer && (
            <div className={"w-full flex justify-end space-x-2"}>{footer}</div>
          )}
          {showClose && (
            <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70">
              <Icon icon="x" className="h-4 w-4" />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
);

Dialog.displayName = DialogPrimitive.Content.displayName;
