import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import {
  footerStyle,
  headerStyle,
  heightTable,
  rowStyle,
  tableStyles,
  variantTable,
} from "./styles";
import { TableComponent, TableProps } from "./types";

export const Table: TableComponent = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      variant,
      fontSize,
      rounded,
      outBorder = true,
      height,
      headers,
      rows,
      footer,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "relative w-full overflow-auto",
          tableStyles({ variant, rounded, outBorder })
        )}
      >
        <table
          ref={ref}
          className={cn(
            "w-full caption-bottom",
            variantTable({ variant, fontSize })
          )}
          {...props}
        >
          {headers && (
            <thead className={cn("[&_tr]:border-b")}>
              <tr
                className={cn(
                  "border-b transition-colors",
                  variant && rowStyle[variant]
                )}
              >
                {headers?.map((header, index) => (
                  <th
                    key={index}
                    className={cn(
                      "px-4 text-left align-middle font-semibold [&:has([role=checkbox])]:pr-0",
                      variant && headerStyle[variant],
                      heightTable({ height }),
                      header?.className
                    )}
                  >
                    {header.content}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className={cn("[&_tr:last-child]:border-0")}>
            {rows?.map((row, index) => (
              <tr
                className={cn(
                  "border-b transition-colors",
                  variant && rowStyle[variant]
                )}
                key={index}
              >
                {Object.keys(row)
                  .filter((r) => r !== "className")
                  .map((key, index) => (
                    <td
                      key={index}
                      className={cn(
                        "px-4 align-middle [&:has([role=checkbox])]:pr-0",
                        heightTable({ height }),
                        row.className
                      )}
                    >
                      {row[key]}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
          {footer && (
            <tfoot
              className={cn(
                "border-t font-medium [&>tr]:last:border-b-0",
                footer?.className,
                variant && footerStyle[variant]
              )}
            >
              {footer.content.map((foot, index) => (
                <td
                  key={index}
                  className={cn(
                    "px-4 [&:has([role=checkbox])]:pr-0",
                    heightTable({ height })
                  )}
                >
                  {foot}
                </td>
              ))}
            </tfoot>
          )}
        </table>
      </div>
    );
  }
);
