import { IconsProps } from "@/components/Icon/types";
import { Root as CheckboxPrimitiveRoot } from "@radix-ui/react-checkbox";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { inputStyles } from "./styles";

export type CheckboxComponentProps = ComponentPropsWithoutRef<
  typeof CheckboxPrimitiveRoot
>;
export type CheckboxVariantProps = VariantProps<typeof inputStyles>;
export type CheckboxExtraProps = { label?: string; icon?: IconsProps };

export type CheckboxProps = CheckboxComponentProps &
  CheckboxVariantProps &
  CheckboxExtraProps;

export type CheckboxComponent = (props: CheckboxProps) => ReactNode;
