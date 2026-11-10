import { cn, ExtendableComponentProps } from "@vbss-ui/lib"
import { Table } from "@vbss-ui/table"
import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ForwardedRef,
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
  headerLabel?: string
  width?: number | string
  align?: "left" | "center" | "right"
}

export interface DataTableProps<T> extends Omit<ComponentPropsWithoutRef<"table">, "children"> {
  columns: Array<DataTableColumn<T>>
  data: T[]
  initialSort?: SortState
  sort?: SortState
  onSortChange?: (next: SortState) => void
  /**
   * Number of rows per page. The table has no built-in pagination controls: control `page` and `onPageChange`
   * yourself. Without `page`, only the first page is shown.
   */
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

export type DataTableComponent = <T = unknown>(props: DataTableProps<T> & RefAttributes<HTMLTableElement>) => JSX.Element | null

const isSortableValue = (value: unknown) => typeof value === "string" || typeof value === "number" || value instanceof Date

const getHeaderLabel = <T,>(column: DataTableColumn<T>) => {
  if (column.headerLabel) return column.headerLabel
  if (typeof column.header === "string" || typeof column.header === "number") return String(column.header)
  return column.id
}

/**
 * A customizable and accessible Data Table component with sorting and pagination.
 */
export const DataTable = forwardRef(function DataTable<T = unknown>(
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
  ref: ForwardedRef<HTMLTableElement>
) {
  const [internalSort, setInternalSort] = useState<SortState>(initialSort || null)

  const [internalPage, setInternalPage] = useState<number>(1)

  const isControlledSort = controlledSort !== undefined
  const isControlledPage = controlledPage !== undefined

  const currentSort = isControlledSort ? controlledSort : internalSort
  const currentPage = isControlledPage ? controlledPage : internalPage

  const sortableColumnIds = useMemo(() => {
    const ids = new Set<string>()
    columns.forEach((column) => {
      if (!column.sortable) return
      if (column.sortAccessor || data.every((row) => isSortableValue(column.accessor(row)))) {
        ids.add(column.id)
      }
    })
    return ids
  }, [columns, data])

  const sortedData = useMemo(() => {
    if (!currentSort || !currentSort.columnId) {
      return data
    }

    const column = columns.find((col) => col.id === currentSort.columnId)
    if (!column || !sortableColumnIds.has(column.id)) {
      return data
    }

    const sorted = [...data].sort((a, b) => {
      const getSortValue = (row: T) => {
        if (column.sortAccessor) {
          return column.sortAccessor(row)
        }
        const accessorResult = column.accessor(row)
        if (typeof accessorResult === "number") return accessorResult
        if (accessorResult instanceof Date) return accessorResult.getTime()
        return String(accessorResult)
      }

      const aValue = getSortValue(a)
      const bValue = getSortValue(b)

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
  }, [data, currentSort, columns, sortableColumnIds])

  const paginatedData = useMemo(() => {
    if (!pageSize) {
      return sortedData
    }

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, currentPage, pageSize])

  const handleSortChange = useCallback(
    (columnId: string) => {
      if (!sortableColumnIds.has(columnId)) {
        return
      }

      let nextSort: SortState

      if (currentSort?.columnId === columnId) {
        if (currentSort.direction === "asc") {
          nextSort = { columnId, direction: "desc" }
        } else {
          nextSort = null
        }
      } else {
        nextSort = { columnId, direction: "asc" }
      }

      if (isControlledSort) {
        onSortChange?.(nextSort)
      } else {
        setInternalSort(nextSort)
      }

      if (isControlledPage) {
        onPageChange?.(1)
      } else {
        setInternalPage(1)
      }
    },
    [currentSort, sortableColumnIds, isControlledSort, isControlledPage, onSortChange, onPageChange]
  )

  const tableHeaders = useMemo(() => {
    return columns.map((column) => {
      const isSortable = sortableColumnIds.has(column.id)
      const isSorted = currentSort?.columnId === column.id
      const sortDirection = isSorted ? currentSort.direction : null

      const headerContent = (
        <div
          className={cn(
            "flex items-center gap-2 w-full",
            column.align === "center" && "justify-center",
            column.align === "right" && "justify-end",
            isSortable && "cursor-pointer select-none hover:opacity-80"
          )}
          onClick={() => isSortable && handleSortChange(column.id)}
          role={isSortable ? "button" : undefined}
          tabIndex={isSortable ? 0 : undefined}
          aria-label={
            isSortable
              ? `${getHeaderLabel(column)}: Activate to sort${
                  isSorted ? (sortDirection === "asc" ? " descending" : " ascending") : ""
                }`
              : undefined
          }
          onKeyDown={(e) => {
            if (isSortable && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault()
              handleSortChange(column.id)
            }
          }}
        >
          <span>{column.header}</span>
          {isSortable && (
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
  }, [columns, currentSort, handleSortChange, sortableColumnIds])

  const tableRows = useMemo(() => {
    return paginatedData.map((row) => {
      const rowData: Record<string, ReactNode> = {}
      columns.forEach((column, index) => {
        rowData[`c${index}`] = column.accessor(row)
      })
      return rowData
    })
  }, [paginatedData, columns])

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
}) as DataTableComponent
;(DataTable as { displayName?: string }).displayName = "DataTable"
