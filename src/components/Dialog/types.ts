import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";
import { dialogStyles } from "./styles";

export type DialogComponentProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
>;
export type DialogVariantProps = VariantProps<typeof dialogStyles>;
export type DialogExtraProps = {
  trigger: React.ReactNode;
  overlayOpacity?: number;
  border?: boolean;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  textColor?: boolean;
  showClose?: boolean;
};

export type DialogProps = DialogComponentProps &
  DialogVariantProps &
  DialogExtraProps;

export type DialogComponent = (props: DialogProps) => React.ReactNode;
