import { ExtendableButtonProps } from "@/components/Button/types";
import { InputProps } from "@/components/Input/types";
import { TableComponentProps } from "@/lib/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { VariantProps } from "class-variance-authority";
import { ElementType, ReactNode } from "react";
import { heightStyles, tableStyles, variantStyles } from "./styles";

export type DataTableComponentProps = TableComponentProps;
export type DataTableStylesVariantProps = VariantProps<typeof tableStyles>;
export type DataTableVariantVariantProps = VariantProps<typeof variantStyles>;
export type DataTableHeightVariantProps = VariantProps<typeof heightStyles>;
export type DataTableExtraProps<TData, TValue> = {
  headers: ColumnDef<TData, TValue>[];
  rows: TData[];
  paginationProps?:
    | (Omit<ExtendableButtonProps<ElementType>, "onClick" | "disabled"> & {
        previousText?: string;
        nextText?: string;
        pageSize?: number;
        pageIndex?: number;
      })
    | null;
  filterProps?:
    | (Omit<InputProps, "value" | "onChange" | "type"> & {
        columnId: string;
      })
    | null;
  columnToggleProps?:
    | (Omit<ExtendableButtonProps<ElementType>, "onClick" | "icon"> & {
        title?: string;
      })
    | null;
};

export type DataTableProps<TData, TValue> = DataTableComponentProps &
  DataTableStylesVariantProps &
  DataTableVariantVariantProps &
  DataTableHeightVariantProps &
  DataTableExtraProps<TData, TValue>;

export type DataTableComponent = <TData, TValue>(
  props: DataTableProps<TData, TValue>
) => ReactNode;

export type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  menuLabel?: string;
  headerProps?: Omit<ExtendableButtonProps<ElementType>, "onClick" | "icon">;
  itemsProps?: Omit<ExtendableButtonProps<ElementType>, "onClick" | "icon">;
  itemsToHide?: ["asc" | "desc" | "clear" | "hide"];
};

export type DataTableColumnHeaderComponent = <TData, TValue>(
  props: DataTableColumnHeaderProps<TData, TValue>
) => ReactNode;
