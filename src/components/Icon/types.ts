import { IconsMap } from "@/components/Icons";
import { DivComponentProps, ExtendableComponentProps } from "@/lib/types";
import { ElementType, ReactNode } from "react";

export type IconsProps = keyof typeof IconsMap;
export type IconExtraProps = { icon: IconsProps };

export type IconProps = DivComponentProps & IconExtraProps;

export type ExtendableIconProps<C extends ElementType> =
  ExtendableComponentProps<C, IconProps>;

export type IconComponent = <C extends ElementType = "div">(
  props: ExtendableIconProps<C>
) => ReactNode;
