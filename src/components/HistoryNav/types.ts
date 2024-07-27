import { ExtendableButtonProps } from "@/components/Button/types";
import { DivComponentProps, ExtendableComponentProps } from "@/lib/types";
import { VariantProps } from "class-variance-authority";
import { ElementType, ReactNode } from "react";
import { historyNavStyles } from "./styles";

export type HistoryNavComponentProps = DivComponentProps;
export type HistoryNavVariantProps = VariantProps<typeof historyNavStyles>;
export type HistoryNavExtraProps = {
  arrow?: "arrow-arc" | "arrow-circle" | "arrow" | "arrow-square" | "caret";
  buttonsProps?: Omit<
    ExtendableButtonProps<ElementType>,
    "onClick" | "icon"
  > & {
    size?: "icon-sm" | "icon-md" | "icon-lg";
  };
  backOnClick: () => void;
  forwardOnClick?: () => void;
};

export type HistoryNavProps = HistoryNavComponentProps &
  HistoryNavVariantProps &
  HistoryNavExtraProps;

export type ExtendableHistoryNavProps<C extends ElementType> =
  ExtendableComponentProps<C, HistoryNavProps>;

export type HistoryNavComponent = <C extends ElementType = "div">(
  props: ExtendableHistoryNavProps<C>
) => ReactNode;
