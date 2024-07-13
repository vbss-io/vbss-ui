import { Button, ButtonProps } from "@/components/Button";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, useState } from "react";

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
  headers?: ColumnDef<TData, TValue>[];
  rows: TData[];
  paginationProps?:
    | (Omit<ButtonProps, "onClick" | "disabled"> & {
        previousText?: string;
        nextText?: string;
        pageSize?: number;
        pageIndex?: number;
      })
    | null;
} & ComponentProps<"table"> &
  VariantProps<typeof tableStyles> &
  VariantProps<typeof variantTable> &
  VariantProps<typeof heightTable>;

export function DataTable<TData, TValue>({
  variant,
  height,
  rounded,
  outBorder = true,
  fontSize,
  headers,
  rows,
  paginationProps = null,
  ...props
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: rows,
    columns: headers || [],
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
    },
  });

  return (
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
        {headers && (
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
        )}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      {paginationProps && (
        <div className="flex items-center justify-end space-x-2 py-4 p-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} /{" "}
            {table.getFilteredRowModel().rows.length}
          </div>
          <Button
            variant={variant}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            {...paginationProps}
          >
            {paginationProps.previousText || "Voltar"}
          </Button>
          <Button
            variant={
              paginationProps.variant ? paginationProps.variant : variant
            }
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            {...paginationProps}
          >
            {paginationProps.nextText || "Avançar"}
          </Button>
        </div>
      )}
    </div>
  );
}
