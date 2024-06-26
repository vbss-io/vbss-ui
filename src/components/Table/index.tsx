import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

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

const footerStyle: { [key: string]: string } = {
  outline: "border-primary text-primary",
};

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

type TableProps = ComponentProps<"table"> &
  VariantProps<typeof tableStyles> &
  VariantProps<typeof variantTable> &
  VariantProps<typeof heightTable> & {
    headers?: Array<HeaderProps>;
    rows: Array<RowProps>;
    footer?: FooterProps;
  };

export const Table = forwardRef<HTMLTableElement, TableProps>(
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
