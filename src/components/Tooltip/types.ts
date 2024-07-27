import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { tooltipStyles } from "./styles";

export type TooltipComponentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
>;
export type TooltipVariantProps = VariantProps<typeof tooltipStyles>;
export type TooltipExtraProps = {
  trigger: ReactNode;
};

export type TooltipProps = TooltipComponentProps &
  TooltipVariantProps &
  TooltipExtraProps;

export type TooltipComponent = (props: TooltipProps) => ReactNode;
