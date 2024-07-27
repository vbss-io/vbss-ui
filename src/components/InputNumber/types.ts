import { VariantProps } from "class-variance-authority";
import { ComponentProps, ElementType, ReactNode } from "react";
import { ExtendableButtonProps } from "../Button/types";
import { inputNumberStyles } from "./styles";

export type InputNumberComponentsProps = ComponentProps<"input">;
export type InputNumberVariantProps = VariantProps<typeof inputNumberStyles>;
export type InputNumberExtraProps = {
  label?: string;
  controlsProps?: Omit<
    ExtendableButtonProps<ElementType>,
    "rounded" | "onClick" | "disabled" | "size" | "icon"
  >;
};

export type InputNumberProps = InputNumberComponentsProps &
  InputNumberVariantProps &
  InputNumberExtraProps;

export type InputNumberComponent = (props: InputNumberProps) => ReactNode;
