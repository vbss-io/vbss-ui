import { VariantProps } from "class-variance-authority";
import { ComponentProps, ElementType, ReactNode } from "react";
import { ExtendableButtonProps } from "../Button/types";
import { inputStyles } from "./styles";

export type InputComponentProps = ComponentProps<"input">;
export type InputVariantProps = VariantProps<typeof inputStyles>;
export type InputExtraProps = {
  type?: "text" | "password" | "number";
  label?: string;
  showPasswordSwitch?: boolean;
  buttonProps?: ExtendableButtonProps<ElementType>;
  error?: string;
};

export type InputProps = InputComponentProps &
  InputVariantProps &
  InputExtraProps;

export type InputComponent = (props: InputProps) => ReactNode;
