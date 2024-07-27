import { VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";
import { textareaStyles } from "./styles";

export type TextAreaComponentProps = ComponentProps<"textarea">;
export type TextAreaVariantProps = VariantProps<typeof textareaStyles>;
export type TextAreaExtraProps = {
  label?: string;
};

export type TextAreaProps = TextAreaComponentProps &
  TextAreaVariantProps &
  TextAreaExtraProps;

export type TextAreaComponent = (props: TextAreaProps) => ReactNode;
