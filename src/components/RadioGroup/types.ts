import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { IconsProps } from "../Icon/types";
import { radioStyles } from "./styles";

export type RadioValue = {
  value: string;
  label: string;
};

export type RadioComponentProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;
export type RadioVariantProps = VariantProps<typeof radioStyles>;
export type RadioExtraProps = {
  label?: string;
  icon?: IconsProps;
  values: RadioValue[];
  defaultValue?: string;
  itemProps?: Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    "value" | "id" | "key"
  >;
};

export type RadioProps = RadioComponentProps &
  RadioVariantProps &
  RadioExtraProps;

export type RadioComponent = (props: RadioProps) => ReactNode;
