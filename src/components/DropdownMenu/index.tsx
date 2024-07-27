import { cn } from "@/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import { dropdownMenuSeparatorStyle, dropdownMenuStyles } from "./styles";
import { DropdownMenuComponent, DropdownMenuProps } from "./types";

export const DropdownMenu: DropdownMenuComponent = forwardRef<
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
                    dropdownMenuSeparatorStyle[variant ?? "primary"]
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
