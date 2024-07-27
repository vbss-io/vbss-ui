import { TableComponentProps as _TableComponentProps } from "@/lib/types";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { heightTable, tableStyles, variantTable } from "./styles";

type HeaderProps = {
  content: string;
  className?: string;
};

type FooterProps = {
  content: Array<string>;
  className?: string;
};

type RowProps = {
  [key: string]: string;
};

export type TableComponentProps = _TableComponentProps;
export type TableStylesVariantProps = VariantProps<typeof tableStyles>;
export type TableStylesVariantVariantProps = VariantProps<typeof variantTable>;
export type TableStylesVariantHeightProps = VariantProps<typeof heightTable>;
export type TableExtraProps = {
  headers?: Array<HeaderProps>;
  rows: Array<RowProps>;
  footer?: FooterProps;
};

export type TableProps = TableComponentProps &
  TableStylesVariantProps &
  TableStylesVariantVariantProps &
  TableStylesVariantHeightProps &
  TableExtraProps;

export type TableComponent = (props: TableProps) => ReactNode;
