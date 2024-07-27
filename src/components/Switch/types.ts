import { IconsProps } from "@/components/Icon/types";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { switchStyles } from "./styles";

export type SwitchComponentProps = ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
>;
export type SwitchVariantProps = VariantProps<typeof switchStyles>;
export type SwitchExtraProps = {
  onChange?: (checked: boolean) => void;
  iconOn?: IconsProps;
  iconOff?: IconsProps;
  label?: string;
};

export type SwitchProps = SwitchComponentProps &
  SwitchVariantProps &
  SwitchExtraProps;

export type SwitchComponent = (props: SwitchProps) => ReactNode;
