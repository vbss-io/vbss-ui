import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { cva, VariantProps } from "class-variance-authority"
import {
  ComponentProps,
  CSSProperties,
  ElementType,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react"
import "./index.css"

type TableHeaderProps = {
  content: string | number | ReactNode
  className?: string
  style?: CSSProperties
}

type RowProps = {
  [key: string]: string | number | ReactNode | CSSProperties
}

type FooterProps = {
  content: Array<string | ReactNode>
  className?: string
  style?: CSSProperties
}

type TableProps = ComponentProps<"table"> &
  VariantProps<typeof tableStyles> &
  VariantProps<typeof variantTable> &
  VariantProps<typeof heightTable> & {
    headers?: Array<TableHeaderProps>
    rows?: Array<RowProps>
    footer?: FooterProps
    variant?: "primary" | "secondary" | "outline" | "ghost"
  }

export type ExtendableTableProps<C extends ElementType> = ExtendableComponentProps<C, TableProps>

export type TableComponent = ForwardRefExoticComponent<ExtendableTableProps<ElementType> & RefAttributes<ElementType>>

/**
 * A customizable and accessible Table component.
 */
export const Table: TableComponent = forwardRef(
  <C extends ElementType>(
    {
      variant = "primary",
      fontSize,
      fontWeight,
      rounded,
      outline,
      height,
      headers,
      rows,
      footer,
      ...props
    }: ExtendableTableProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    return (
      <div className={cn("tableContainer relative w-full overflow-auto", tableStyles({ rounded, outline }))}>
        <table ref={ref} className={cn("table w-full caption-bottom", variantTable({ fontSize, fontWeight }))} {...props}>
          {headers && (
            <thead className={cn("thead [&_tr]:border-b")}>
              <tr className={cn("htr border-b transition-colors", variant && rowStyle[variant])}>
                {headers?.map((header, index) => (
                  <th
                    key={`head-${index}`}
                    className={cn(
                      "hth px-4 text-left align-middle [&:has([role=checkbox])]:pr-0",
                      fontWeight ? variantTable({ fontWeight }) : "font-semibold",
                      fontSize ? variantTable({ fontSize }) : "text-base",
                      variant && headerStyle[variant],
                      heightTable({ height }),
                      header?.className
                    )}
                    style={header?.style}
                  >
                    {header.content}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className={cn("tbody [&_tr:last-child]:border-0")}>
            {rows?.map((row, index) => (
              <tr className={cn("btr border-b transition-colors", variant && rowStyle[variant])} key={`body-${index}`}>
                {Object.keys(row)
                  .filter((r) => r !== "className" && r !== "style")
                  .map((key, index) => (
                    <td
                      key={`body-row-${index}`}
                      className={cn(
                        "btd px-4 align-middle [&:has([role=checkbox])]:pr-0",
                        heightTable({ height }),
                        typeof row.className === "string" && row.className
                      )}
                      style={typeof row?.style === "object" ? (row.style as CSSProperties) : {}}
                    >
                      {!["className", "style"].includes(key) && (row[key] as string | ReactNode)}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
          {footer && (
            <tfoot
              className={cn(
                "tfoot border-t [&>tr]:last:border-b-0",
                fontWeight ? variantTable({ fontSize, fontWeight }) : "font-medium",
                fontSize ? variantTable({ fontSize }) : "text-base",
                variant && footerStyle[variant]
              )}
            >
              {footer.content.map((foot, index) => (
                <td
                  key={`foot-${index}`}
                  className={cn("ftd px-4 [&:has([role=checkbox])]:pr-0", heightTable({ height }), footer?.className)}
                  style={footer?.style}
                >
                  {foot}
                </td>
              ))}
            </tfoot>
          )}
        </table>
      </div>
    )
  }
)

Table.displayName = "Table"

export const variantTable = cva("text-black", {
  variants: {
    fontSize: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    fontWeight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {},
})

export const heightTable = cva("", {
  variants: {
    height: {
      xs: "h-6",
      sm: "h-8",
      md: "h-10",
      lg: "h-14",
      xl: "h-16",
    },
  },
  defaultVariants: {
    height: "md",
  },
})

export const tableStyles = cva("", {
  variants: {
    rounded: {
      none: "rounded-none",
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
    outline: {
      true: "border border-primary",
    },
  },
  defaultVariants: {
    rounded: "md",
    outline: true,
  },
})

export const headerStyle: { [key: string]: string } = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  outline: "bg-white text-primary",
}

export const rowStyle: { [key: string]: string } = {
  primary: "hover:bg-secondary/5 data-[state=selected]:bg-secondary/10",
  secondary: "hover:bg-primary/5 data-[state=selected]:bg-primary/10",
  outline: "border-primary hover:bg-secondary/5 data-[state=selected]:bg-primary/10",
  ghost: "hover:bg-secondary/5 data-[state=selected]:bg-primary/10",
}

export const footerStyle: { [key: string]: string } = {
  outline: "border-primary text-primary",
}
