import { cn, ExtendableComponentProps, PolymorphicRef } from "@vbss-ui/lib"
import { Table } from "@vbss-ui/table"
import {
  ComponentProps,
  CSSProperties,
  ElementType,
  forwardRef,
  ReactNode,
  RefAttributes,
  useCallback,
  useMemo,
  useState,
} from "react"
import "./index.css"

export type SortDirection = "asc" | "desc"

export type SortState = {
  columnId: string
  direction: SortDirection
} | null

export interface DataTableColumn<T> {
  id: string
  header: ReactNode
  accessor: (row: T) => ReactNode
  sortable?: boolean
  sortAccessor?: (row: T) => string | number | Date
  width?: number | string
  align?: "left" | "center" | "right"
}

export interface DataTableProps<T> extends Omit<ComponentProps<"table">, "children"> {
  columns: Array<DataTableColumn<T>>
  data: T[]
  initialSort?: SortState
  sort?: SortState
  onSortChange?: (next: SortState) => void
  pageSize?: number
  page?: number
  onPageChange?: (page: number) => void
  label?: ReactNode
  emptyState?: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl"
  fontWeight?: "thin" | "light" | "normal" | "medium" | "bold" | "extrabold"
  height?: "xs" | "sm" | "md" | "lg" | "xl"
  rounded?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  outline?: boolean
}

export type ExtendableDataTableProps<C extends ElementType, T> = ExtendableComponentProps<C, DataTableProps<T>>

// Note: We can't use ForwardRefExoticComponent with generics directly,
// so we use a function overload pattern
type DataTableComponent = <T = unknown>(props: DataTableProps<T> & RefAttributes<ElementType>) => JSX.Element | null

/**
 * A customizable and accessible Data Table component with sorting and pagination.
 */
// eslint-disable-next-line react/display-name
export const DataTable = forwardRef(
  <T = unknown,>(
    {
      columns,
      data,
      initialSort,
      sort: controlledSort,
      onSortChange,
      pageSize,
      page: controlledPage,
      onPageChange,
      label,
      emptyState,
      variant,
      fontSize,
      fontWeight,
      height,
      rounded,
      outline,
      ...props
    }: DataTableProps<T>,
    ref?: PolymorphicRef<ElementType>
  ) => {
    // Sorting state (uncontrolled mode)
    const [internalSort, setInternalSort] = useState<SortState>(initialSort || null)

    // Pagination state (uncontrolled mode)
    const [internalPage, setInternalPage] = useState<number>(1)

    // Determine if we're in controlled mode
    const isControlledSort = controlledSort !== undefined
    const isControlledPage = controlledPage !== undefined

    const currentSort = isControlledSort ? controlledSort : internalSort
    const currentPage = isControlledPage ? controlledPage : internalPage

    // Sorting logic
    const sortedData = useMemo(() => {
      if (!currentSort || !currentSort.columnId) {
        return data
      }

      const column = columns.find((col) => col.id === currentSort.columnId)
      if (!column || !column.sortable) {
        return data
      }

      const sorted = [...data].sort((a, b) => {
        const getSortValue = (row: T) => {
          if (column.sortAccessor) {
            return column.sortAccessor(row)
          }
          // Fallback to extracting text from accessor result
          const accessorResult = column.accessor(row)
          if (typeof accessorResult === "string") return accessorResult
          if (typeof accessorResult === "number") return accessorResult
          if (accessorResult instanceof Date) return accessorResult.getTime()
          // Try to extract text from ReactNode
          return String(accessorResult)
        }

        const aValue = getSortValue(a)
        const bValue = getSortValue(b)

        // Handle different types
        if (aValue instanceof Date && bValue instanceof Date) {
          return currentSort.direction === "asc" ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime()
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return currentSort.direction === "asc" ? aValue - bValue : bValue - aValue
        }

        const aStr = String(aValue)
        const bStr = String(bValue)

        if (currentSort.direction === "asc") {
          return aStr.localeCompare(bStr)
        }
        return bStr.localeCompare(aStr)
      })

      return sorted
    }, [data, currentSort, columns])

    // Pagination logic
    const paginatedData = useMemo(() => {
      if (!pageSize) {
        return sortedData
      }

      const startIndex = (currentPage - 1) * pageSize
      const endIndex = startIndex + pageSize
      return sortedData.slice(startIndex, endIndex)
    }, [sortedData, currentPage, pageSize])

    // Handle sort change
    const handleSortChange = useCallback(
      (columnId: string) => {
        const column = columns.find((col) => col.id === columnId)
        if (!column || !column.sortable) {
          return
        }

        let nextSort: SortState

        if (currentSort?.columnId === columnId) {
          // Toggle direction: asc -> desc -> null
          if (currentSort.direction === "asc") {
            nextSort = { columnId, direction: "desc" }
          } else {
            nextSort = null
          }
        } else {
          // New column, start with asc
          nextSort = { columnId, direction: "asc" }
        }

        if (isControlledSort) {
          onSortChange?.(nextSort)
        } else {
          setInternalSort(nextSort)
          // Reset to page 1 when sorting changes
          if (!isControlledPage) {
            setInternalPage(1)
          } else {
            onPageChange?.(1)
          }
        }
      },
      [currentSort, columns, isControlledSort, isControlledPage, onSortChange, onPageChange]
    )

    // Map columns to table headers
    const tableHeaders = useMemo(() => {
      return columns.map((column) => {
        const isSorted = currentSort?.columnId === column.id
        const sortDirection = isSorted ? currentSort.direction : null

        // Create header content with sort indicator
        const headerContent = (
          <div
            className={cn(
              "flex items-center gap-2 w-full",
              column.align === "center" && "justify-center",
              column.align === "right" && "justify-end",
              column.sortable && "cursor-pointer select-none hover:opacity-80"
            )}
            onClick={() => column.sortable && handleSortChange(column.id)}
            role={column.sortable ? "button" : undefined}
            tabIndex={column.sortable ? 0 : undefined}
            aria-label={
              column.sortable
                ? `${String(column.header)}: Activate to sort${
                    isSorted ? (sortDirection === "asc" ? " descending" : " ascending") : ""
                  }`
                : undefined
            }
            onKeyDown={(e) => {
              if (column.sortable && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault()
                handleSortChange(column.id)
              }
            }}
          >
            <span>{column.header}</span>
            {column.sortable && (
              <span className="inline-flex flex-col" aria-hidden="true">
                <span className={cn("text-xs leading-none", sortDirection === "asc" ? "opacity-100" : "opacity-30")}>↑</span>
                <span className={cn("text-xs leading-none", sortDirection === "desc" ? "opacity-100" : "opacity-30")}>↓</span>
              </span>
            )}
          </div>
        )

        const headerStyle: CSSProperties = {}
        if (column.width) {
          headerStyle.width = typeof column.width === "number" ? `${column.width}px` : column.width
        }
        if (column.align === "center") {
          headerStyle.textAlign = "center"
        } else if (column.align === "right") {
          headerStyle.textAlign = "right"
        }

        const headerClassName = cn(
          column.align === "center" && "[&>div]:text-center",
          column.align === "right" && "[&>div]:text-right"
        )

        return {
          content: headerContent,
          style: headerStyle,
          className: headerClassName,
        }
      })
    }, [columns, currentSort, handleSortChange])

    // Map data to table rows
    // Note: Table component maps row data by Object.keys(), so we use column order
    // to ensure cells match header order
    const tableRows = useMemo(() => {
      return paginatedData.map((row) => {
        const rowData: Record<string, ReactNode | CSSProperties> = {}
        columns.forEach((column) => {
          const cellValue = column.accessor(row)
          rowData[column.id] = cellValue
        })
        return rowData
      })
    }, [paginatedData, columns])

    // Check if we should show empty state
    const showEmptyState = data.length === 0 || (pageSize && paginatedData.length === 0)

    if (showEmptyState && emptyState) {
      return (
        <div>
          {label && <div className="mb-2">{label}</div>}
          <div>{emptyState}</div>
        </div>
      )
    }

    return (
      <div>
        {label && <div className="mb-2">{label}</div>}
        <Table
          ref={ref}
          headers={tableHeaders}
          rows={tableRows}
          variant={variant}
          fontSize={fontSize}
          fontWeight={fontWeight}
          height={height}
          rounded={rounded}
          outline={outline}
          {...props}
        />
      </div>
    )
  }
) as DataTableComponent
;(DataTable as { displayName?: string }).displayName = "DataTable"
