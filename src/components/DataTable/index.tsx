import { Button } from "@/components/Button";
import { DropdownMenu } from "@/components/DropdownMenu";
import { cn } from "@/lib/utils";
import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "../Input";
import { DataTableColumnHeader as DataTableColumnHeaderComponent } from "./header";
import {
  headerStyles,
  heightStyles,
  rowStyles,
  tableStyles,
  variantStyles,
} from "./styles";
import { DataTableComponent, DataTableProps } from "./types";

export const DataTable: DataTableComponent = <TData, TValue>({
  variant = "primary",
  height,
  rounded,
  outBorder = true,
  fontSize,
  headers,
  rows,
  paginationProps,
  filterProps = null,
  columnToggleProps = null,
  ...props
}: DataTableProps<TData, TValue>) => {
  const {
    previousText,
    nextText,
    pageSize,
    pageIndex,
    ...paginationButtonProps
  } = paginationProps ?? {};
  const { columnId, ...filterInputProps } = filterProps ?? {};
  const { title, ...columnToggleButtonProps } = columnToggleProps ?? {};
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: rows,
    columns: headers ?? [],
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
        pageSize: pageSize ?? 10,
        pageIndex: pageIndex ?? 0,
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
      {(columnId || columnToggleProps) && (
        <div className="flex gap-4 items-center justify-between">
          {columnId && (
            <Input
              placeholder={filterProps?.placeholder ?? "Search..."}
              value={
                (table.getColumn(columnId)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(columnId)?.setFilterValue(event.target.value)
              }
              {...filterInputProps}
            />
          )}

          {columnToggleProps && (
            <DropdownMenu
              className="flex items-start"
              trigger={
                <Button
                  as="span"
                  {...columnToggleButtonProps}
                  icon="sliders-horizontal"
                >
                  {title ?? "Columns"}
                </Button>
              }
              menus={toggleColumn}
              variant={variant ?? "primary"}
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
            variantStyles({ variant, fontSize })
          )}
          {...props}
        >
          <thead className={cn("[&_tr]:border-b")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className={cn(
                  "border-b transition-colors",
                  variant && rowStyles[variant]
                )}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={cn(
                        "px-4 text-left align-middle font-semibold [&:has([role=checkbox])]:pr-0",
                        variant && headerStyles[variant],
                        heightStyles({ height })
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
                    variant && rowStyles[variant]
                  )}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        "px-4 align-middle [&:has([role=checkbox])]:pr-0",
                        heightStyles({ height })
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
                  {...paginationButtonProps}
                >
                  {previousText ?? "Previous"}
                </Button>
                <Button
                  variant={
                    paginationProps.variant ? paginationProps.variant : variant
                  }
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  {...paginationButtonProps}
                >
                  {nextText ?? "Next"}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const DataTableColumnHeader = DataTableColumnHeaderComponent;
