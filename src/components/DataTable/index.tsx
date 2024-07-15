import { Button, ButtonProps } from "@/components/Button";
import { DropdownMenu } from "@/components/DropdownMenu";
import { cn } from "@/lib/utils";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, useState } from "react";
import { Input } from "../Input";

const variantTable = cva("text-black", {
  variants: {
    variant: {
      primary: ``,
      secondary: ``,
      outline: ``,
      ghost: ``,
    },
    fontSize: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-md",
    },
  },
  defaultVariants: {
    variant: "primary",
    fontSize: "md",
  },
});

const heightTable = cva("", {
  variants: {
    height: {
      sm: "h-8",
      md: "h-10",
      lg: "h-14",
    },
  },
  defaultVariants: {
    height: "md",
  },
});

const tableStyles = cva("", {
  variants: {
    variant: {
      primary: ``,
      secondary: ``,
      outline: `border-primary`,
      ghost: ``,
    },
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
    outBorder: {
      true: "border",
    },
  },
  defaultVariants: {
    variant: "primary",
    rounded: "lg",
    outBorder: false,
  },
});

const headerStyle: { [key: string]: string } = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  outline: "bg-white text-primary",
};

const rowStyle: { [key: string]: string } = {
  primary: "hover:bg-secondary/5 data-[state=selected]:bg-secondary/10",
  secondary: "hover:bg-primary/5 data-[state=selected]:bg-primary/10",
  outline:
    "border-primary hover:bg-secondary/5 data-[state=selected]:bg-primary/10",
  ghost: "hover:bg-secondary/5 data-[state=selected]:bg-primary/10",
};

type DataTableProps<TData, TValue> = {
  headers: ColumnDef<TData, TValue>[];
  rows: TData[];
  paginationProps?:
    | (Omit<ButtonProps, "onClick" | "disabled"> & {
        previousText?: string;
        nextText?: string;
        pageSize?: number;
        pageIndex?: number;
      })
    | null;
  filterProps?:
    | (Omit<ComponentProps<typeof Input>, "value" | "onChange" | "type"> & {
        columnId: string;
      })
    | null;
  columnToggleProps?:
    | (Omit<ComponentProps<typeof Button>, "onClick" | "icon"> & {
        title?: string;
      })
    | null;
} & ComponentProps<"table"> &
  VariantProps<typeof tableStyles> &
  VariantProps<typeof variantTable> &
  VariantProps<typeof heightTable>;

export function DataTable<TData, TValue>({
  variant = "primary",
  height,
  rounded,
  outBorder = true,
  fontSize,
  headers,
  rows,
  paginationProps = null,
  filterProps = null,
  columnToggleProps = null,
  ...props
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: rows,
    columns: headers || [],
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: paginationProps
      ? getPaginationRowModel()
      : undefined,
    initialState: {
      pagination: {
        pageSize: paginationProps?.pageSize || 10,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  const toggleColumn: { item: React.ReactNode | string }[] = [];

  table.getAllColumns().forEach((column) => {
    toggleColumn.push({
      item: (
        <Button
          className={`flex w-full ${column.getIsVisible() ? "justify-between" : "justify-end"}`}
          onClick={() => column.toggleVisibility()}
          icon={column.getIsVisible() ? "check" : undefined}
          variant="ghost"
          inverted={true}
        >
          {column.id}
        </Button>
      ),
    });
  });

  return (
    <div className="flex flex-col gap-4">
      {(filterProps || columnToggleProps) && (
        <div className="flex gap-4 items-center justify-between">
          {filterProps && (
            <Input
              placeholder={filterProps.placeholder || "Buscar..."}
              value={
                (table
                  .getColumn(filterProps.columnId)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(filterProps.columnId)
                  ?.setFilterValue(event.target.value)
              }
              {...filterProps}
            />
          )}

          {columnToggleProps && (
            <DropdownMenu
              className="flex items-start"
              trigger={
                <Button {...columnToggleProps} icon="sliders-horizontal">
                  {columnToggleProps.title ?? "Columns"}
                </Button>
              }
              menus={toggleColumn}
              variant={variant || "primary"}
            />
          )}
        </div>
      )}
      <div
        className={cn(
          "relative w-full overflow-auto",
          tableStyles({ variant, rounded, outBorder })
        )}
      >
        <table
          className={cn(
            "w-full caption-bottom",
            variantTable({ variant, fontSize })
          )}
          {...props}
        >
          <thead className={cn("[&_tr]:border-b")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className={cn(
                  "border-b transition-colors",
                  variant && rowStyle[variant]
                )}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={cn(
                        "px-4 text-left align-middle font-semibold [&:has([role=checkbox])]:pr-0",
                        variant && headerStyle[variant],
                        heightTable({ height })
                      )}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className={cn("[&_tr:last-child]:border-0")}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  className={cn(
                    "border-b transition-colors",
                    variant && rowStyle[variant]
                  )}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        "px-4 align-middle [&:has([role=checkbox])]:pr-0",
                        heightTable({ height })
                      )}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={rows.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {(paginationProps ||
          !!headers?.find((header) => header.id === "select")) && (
          <div className="flex items-center justify-end space-x-2 py-4 p-4">
            {!!headers?.find((header) => header.id === "select") && (
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} /{" "}
                {table.getFilteredRowModel().rows.length}
              </div>
            )}
            {paginationProps && (
              <>
                <Button
                  variant={variant}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  {...paginationProps}
                >
                  {paginationProps.previousText || "Previous"}
                </Button>
                <Button
                  variant={
                    paginationProps.variant ? paginationProps.variant : variant
                  }
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  {...paginationProps}
                >
                  {paginationProps.nextText || "Next"}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  menuLabel?: string;
  headerProps?: Omit<ComponentProps<typeof Button>, "onClick" | "icon">;
  itemsProps?: Omit<ComponentProps<typeof Button>, "onClick" | "icon">;
  itemsToHide?: ["asc" | "desc" | "clear" | "hide"];
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  menuLabel,
  headerProps,
  itemsProps,
  itemsToHide,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const icon =
    column.getIsSorted() === "desc"
      ? "arrow-down"
      : column.getIsSorted() === "asc"
        ? "arrow-up"
        : "arrows-down-up";

  const menus = [];

  !itemsToHide?.includes("asc") &&
    menus.push({
      item: (
        <Button
          className="flex w-full items-center"
          onClick={() => column.toggleSorting(false)}
          icon="arrow-up"
          inverted={true}
          variant={itemsProps?.variant || "ghost"}
          {...itemsProps}
        >
          Asc
        </Button>
      ),
    });

  !itemsToHide?.includes("desc") &&
    menus.push({
      item: (
        <Button
          className="flex w-full items-center"
          onClick={() => column.toggleSorting(true)}
          icon="arrow-down"
          inverted={true}
          variant={itemsProps?.variant || "ghost"}
          {...itemsProps}
        >
          Desc
        </Button>
      ),
    });

  !itemsToHide?.includes("clear") &&
    menus.push({
      item: (
        <Button
          className="flex w-full items-center"
          onClick={() => column.toggleSorting(undefined)}
          icon="arrows-down-up"
          inverted={true}
          variant={itemsProps?.variant || "ghost"}
          {...itemsProps}
        >
          Limpar
        </Button>
      ),
    });

  !itemsToHide?.includes("hide") &&
    menus.push({
      item: "separator",
    }) &&
    menus.push({
      item: (
        <Button
          className="flex w-full items-center"
          onClick={() => column.toggleVisibility(false)}
          icon="eye-slash"
          inverted={true}
          variant={itemsProps?.variant || "ghost"}
          {...itemsProps}
        >
          Esconder
        </Button>
      ),
    });

  return (
    <DropdownMenu
      menuLabel={menuLabel}
      trigger={
        <Button
          className="border-0 bg-transparent hover:bg-transparent"
          icon={icon}
          inverted={true}
          {...headerProps}
        >
          {title}
        </Button>
      }
      menus={menus}
    />
  );
}
