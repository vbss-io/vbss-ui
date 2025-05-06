import { Content, Item, Label, Portal, Root, Separator, Trigger } from "@radix-ui/react-dropdown-menu"
import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import "./index.css"

export type DropdownMenuProps = ComponentPropsWithoutRef<typeof Content> &
  VariantProps<typeof dropdownMenuStyles> & {
    trigger?: ReactNode
    menus?: {
      item: ReactNode
    }[]
    menuLabel?: ReactNode
    side?: "top" | "right" | "bottom" | "left"
  }

export type ExtendableDropdownMenuProps<C extends ElementType> = ExtendableComponentProps<C, DropdownMenuProps>

export type DropdownMenuComponent = ForwardRefExoticComponent<
  ExtendableDropdownMenuProps<ElementType> & RefAttributes<ElementType>
>

/**
 * A customizable and accessible Dropdown Menu component.
 */
export const DropdownMenu: DropdownMenuComponent = forwardRef(
  <C extends ElementType>(
    {
      trigger = <div />,
      menuLabel,
      menus = [],
      side = "top",
      variant,
      size,
      rounded,
      fontSize,
      fontWeight,
      className,
      ...props
    }: ExtendableDropdownMenuProps<C>,
    ref?: PolymorphicRef<C>
  ) => (
    <Root>
      <Trigger className="dropdownMenuTrigger">{trigger}</Trigger>
      <Portal>
        <Content
          ref={ref}
          sideOffset={4}
          className={cn(
            "dropdownMenuContent min-w-[8rem] text-center overflow-hidden shadow-md",
            className,
            dropdownMenuStyles({
              variant,
              size,
              rounded,
              fontSize,
              fontWeight,
              className,
            })
          )}
          side={side}
          {...props}
        >
          {menuLabel && (
            <Label
              className={cn(
                "dropdownMenuLabel border-0 font-bold",
                dropdownMenuStyles({
                  variant,
                })
              )}
            >
              {menuLabel}
            </Label>
          )}
          {menus.map((menu, index) => {
            if (menu.item === "separator") {
              return (
                <Separator
                  className={cn("dropdownMenuSeparator -mx-1 my-1 h-px", dropdownMenuSeparatorStyle[variant ?? "primary"])}
                  key={index}
                />
              )
            }
            return (
              <Item key={`${menu.item}-${index}`} className="dropdownMenuItem w-full">
                {menu.item}
              </Item>
            )
          })}
        </Content>
      </Portal>
    </Root>
  )
)

DropdownMenu.displayName = "DropdownMenu"

export const dropdownMenuStyles = cva(
  "flex flex-col gap-1 z-50 overflow-hidden bg-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        outline: "bg-white border border-primary text-primary",
        ghost: "bg-white border border-black text-black",
      },
      size: {
        xs: "px-2 py-0.5",
        sm: "px-2.5 py-0.5",
        md: "px-3 py-1",
        lg: "px-4 py-2",
        xl: "px-6 py-3",
      },
      rounded: {
        none: "rounded-none",
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
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      fontSize: "md",
      fontWeight: "normal",
    },
  }
)

export const dropdownMenuSeparatorStyle: { [key: string]: string } = {
  primary: "bg-white",
  secondary: "bg-white",
  outline: "bg-primary",
  ghost: "bg-black",
}
