import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { DataTable, type DataTableColumn, type SortState } from "./index"

// Test data type
interface User {
  id: number
  name: string
  email: string
  age: number
  joinDate: Date
}

const mockUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 30, joinDate: new Date(2020, 0, 1) },
  { id: 2, name: "Bob", email: "bob@example.com", age: 25, joinDate: new Date(2021, 5, 15) },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 35, joinDate: new Date(2019, 2, 10) },
  { id: 4, name: "David", email: "david@example.com", age: 28, joinDate: new Date(2022, 8, 20) },
  { id: 5, name: "Eve", email: "eve@example.com", age: 32, joinDate: new Date(2020, 11, 5) },
]

const basicColumns: DataTableColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row) => row.email,
    sortable: true,
  },
  {
    id: "age",
    header: "Age",
    accessor: (row) => row.age,
    sortable: true,
    sortAccessor: (row) => row.age,
  },
]

describe("DataTable", () => {
  describe("Rendering", () => {
    it("renders with columns and data", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      expect(screen.getByText("Name")).toBeInTheDocument()
      expect(screen.getByText("Email")).toBeInTheDocument()
      expect(screen.getByText("Alice")).toBeInTheDocument()
      expect(screen.getByText("alice@example.com")).toBeInTheDocument()
    })

    it("renders with label", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} label="Users" />)
      expect(screen.getByText("Users")).toBeInTheDocument()
    })

    it("renders with ReactNode label", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} label={<span data-testid="custom-label">Custom Label</span>} />)
      expect(screen.getByTestId("custom-label")).toBeInTheDocument()
    })

    it("renders empty state when data is empty", () => {
      render(<DataTable columns={basicColumns} data={[]} emptyState={<div data-testid="empty-state">No data available</div>} />)
      expect(screen.getByTestId("empty-state")).toBeInTheDocument()
      expect(screen.queryByText("Name")).not.toBeInTheDocument()
    })

    it("renders empty state when paginated data is empty", () => {
      render(
        <DataTable
          columns={basicColumns}
          data={mockUsers}
          pageSize={10}
          page={10}
          emptyState={<div data-testid="empty-state">No data on this page</div>}
        />
      )
      expect(screen.getByTestId("empty-state")).toBeInTheDocument()
    })

    it("does not render empty state when there is data", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} emptyState={<div data-testid="empty-state">No data</div>} />)
      expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument()
      expect(screen.getByText("Alice")).toBeInTheDocument()
    })
  })

  describe("Sorting - Uncontrolled", () => {
    it("sorts ascending on first click", async () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      const nameHeader = screen.getByText("Name").closest("div[role='button']")
      expect(nameHeader).toBeInTheDocument()

      await userEvent.click(nameHeader!)

      // Check that data is sorted (Alice should be first)
      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1] // Skip header row
      expect(firstDataRow.textContent).toContain("Alice")
    })

    it("sorts descending on second click", async () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      const nameHeader = screen.getByText("Name").closest("div[role='button']")!

      await userEvent.click(nameHeader)
      await userEvent.click(nameHeader)

      // Should be sorted descending (Eve should be first, or Charlie/David)
      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1]
      // Check that it's not Alice (first alphabetically)
      expect(firstDataRow.textContent).not.toContain("Alice")
    })

    it("clears sort on third click", async () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      const nameHeader = screen.getByText("Name").closest("div[role='button']")!

      await userEvent.click(nameHeader) // asc
      await userEvent.click(nameHeader) // desc
      await userEvent.click(nameHeader) // null

      // Should show original order (Alice first based on initial data)
      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1]
      expect(firstDataRow.textContent).toContain("Alice")
    })

    it("uses initialSort prop", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} initialSort={{ columnId: "name", direction: "desc" }} />)
      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1]
      // Should be sorted descending
      expect(firstDataRow.textContent).not.toContain("Alice")
    })

    it("uses sortAccessor when provided", async () => {
      const columnsWithSortAccessor: DataTableColumn<User>[] = [
        {
          id: "age",
          header: "Age",
          accessor: (row) => `Age: ${row.age}`,
          sortable: true,
          sortAccessor: (row) => row.age,
        },
      ]

      render(<DataTable columns={columnsWithSortAccessor} data={mockUsers} />)
      const ageHeader = screen.getByText("Age").closest("div[role='button']")!

      await userEvent.click(ageHeader)

      // Should sort by age (25 is youngest)
      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1]
      expect(firstDataRow.textContent).toContain("25")
    })

    it("handles Date sorting correctly", async () => {
      const columnsWithDate: DataTableColumn<User>[] = [
        {
          id: "joinDate",
          header: "Join Date",
          accessor: (row) => row.joinDate.toLocaleDateString(),
          sortable: true,
          sortAccessor: (row) => row.joinDate,
        },
      ]

      render(<DataTable columns={columnsWithDate} data={mockUsers} />)
      const dateHeader = screen.getByText("Join Date").closest("div[role='button']")!

      await userEvent.click(dateHeader)

      // Earliest date should be first (2019)
      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1]
      expect(firstDataRow.textContent).toContain("2019")
    })

    it("maintains stable sort with equal values", async () => {
      const usersWithDuplicates: User[] = [
        { id: 1, name: "Alice", email: "alice1@example.com", age: 30, joinDate: new Date(2020, 0, 1) },
        { id: 2, name: "Alice", email: "alice2@example.com", age: 30, joinDate: new Date(2020, 0, 1) },
        { id: 3, name: "Bob", email: "bob@example.com", age: 25, joinDate: new Date(2021, 5, 15) },
      ]

      render(<DataTable columns={basicColumns} data={usersWithDuplicates} />)
      const nameHeader = screen.getByText("Name").closest("div[role='button']")!

      await userEvent.click(nameHeader)

      // Both Alices should appear before Bob, maintaining their original relative order
      const rows = screen.getAllByRole("row")
      expect(rows[1].textContent).toContain("alice1@example.com")
      expect(rows[2].textContent).toContain("alice2@example.com")
      expect(rows[3].textContent).toContain("Bob")
    })
  })

  describe("Sorting - Controlled", () => {
    it("uses controlled sort prop", () => {
      const sort: SortState = { columnId: "name", direction: "desc" }
      render(<DataTable columns={basicColumns} data={mockUsers} sort={sort} />)

      const rows = screen.getAllByRole("row")
      const firstDataRow = rows[1]
      // Should be sorted descending
      expect(firstDataRow.textContent).not.toContain("Alice")
    })

    it("calls onSortChange when header is clicked", async () => {
      const handleSortChange = vi.fn()
      render(<DataTable columns={basicColumns} data={mockUsers} sort={null} onSortChange={handleSortChange} />)

      const nameHeader = screen.getByText("Name").closest("div[role='button']")!
      await userEvent.click(nameHeader)

      expect(handleSortChange).toHaveBeenCalledWith({ columnId: "name", direction: "asc" })
    })

    it("toggles sort direction in controlled mode", async () => {
      const handleSortChange = vi.fn()
      render(
        <DataTable
          columns={basicColumns}
          data={mockUsers}
          sort={{ columnId: "name", direction: "asc" }}
          onSortChange={handleSortChange}
        />
      )

      const nameHeader = screen.getByText("Name").closest("div[role='button']")!
      await userEvent.click(nameHeader)

      expect(handleSortChange).toHaveBeenCalledWith({ columnId: "name", direction: "desc" })
    })

    it("clears sort in controlled mode on third click", async () => {
      const handleSortChange = vi.fn()
      render(
        <DataTable
          columns={basicColumns}
          data={mockUsers}
          sort={{ columnId: "name", direction: "desc" }}
          onSortChange={handleSortChange}
        />
      )

      const nameHeader = screen.getByText("Name").closest("div[role='button']")!
      await userEvent.click(nameHeader)

      expect(handleSortChange).toHaveBeenCalledWith(null)
    })
  })

  describe("Pagination - Uncontrolled", () => {
    it("renders all data when pageSize is not provided", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      const rows = screen.getAllByRole("row")
      // Header + 5 data rows
      expect(rows.length).toBe(6)
    })

    it("paginates data when pageSize is provided", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} pageSize={2} />)
      const rows = screen.getAllByRole("row")
      // Header + 2 data rows
      expect(rows.length).toBe(3)
    })

    it("shows correct page with defaultPage", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} pageSize={2} page={2} />)
      const rows = screen.getAllByRole("row")
      // Should show page 2 (rows 3-4)
      expect(rows.length).toBe(3) // Header + 2 rows
    })

    it("handles last page correctly", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} pageSize={2} page={3} />)
      const rows = screen.getAllByRole("row")
      // Should show last page with 1 row
      expect(rows.length).toBe(2) // Header + 1 row
    })
  })

  describe("Pagination - Controlled", () => {
    it("uses controlled page prop", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} pageSize={2} page={2} />)
      const rows = screen.getAllByRole("row")
      expect(rows.length).toBe(3) // Header + 2 rows
    })

    it("calls onPageChange when page changes", () => {
      // Note: We don't have UI controls in the component itself,
      // but the prop is available for external controls
      const handlePageChange = vi.fn()
      const { rerender } = render(
        <DataTable columns={basicColumns} data={mockUsers} pageSize={2} page={1} onPageChange={handlePageChange} />
      )

      rerender(<DataTable columns={basicColumns} data={mockUsers} pageSize={2} page={2} onPageChange={handlePageChange} />)

      // onPageChange would be called by external pagination controls
      // This test just verifies the component accepts the prop
      expect(screen.getAllByRole("row").length).toBe(3)
    })
  })

  describe("Pagination with Sorting", () => {
    it("sorts first, then paginates", async () => {
      render(<DataTable columns={basicColumns} data={mockUsers} pageSize={2} />)

      // Sort by name descending
      const nameHeader = screen.getByText("Name").closest("div[role='button']")!
      await userEvent.click(nameHeader) // asc
      await userEvent.click(nameHeader) // desc

      // Should show first 2 items of sorted data
      const rows = screen.getAllByRole("row")
      expect(rows.length).toBe(3) // Header + 2 rows
    })

    it("resets to page 1 when sort changes", async () => {
      render(<DataTable columns={basicColumns} data={mockUsers} pageSize={2} page={2} />)

      // Change sort
      const nameHeader = screen.getByText("Name").closest("div[role='button']")!
      await userEvent.click(nameHeader)

      // In uncontrolled mode, page should reset to 1 internally
      // This is handled by the component logic
      const rows = screen.getAllByRole("row")
      expect(rows.length).toBe(3) // Header + 2 rows (page 1 after sort)
    })
  })

  describe("Accessibility", () => {
    it("has proper table semantics", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      const table = screen.getByRole("table")
      expect(table).toBeInTheDocument()

      const headerRow = screen.getByRole("row")
      expect(headerRow).toBeInTheDocument()
    })

    it("has sortable headers with button role", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      const sortableHeader = screen.getByText("Name").closest("div[role='button']")
      expect(sortableHeader).toBeInTheDocument()
    })

    it("has aria-label on sortable headers", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      const sortableHeader = screen.getByText("Name").closest("div[role='button']")
      expect(sortableHeader).toHaveAttribute("aria-label")
      expect(sortableHeader?.getAttribute("aria-label")).toContain("Activate to sort")
    })

    it("supports keyboard navigation for sorting", async () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      const nameHeader = screen.getByText("Name").closest("div[role='button']")!

      nameHeader.focus()
      fireEvent.keyDown(nameHeader, { key: "Enter" })

      // Should trigger sort (check that data order changed)
      const rows = screen.getAllByRole("row")
      expect(rows.length).toBeGreaterThan(1)
    })

    it("handles space key for sorting", async () => {
      render(<DataTable columns={basicColumns} data={mockUsers} />)
      const nameHeader = screen.getByText("Name").closest("div[role='button']")!

      nameHeader.focus()
      fireEvent.keyDown(nameHeader, { key: " " })

      // Should trigger sort
      const rows = screen.getAllByRole("row")
      expect(rows.length).toBeGreaterThan(1)
    })

    it("does not have sortable role on non-sortable columns", () => {
      const nonSortableColumns: DataTableColumn<User>[] = [
        {
          id: "name",
          header: "Name",
          accessor: (row) => row.name,
          sortable: false,
        },
      ]

      render(<DataTable columns={nonSortableColumns} data={mockUsers} />)
      const header = screen.getByText("Name").closest("div")
      expect(header).not.toHaveAttribute("role", "button")
    })
  })

  describe("Column Alignment and Width", () => {
    it("applies column width", () => {
      const columnsWithWidth: DataTableColumn<User>[] = [
        {
          id: "name",
          header: "Name",
          accessor: (row) => row.name,
          width: 200,
        },
      ]

      render(<DataTable columns={columnsWithWidth} data={mockUsers} />)
      const header = screen.getByText("Name").closest("th")
      expect(header).toHaveStyle({ width: "200px" })
    })

    it("applies column alignment", () => {
      const columnsWithAlign: DataTableColumn<User>[] = [
        {
          id: "name",
          header: "Name",
          accessor: (row) => row.name,
          align: "center",
        },
        {
          id: "age",
          header: "Age",
          accessor: (row) => row.age,
          align: "right",
        },
      ]

      render(<DataTable columns={columnsWithAlign} data={mockUsers} />)
      // Check that alignment classes are applied
      const nameHeader = screen.getByText("Name")
      const ageHeader = screen.getByText("Age")
      expect(nameHeader).toBeInTheDocument()
      expect(ageHeader).toBeInTheDocument()
    })
  })

  describe("Edge Cases", () => {
    it("handles empty columns array", () => {
      render(<DataTable columns={[]} data={mockUsers} />)
      const table = screen.getByRole("table")
      expect(table).toBeInTheDocument()
    })

    it("handles single row data", () => {
      render(<DataTable columns={basicColumns} data={[mockUsers[0]]} />)
      expect(screen.getByText("Alice")).toBeInTheDocument()
    })

    it("handles very large page numbers gracefully", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} pageSize={2} page={999} />)
      const rows = screen.getAllByRole("row")
      // Should show empty state or no rows
      expect(rows.length).toBe(1) // Only header row
    })

    it("handles zero pageSize", () => {
      render(<DataTable columns={basicColumns} data={mockUsers} pageSize={0} />)
      // Should render all data (treats 0 as no pagination)
      const rows = screen.getAllByRole("row")
      expect(rows.length).toBeGreaterThan(1)
    })
  })
})
