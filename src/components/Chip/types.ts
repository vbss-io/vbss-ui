import { DivComponentProps, ExtendableComponentProps } from "@/lib/types";
import { VariantProps } from "class-variance-authority";
import { ElementType, ReactNode } from "react";
import { chipStyles } from "./styles";

export type ChipComponentProps = DivComponentProps;
export type ChipVariantProps = VariantProps<typeof chipStyles>;

export type ChipProps = ChipComponentProps & ChipVariantProps;

export type ExtendableChipProps<C extends ElementType> =
  ExtendableComponentProps<C, ChipProps>;

export type ChipComponent = <C extends ElementType = "div">(
  props: ExtendableChipProps<C>
) => ReactNode;
