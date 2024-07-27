import { DivComponentProps, ExtendableComponentProps } from "@/lib/types";
import { VariantProps } from "class-variance-authority";
import { ElementType, ReactNode } from "react";
import { ExtendableChipProps } from "../Chip/types";
import { chipsStyles } from "./styles";

export type ChipsComponentProps = DivComponentProps;
export type ChipsVariantProps = VariantProps<typeof chipsStyles>;
export type ChipsExtraProps = {
  chips: string[] | number[] | ReactNode[];
  chipsProps?: ExtendableChipProps<ElementType>;
};

export type ChipsProps = ChipsComponentProps &
  ChipsVariantProps &
  ChipsExtraProps;

export type ExtendableChipsProps<C extends ElementType> =
  ExtendableComponentProps<C, ChipsProps>;

export type ChipsComponent = <C extends ElementType = "div">(
  props: ExtendableChipsProps<C>
) => ReactNode;
