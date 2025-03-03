import { ExtendableComponentProps } from "vbss-ui-lib";
import { VariantProps } from "class-variance-authority";
import { ComponentProps, ElementType, ForwardRefExoticComponent, RefAttributes } from "react";
import { chipStyles } from "./styles";

type ChipComponentProps = ComponentProps<"div">;
type ChipVariantProps = VariantProps<typeof chipStyles>;

type ChipProps = ChipComponentProps & ChipVariantProps;

export type ExtendableChipProps<C extends ElementType> =
  ExtendableComponentProps<C, ChipProps>;

export type ChipComponent = ForwardRefExoticComponent<
  ExtendableChipProps<ElementType> & RefAttributes<ElementType>
>;