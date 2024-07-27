import { Content as PopoverPrimitiveContent } from "@radix-ui/react-popover";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { popoverStyles } from "./styles";

export type PopoverComponentProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitiveContent
>;
export type PopoverVariantProps = VariantProps<typeof popoverStyles>;
export type PopoverExtraProps = {
  trigger: ReactNode;
};

export type PopoverProps = PopoverComponentProps &
  PopoverVariantProps &
  PopoverExtraProps;

export type PopoverComponent = (props: PopoverProps) => ReactNode;
