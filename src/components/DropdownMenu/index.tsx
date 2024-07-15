import { cn } from "@/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const dropdownMenuStyles = cva(
  "flex flex-col gap-1 z-50 overflow-hidden bg-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        outline: "bg-background border border-primary text-primary",
        ghost: "bg-white border border-black text-black",
      },
      size: {
        sm: "px-2.5 py-0.5",
        md: "px-3 py-1",
        lg: "px-4 py-2",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      fontSize: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      fontSize: "md",
    },
  }
);

const separatorStyle: { [key: string]: string } = {
  primary: "bg-white",
  secondary: "bg-white",
  outline: "bg-primary",
  ghost: "bg-black",
};

type DropdownMenuProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> &
  VariantProps<typeof dropdownMenuStyles> & {
    trigger: React.ReactNode;
    menus: {
      item: React.ReactNode | string;
    }[];
    menuLabel?: React.ReactNode | string;
    side?: "top" | "right" | "bottom" | "left";
  };

export const DropdownMenu = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuProps
>(
  (
    {
      trigger,
      menuLabel,
      menus,
      side,
      variant,
      size,
      rounded,
      fontSize,
      className,
      ...props
    },
    ref
  ) => (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          sideOffset={4}
          className={cn(
            "min-w-[8rem] text-center overflow-hidden shadow-md",
            className,
            dropdownMenuStyles({
              variant,
              size,
              rounded,
              fontSize,
              className,
            })
          )}
          side={side}
          {...props}
        >
          {menuLabel && (
            <DropdownMenuPrimitive.Label
              className={cn(
                dropdownMenuStyles({
                  variant,
                }),
                "border-0 font-bold"
              )}
            >
              {menuLabel}
            </DropdownMenuPrimitive.Label>
          )}
          {menus.map((menu, index) => {
            if (menu.item === "separator") {
              return (
                <DropdownMenuPrimitive.Separator
                  className={cn(
                    "-mx-1 my-1 h-px",
                    separatorStyle[variant ?? "primary"]
                  )}
                  key={index}
                />
              );
            }
            return (
              <DropdownMenuPrimitive.Item key={index} className="w-full">
                {menu.item}
              </DropdownMenuPrimitive.Item>
            );
          })}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
);

DropdownMenu.displayName = DropdownMenuPrimitive.Content.displayName;
