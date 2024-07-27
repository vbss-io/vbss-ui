import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { dialogBorderStyle, dialogStyles, dialogTextStyle } from "./styles";
import { DialogComponent, DialogProps } from "./types";

export const Dialog: DialogComponent = forwardRef<
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
            `${border && variant ? dialogBorderStyle[variant] : ""}`,
            `${textColor && variant ? dialogTextStyle[variant] : ""}`,
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
