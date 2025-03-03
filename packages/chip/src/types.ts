import { ExtendableComponentProps } from "vbss-ui-lib";
import { VariantProps } from "class-variance-authority";
import { ComponentProps, ElementType } from "react";
import { chipStyles } from "./styles";

export type ChipComponentProps = ComponentProps<'div'>;
export type ChipVariantProps = VariantProps<typeof chipStyles>;

export type ChipProps = ChipComponentProps & ChipVariantProps;

export type ExtendableChipProps<C extends ElementType> =
  ExtendableComponentProps<C, ChipProps>;

export type ChipComponent = <C extends ElementType = "div">(
  props: ExtendableChipProps<C>
) => JSX.Element | null;
  
