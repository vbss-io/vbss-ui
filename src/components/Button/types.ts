import { IconsProps } from "@/components/Icon/types";
import { ExtendableComponentProps } from "@/lib/types";
import { VariantProps } from "class-variance-authority";
import { ComponentProps, ElementType, ReactNode } from "react";
import { buttonStyles } from "./styles";

export type ButtonComponentProps = ComponentProps<"button">;
export type ButtonVariantProps = VariantProps<typeof buttonStyles>;
export type ButtonExtraProps = { icon?: IconsProps };

export type ButtonProps = ButtonComponentProps &
  ButtonVariantProps &
  ButtonExtraProps;

export type ExtendableButtonProps<C extends ElementType> =
  ExtendableComponentProps<C, ButtonProps>;

export type ButtonComponent = <C extends ElementType = "button">(
  props: ExtendableButtonProps<C>
) => ReactNode;
