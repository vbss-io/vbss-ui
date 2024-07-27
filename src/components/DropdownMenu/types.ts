import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";
import { dropdownMenuStyles } from "./styles";

export type DropdownMenuComponentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;
export type DropdownMenuVariantProps = VariantProps<typeof dropdownMenuStyles>;
export type DropdownMenuExtraProps = {
  trigger: React.ReactNode;
  menus: {
    item: React.ReactNode | string;
  }[];
  menuLabel?: React.ReactNode | string;
  side?: "top" | "right" | "bottom" | "left";
};

export type DropdownMenuProps = DropdownMenuComponentProps &
  DropdownMenuVariantProps &
  DropdownMenuExtraProps;

export type DropdownMenuComponent = (
  props: DropdownMenuProps
) => React.ReactNode;
