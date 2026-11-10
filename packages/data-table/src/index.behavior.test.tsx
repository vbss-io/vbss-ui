import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef, useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { DataTable, type DataTableColumn, type DataTableComponent, type SortState } from "./index"

interface Product {
  sku: string
  name: string
  price: number
  addedAt: Date
}

const products: Product[] = [
  { sku: "c", name: "Cherry", price: 30, addedAt: new Date(2024, 2, 1) },
  { sku: "a", name: "apple", price: 10, addedAt: new Date(2024, 0, 1) },
  { sku: "b", name: "Banana", price: 20, addedAt: new Date(2024, 1, 1) },
]

const columns: DataTableColumn<Product>[] = [
  { id: "name", header: "Name", accessor: (row) => row.name, sortable: true },
  { id: "price", header: "Price", accessor: (row) => `$${row.price}`, sortable: true, sortAccessor: (row) => row.price },
  {
    id: "added",
    header: "Added",
    accessor: (row) => row.addedAt.getFullYear(),
    sortable: true,
    sortAccessor: (row) => row.addedAt,
  },
  { id: "sku", header: "SKU", accessor: (row) => row.sku },
]

const firstColumn = () =>
  screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0].textContent)

const header = (name: string) => screen.getByRole("button", { name: new RegExp(`^${name}:`) })

describe("DataTable behavior", () => {
  describe("cells", () => {
    it("renders cells in column order with the accessor output", () => {
      render(<DataTable columns={columns} data={products} />)
      const firstRow = screen.getAllByRole("row")[1]
      expect(
        within(firstRow)
          .getAllByRole("cell")
          .map((cell) => cell.textContent)
      ).toEqual(["Cherry", "$30", "2024", "c"])
    })

    it("keeps the data order when no sort is active", () => {
      render(<DataTable columns={columns} data={products} />)
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
    })

    it("renders ReactNode cells and headers", () => {
      const nodeColumns: DataTableColumn<Product>[] = [
        { id: "link", header: <em>Link</em>, accessor: (row) => <a href={`/p/${row.sku}`}>{row.name}</a> },
      ]
      render(<DataTable columns={nodeColumns} data={products} />)
      expect(screen.getByRole("columnheader", { name: "Link" })).toBeInTheDocument()
      expect(screen.getByRole("link", { name: "apple" })).toHaveAttribute("href", "/p/a")
    })

    it("reflects new data on rerender", () => {
      const { rerender } = render(<DataTable columns={columns} data={products} />)
      rerender(<DataTable columns={columns} data={products.slice(0, 1)} />)
      expect(firstColumn()).toEqual(["Cherry"])
    })
  })

  describe("uncontrolled sorting", () => {
    it("sorts text ascending, then descending, then restores the original order", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={products} />)
      await user.click(header("Name"))
      expect(firstColumn()).toEqual(["apple", "Banana", "Cherry"])
      await user.click(header("Name"))
      expect(firstColumn()).toEqual(["Cherry", "Banana", "apple"])
      await user.click(header("Name"))
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
    })

    it("sorts numbers numerically through sortAccessor, not by the rendered text", async () => {
      const user = userEvent.setup()
      const data = [...products, { sku: "d", name: "Date", price: 100, addedAt: new Date(2024, 3, 1) }]
      render(<DataTable columns={columns} data={data} />)
      await user.click(header("Price"))
      expect(firstColumn()).toEqual(["apple", "Banana", "Cherry", "Date"])
      await user.click(header("Price"))
      expect(firstColumn()).toEqual(["Date", "Cherry", "Banana", "apple"])
    })

    it("sorts dates chronologically through sortAccessor", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={products} />)
      await user.click(header("Added"))
      expect(firstColumn()).toEqual(["apple", "Banana", "Cherry"])
      await user.click(header("Added"))
      expect(firstColumn()).toEqual(["Cherry", "Banana", "apple"])
    })

    it("sorts by the accessor value when the column has no sortAccessor", async () => {
      const user = userEvent.setup()
      const numeric: DataTableColumn<Product>[] = [{ id: "price", header: "Price", accessor: (row) => row.price, sortable: true }]
      render(<DataTable columns={numeric} data={products} />)
      await user.click(header("Price"))
      expect(firstColumn()).toEqual(["10", "20", "30"])
    })

    it("starts a new column in ascending order and leaves the previous one", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={products} />)
      await user.click(header("Name"))
      await user.click(header("Name"))
      await user.click(header("Price"))
      expect(firstColumn()).toEqual(["apple", "Banana", "Cherry"])
      expect(header("Price")).toHaveAccessibleName("Price: Activate to sort descending")
      expect(header("Name")).toHaveAccessibleName("Name: Activate to sort")
    })

    it("applies initialSort on first render", () => {
      render(<DataTable columns={columns} data={products} initialSort={{ columnId: "price", direction: "desc" }} />)
      expect(firstColumn()).toEqual(["Cherry", "Banana", "apple"])
    })

    it("ignores a sort pointing to a column that does not exist or is not sortable", () => {
      const { unmount } = render(
        <DataTable columns={columns} data={products} initialSort={{ columnId: "nope", direction: "asc" }} />
      )
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
      unmount()
      render(<DataTable columns={columns} data={products} initialSort={{ columnId: "sku", direction: "asc" }} />)
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
    })

    it("does not mutate the data array it receives", async () => {
      const user = userEvent.setup()
      const data = [...products]
      render(<DataTable columns={columns} data={data} />)
      await user.click(header("Name"))
      expect(data.map((row) => row.name)).toEqual(["Cherry", "apple", "Banana"])
    })

    it("does nothing when a non-sortable header is clicked", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={products} />)
      await user.click(screen.getByText("SKU"))
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
      expect(screen.queryByRole("button", { name: /SKU/ })).not.toBeInTheDocument()
    })

    it("marks the active direction in the visual indicator", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={products} />)
      await user.click(header("Name"))
      const [up, down] = Array.from(header("Name").querySelectorAll<HTMLElement>("[aria-hidden='true'] > span"))
      expect(up).toHaveClass("opacity-100")
      expect(down).toHaveClass("opacity-30")
      await user.click(header("Name"))
      const [upAfter, downAfter] = Array.from(header("Name").querySelectorAll<HTMLElement>("[aria-hidden='true'] > span"))
      expect(upAfter).toHaveClass("opacity-30")
      expect(downAfter).toHaveClass("opacity-100")
    })
  })

  describe("keyboard", () => {
    it("makes sortable headers focusable and sorts with Enter and Space", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={products} />)
      await user.tab()
      expect(header("Name")).toHaveFocus()
      await user.keyboard("{Enter}")
      expect(firstColumn()).toEqual(["apple", "Banana", "Cherry"])
      await user.keyboard(" ")
      expect(firstColumn()).toEqual(["Cherry", "Banana", "apple"])
    })

    it("ignores other keys", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={products} />)
      await user.tab()
      await user.keyboard("a")
      await user.keyboard("{Escape}")
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
    })

    it("does not put non-sortable headers in the tab order", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={[columns[3]]} data={products} />)
      await user.tab()
      expect(document.body).toHaveFocus()
    })
  })

  describe("controlled sorting", () => {
    it("does not reorder until the parent applies the new sort", async () => {
      const user = userEvent.setup()
      const onSortChange = vi.fn()
      render(<DataTable columns={columns} data={products} sort={null} onSortChange={onSortChange} />)
      await user.click(header("Name"))
      expect(onSortChange).toHaveBeenCalledWith({ columnId: "name", direction: "asc" })
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
    })

    it("follows a parent that owns the sort state through the full cycle", async () => {
      const user = userEvent.setup()
      const seen: SortState[] = []
      const Harness = () => {
        const [sort, setSort] = useState<SortState>(null)
        return (
          <DataTable
            columns={columns}
            data={products}
            sort={sort}
            onSortChange={(next) => {
              seen.push(next)
              setSort(next)
            }}
          />
        )
      }
      render(<Harness />)
      await user.click(header("Name"))
      expect(firstColumn()).toEqual(["apple", "Banana", "Cherry"])
      await user.click(header("Name"))
      expect(firstColumn()).toEqual(["Cherry", "Banana", "apple"])
      await user.click(header("Name"))
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
      expect(seen).toEqual([{ columnId: "name", direction: "asc" }, { columnId: "name", direction: "desc" }, null])
    })

    it("ignores initialSort when sort is controlled", () => {
      render(<DataTable columns={columns} data={products} sort={null} initialSort={{ columnId: "name", direction: "asc" }} />)
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
    })

    it("works without an onSortChange handler", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={products} sort={null} />)
      await user.click(header("Name"))
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
    })
  })

  describe("pagination", () => {
    const many: Product[] = Array.from({ length: 5 }, (_, index) => ({
      sku: `s${index}`,
      name: `Item ${index + 1}`,
      price: index,
      addedAt: new Date(2024, 0, index + 1),
    }))

    it("shows only the first page of an uncontrolled table", () => {
      render(<DataTable columns={columns} data={many} pageSize={2} />)
      expect(firstColumn()).toEqual(["Item 1", "Item 2"])
    })

    it("slices the requested page and the short last page", () => {
      const { rerender } = render(<DataTable columns={columns} data={many} pageSize={2} page={2} />)
      expect(firstColumn()).toEqual(["Item 3", "Item 4"])
      rerender(<DataTable columns={columns} data={many} pageSize={2} page={3} />)
      expect(firstColumn()).toEqual(["Item 5"])
    })

    it("paginates after sorting and goes back to the unsorted first page when the sort is cleared", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={many} pageSize={2} initialSort={{ columnId: "price", direction: "desc" }} />)
      expect(firstColumn()).toEqual(["Item 5", "Item 4"])
      await user.click(header("Price"))
      expect(firstColumn()).toEqual(["Item 1", "Item 2"])
    })

    it("shows everything when pageSize is zero or missing", () => {
      const { rerender } = render(<DataTable columns={columns} data={many} />)
      expect(firstColumn()).toHaveLength(5)
      rerender(<DataTable columns={columns} data={many} pageSize={0} />)
      expect(firstColumn()).toHaveLength(5)
    })
  })

  describe("empty states", () => {
    it("shows the empty state in place of the table, keeping the label", () => {
      render(<DataTable columns={columns} data={[]} label="Products" emptyState={<p>Nothing here</p>} />)
      expect(screen.getByText("Products")).toBeInTheDocument()
      expect(screen.getByText("Nothing here")).toBeInTheDocument()
      expect(screen.queryByRole("table")).not.toBeInTheDocument()
    })

    it("renders an empty table with its headers when there is no emptyState", () => {
      render(<DataTable columns={columns} data={[]} />)
      expect(screen.getByRole("table")).toBeInTheDocument()
      expect(screen.getAllByRole("columnheader")).toHaveLength(columns.length)
      expect(screen.getAllByRole("row")).toHaveLength(1)
    })

    it("shows the empty state when the requested page is past the end", () => {
      render(<DataTable columns={columns} data={products} pageSize={2} page={5} emptyState={<p>Past the end</p>} />)
      expect(screen.getByText("Past the end")).toBeInTheDocument()
    })
  })

  describe("table props and styling", () => {
    it("renders the label above the table", () => {
      render(<DataTable columns={columns} data={products} label="Catalog" />)
      const label = screen.getByText("Catalog")
      const table = screen.getByRole("table")
      expect(label.compareDocumentPosition(table) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    })

    it("applies numeric widths in pixels and string widths as given", () => {
      const sized: DataTableColumn<Product>[] = [
        { id: "name", header: "Name", accessor: (row) => row.name, width: 120 },
        { id: "sku", header: "SKU", accessor: (row) => row.sku, width: "30%" },
      ]
      render(<DataTable columns={sized} data={products} />)
      expect(screen.getByRole("columnheader", { name: "Name" })).toHaveStyle({ width: "120px" })
      expect(screen.getByRole("columnheader", { name: "SKU" })).toHaveStyle({ width: "30%" })
    })

    it("aligns the header content of sortable columns", () => {
      const aligned: DataTableColumn<Product>[] = [
        { id: "name", header: "Name", accessor: (row) => row.name, sortable: true, align: "center" },
        { id: "price", header: "Price", accessor: (row) => row.price, sortable: true, align: "right" },
        { id: "sku", header: "SKU", accessor: (row) => row.sku, sortable: true },
      ]
      render(<DataTable columns={aligned} data={products} />)
      expect(header("Name")).toHaveClass("justify-center")
      expect(header("Price")).toHaveClass("justify-end")
      expect(header("SKU")).not.toHaveClass("justify-center", "justify-end")
    })

    it("forwards table attributes and the ref to the table element", () => {
      let received: unknown = null
      render(
        <DataTable
          columns={columns}
          data={products}
          aria-label="Products table"
          className="custom-table"
          ref={(node: unknown) => (received = node)}
        />
      )
      const table = screen.getByRole("table", { name: "Products table" })
      expect(table).toHaveClass("custom-table")
      expect(received).toBe(table)
    })

    it.each(["primary", "secondary", "outline", "ghost"] as const)("accepts the %s variant", (variant) => {
      render(<DataTable columns={columns} data={products} variant={variant} />)
      expect(screen.getByRole("table")).toBeInTheDocument()
      expect(firstColumn()).toHaveLength(3)
    })

    it("passes font size and weight classes down to the table", () => {
      render(<DataTable columns={columns} data={products} fontSize="lg" fontWeight="bold" />)
      expect(screen.getByRole("table")).toHaveClass("text-lg", "font-bold")
    })

    it("exposes its displayName", () => {
      expect((DataTable as { displayName?: string }).displayName).toBe("DataTable")
    })
  })

  describe("cells keyed by column position", () => {
    type Wide = { a: string; b: string; c: string; d: string }
    const row: Wide = { a: "va", b: "vb", c: "vc", d: "vd" }

    it("keeps cells aligned with headers when column ids are className, style and numeric", () => {
      const wide: DataTableColumn<Wide>[] = [
        { id: "2", header: "H2", accessor: (r) => r.a },
        { id: "className", header: "HC", accessor: (r) => r.b },
        { id: "1", header: "H1", accessor: (r) => r.c },
        { id: "style", header: "HS", accessor: (r) => r.d },
      ]
      render(<DataTable columns={wide} data={[row]} />)
      const headers = screen.getAllByRole("columnheader").map((cell) => cell.textContent)
      const cells = within(screen.getAllByRole("row")[1])
        .getAllByRole("cell")
        .map((cell) => cell.textContent)
      expect(headers).toEqual(["H2", "HC", "H1", "HS"])
      expect(cells).toEqual(["va", "vb", "vc", "vd"])
    })

    it("does not turn a column cell into the row class or style", () => {
      const wide: DataTableColumn<Wide>[] = [
        { id: "className", header: "HC", accessor: (r) => r.a },
        { id: "style", header: "HS", accessor: (r) => r.b },
      ]
      render(<DataTable columns={wide} data={[row]} />)
      const dataRow = screen.getAllByRole("row")[1]
      expect(dataRow).not.toHaveClass("va")
      expect(dataRow).not.toHaveAttribute("style")
      expect(within(dataRow).getAllByRole("cell")).toHaveLength(2)
    })
  })

  describe("sortability of columns with ReactNode content", () => {
    const jsxColumn: DataTableColumn<Product> = {
      id: "link",
      header: "Link",
      accessor: (r) => <a href={`/p/${r.sku}`}>{r.name}</a>,
      sortable: true,
    }

    it("does not expose a sort control on a column whose accessor returns JSX without sortAccessor", () => {
      render(<DataTable columns={[jsxColumn]} data={products} />)
      const headerCell = screen.getByRole("columnheader", { name: "Link" })
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
      expect(headerCell.querySelector("[tabindex]")).toBeNull()
      expect(headerCell.querySelector("[aria-label]")).toBeNull()
      expect(headerCell.querySelector("[aria-hidden='true']")).toBeNull()
    })

    it("ignores an initialSort that points to a JSX column without sortAccessor", () => {
      render(<DataTable columns={[jsxColumn]} data={products} initialSort={{ columnId: "link", direction: "desc" }} />)
      expect(firstColumn()).toEqual(["Cherry", "apple", "Banana"])
    })

    it("sorts a JSX column when a sortAccessor is given", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={[{ ...jsxColumn, sortAccessor: (r) => r.name.toLowerCase() }]} data={products} />)
      await user.click(screen.getByRole("button", { name: /^Link:/ }))
      expect(firstColumn()).toEqual(["apple", "Banana", "Cherry"])
    })

    it("is not sortable when only some rows return a primitive", () => {
      const mixed: DataTableColumn<Product> = {
        id: "mixed",
        header: "Mixed",
        accessor: (r) => (r.sku === "a" ? <b>{r.name}</b> : r.name),
        sortable: true,
      }
      render(<DataTable columns={[mixed]} data={products} />)
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })
  })

  describe("sort accessible name", () => {
    const base: DataTableColumn<Product> = { id: "name", header: <em>Name</em>, accessor: (r) => r.name, sortable: true }

    it("uses headerLabel for a JSX header", () => {
      render(<DataTable columns={[{ ...base, headerLabel: "Product name" }]} data={products} />)
      expect(screen.getByRole("button", { name: "Product name: Activate to sort" })).toBeInTheDocument()
    })

    it("falls back to the column id for a JSX header without headerLabel", () => {
      render(<DataTable columns={[base]} data={products} />)
      const control = screen.getByRole("button", { name: "name: Activate to sort" })
      expect(control.getAttribute("aria-label")).not.toContain("[object Object]")
    })

    it("uses the header itself when it is a string or a number", () => {
      render(
        <DataTable
          columns={[
            { ...base, id: "s", header: "Text" },
            { ...base, id: "n", header: 42 },
          ]}
          data={products}
        />
      )
      expect(screen.getByRole("button", { name: "Text: Activate to sort" })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: "42: Activate to sort" })).toBeInTheDocument()
    })

    it("prefers headerLabel over a string header", () => {
      render(<DataTable columns={[{ ...base, header: "Name", headerLabel: "Label" }]} data={products} />)
      expect(screen.getByRole("button", { name: "Label: Activate to sort" })).toBeInTheDocument()
    })
  })

  describe("pageSize without a controlled page", () => {
    const many: Product[] = Array.from({ length: 5 }, (_, index) => ({
      sku: `s${index}`,
      name: `Item ${index + 1}`,
      price: index,
      addedAt: new Date(2024, 0, index + 1),
    }))

    it("shows only the first rows and logs nothing", async () => {
      const user = userEvent.setup()
      const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined)
      const error = vi.spyOn(console, "error").mockImplementation(() => undefined)
      render(<DataTable columns={columns} data={many} pageSize={2} />)
      expect(firstColumn()).toEqual(["Item 1", "Item 2"])
      await user.click(header("Price"))
      expect(firstColumn()).toEqual(["Item 1", "Item 2"])
      expect(warn).not.toHaveBeenCalled()
      expect(error).not.toHaveBeenCalled()
      warn.mockRestore()
      error.mockRestore()
    })
  })

  describe("sort change resets the page", () => {
    it("reports page 1 when the sort is controlled and the page is controlled", async () => {
      const user = userEvent.setup()
      const onSortChange = vi.fn()
      const onPageChange = vi.fn()
      render(
        <DataTable
          columns={columns}
          data={products}
          pageSize={2}
          page={2}
          onPageChange={onPageChange}
          sort={null}
          onSortChange={onSortChange}
        />
      )
      await user.click(header("Name"))
      expect(onSortChange).toHaveBeenCalledWith({ columnId: "name", direction: "asc" })
      expect(onPageChange).toHaveBeenCalledTimes(1)
      expect(onPageChange).toHaveBeenCalledWith(1)
    })

    it("does not require onPageChange when the sort is controlled", async () => {
      const user = userEvent.setup()
      const onSortChange = vi.fn()
      render(<DataTable columns={columns} data={products} pageSize={2} page={2} sort={null} onSortChange={onSortChange} />)
      await user.click(header("Name"))
      expect(onSortChange).toHaveBeenCalledTimes(1)
    })

    it("keeps an uncontrolled page on 1 when the sort is controlled", async () => {
      const user = userEvent.setup()
      render(<DataTable columns={columns} data={products} pageSize={2} sort={null} onSortChange={vi.fn()} />)
      await user.click(header("Name"))
      expect(firstColumn()).toEqual(["Cherry", "apple"])
    })
  })

  describe("ref typing", () => {
    it("accepts a ref object typed as the rendered table", () => {
      const ref = createRef<HTMLTableElement>()
      render(<DataTable ref={ref} columns={columns} data={products} />)
      expect(ref.current).toBe(screen.getByRole("table"))
    })

    it("rejects a ref object typed as another element", () => {
      const ref = createRef<HTMLDivElement>()
      // @ts-expect-error a table ref cannot be a div ref
      render(<DataTable ref={ref} columns={columns} data={products} />)
      expect(screen.getByRole("table")).toBeInTheDocument()
    })

    it("is assignable to the exported DataTableComponent type", () => {
      const Typed: DataTableComponent = DataTable
      render(<Typed columns={columns} data={products} />)
      expect(screen.getByRole("table")).toBeInTheDocument()
    })
  })
})
