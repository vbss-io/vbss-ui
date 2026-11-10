import { render, screen, within } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { footerStyle, headerStyle, heightTable, rowStyle, Table, tableStyles, variantTable } from "./index"

const headers = [{ content: "Name" }, { content: "Role" }]
const rows = [
  { name: "Ana", role: "Admin" },
  { name: "Bruno", role: "Editor" },
]

describe("Table", () => {
  describe("rendering", () => {
    it("renders an empty table with a body only", () => {
      const { container } = render(<Table />)
      expect(screen.getByRole("table")).toBeInTheDocument()
      expect(container.querySelector("thead")).toBeNull()
      expect(container.querySelector("tfoot")).toBeNull()
      expect(container.querySelector("tbody")).not.toBeNull()
      expect(screen.queryAllByRole("row")).toHaveLength(0)
    })

    it("renders the headers as column headers", () => {
      render(<Table headers={headers} />)
      expect(screen.getAllByRole("columnheader").map((header) => header.textContent)).toEqual(["Name", "Role"])
    })

    it("renders one row per entry with one cell per key", () => {
      render(<Table headers={headers} rows={rows} />)
      expect(screen.getAllByRole("row")).toHaveLength(3)
      const cells = screen.getAllByRole("cell").map((cell) => cell.textContent)
      expect(cells).toEqual(["Ana", "Admin", "Bruno", "Editor"])
    })

    it("renders ReactNode content in headers and cells", () => {
      render(
        <Table
          headers={[{ content: <em data-testid="head">Title</em> }]}
          rows={[{ a: <strong data-testid="cell">Bold</strong> }]}
          footer={{
            content: [
              <span key="f" data-testid="foot">
                Total
              </span>,
            ],
          }}
        />
      )
      expect(screen.getByTestId("head").closest("th")).not.toBeNull()
      expect(screen.getByTestId("cell").closest("td")).toHaveClass("btd")
      expect(screen.getByTestId("foot").closest("td")).toHaveClass("ftd")
    })

    it("renders the footer cells", () => {
      const { container } = render(<Table rows={rows} footer={{ content: ["Total", "2"] }} />)
      const footer = container.querySelector("tfoot") as HTMLElement
      expect(
        within(footer)
          .getAllByRole("cell")
          .map((cell) => cell.textContent)
      ).toEqual(["Total", "2"])
    })

    it("keeps row order and content as given", () => {
      render(<Table rows={[{ a: "1" }, { a: "2" }, { a: "3" }]} />)
      expect(screen.getAllByRole("cell").map((cell) => cell.textContent)).toEqual(["1", "2", "3"])
    })

    it("does not render className and style keys as cells", () => {
      render(<Table rows={[{ name: "Ana", className: "ignored", style: { color: "red" } }]} />)
      expect(screen.getAllByRole("cell")).toHaveLength(1)
      expect(screen.queryByText("ignored")).toBeNull()
    })

    it("applies the row className and style to the row, not to its cells", () => {
      const { container } = render(<Table rows={[{ a: "x", b: "y", className: "row-class", style: { color: "red" } }]} />)
      const row = container.querySelector(".btr") as HTMLElement
      expect(row).toHaveClass("row-class", "btr", "border-b")
      expect(row).toHaveStyle({ color: "rgb(255, 0, 0)" })
      screen.getAllByRole("cell").forEach((cell) => {
        expect(cell).not.toHaveClass("row-class")
        expect(cell.getAttribute("style")).toBeNull()
      })
    })

    it("styles only the rows that carry className or style", () => {
      const { container } = render(<Table rows={[{ a: "x", className: "first" }, { a: "y" }]} />)
      const [first, second] = Array.from(container.querySelectorAll(".btr"))
      expect(first).toHaveClass("first")
      expect(second).not.toHaveClass("first")
      expect(second.getAttribute("style")).toBeNull()
    })

    it("applies the header className and style", () => {
      render(<Table headers={[{ content: "H", className: "head-class", style: { width: "120px" } }]} />)
      const header = screen.getByRole("columnheader")
      expect(header).toHaveClass("head-class")
      expect(header).toHaveStyle({ width: "120px" })
    })

    it("applies the footer className and style", () => {
      render(<Table footer={{ content: ["F"], className: "foot-class", style: { color: "blue" } }} />)
      const cell = screen.getByRole("cell")
      expect(cell).toHaveClass("foot-class")
      expect(cell).toHaveStyle({ color: "rgb(0, 0, 255)" })
    })

    it("forwards the ref to the table element", () => {
      let received: unknown = null
      render(
        <Table
          ref={(node: unknown) => {
            received = node
          }}
        />
      )
      expect(received).toBe(screen.getByRole("table"))
    })

    it("accepts a ref object typed as the rendered table", () => {
      const ref = createRef<HTMLTableElement>()
      render(<Table ref={ref} />)
      expect(ref.current).toBe(screen.getByRole("table"))
    })

    it("rejects a ref typed for another element at compile time", () => {
      const ref = createRef<HTMLDivElement>()
      // @ts-expect-error a div ref does not fit a table
      render(<Table ref={ref} />)
      expect(ref.current).toBe(screen.getByRole("table"))
    })

    it("passes native table attributes through", () => {
      render(<Table aria-label="Users" id="users" />)
      expect(screen.getByRole("table", { name: "Users" })).toHaveAttribute("id", "users")
    })

    it("exposes the display name", () => {
      expect(Table.displayName).toBe("Table")
    })
  })

  describe("variants", () => {
    it.each([
      ["primary", headerStyle.primary],
      ["secondary", headerStyle.secondary],
      ["outline", headerStyle.outline],
    ] as const)("applies the %s header style", (variant, expected) => {
      render(<Table variant={variant} headers={headers} />)
      screen.getAllByRole("columnheader").forEach((header) => expect(header).toHaveClass(...expected.split(" ")))
    })

    it("applies the primary variant by default", () => {
      render(<Table headers={headers} rows={rows} footer={{ content: ["a"] }} />)
      expect(screen.getAllByRole("columnheader")[0]).toHaveClass("bg-primary", "text-white")
      expect(screen.getAllByRole("row")[1]).toHaveClass(...rowStyle.primary.split(" "))
    })

    it.each(["primary", "secondary", "outline", "ghost"] as const)(
      "applies the %s row style to header, body and footer rows",
      (variant) => {
        const { container } = render(<Table variant={variant} headers={headers} rows={rows} footer={{ content: ["a"] }} />)
        const expected = rowStyle[variant].split(" ")
        expect(container.querySelector(".htr")).toHaveClass(...expected)
        container.querySelectorAll(".btr").forEach((row) => expect(row).toHaveClass(...expected))
        expect(container.querySelector(".ftr")).toHaveClass(...expected)
      }
    )

    it("styles the ghost header with a transparent background", () => {
      render(<Table variant="ghost" headers={headers} />)
      expect(headerStyle.ghost).toContain("bg-transparent")
      screen.getAllByRole("columnheader").forEach((header) => expect(header).toHaveClass("bg-transparent"))
    })

    it.each([
      ["primary", ["bg-primary", "text-white"]],
      ["secondary", ["bg-secondary", "text-white"]],
      ["outline", ["border-primary", "text-primary"]],
      ["ghost", ["bg-transparent"]],
    ] as const)("styles the %s footer to match its header", (variant, expected) => {
      const { container } = render(<Table variant={variant} footer={{ content: ["a"] }} />)
      expect(footerStyle[variant]).toBe(expected.join(" "))
      expect(container.querySelector("tfoot")).toHaveClass(...expected)
    })

    it("does not leak a footer style of another variant", () => {
      const { container } = render(<Table variant="primary" footer={{ content: ["a"] }} />)
      expect(container.querySelector("tfoot")).not.toHaveClass("text-primary", "bg-secondary")
    })

    it("offers the full radius as rounded-3xl", () => {
      const { container } = render(<Table rounded="full" />)
      expect(tableStyles({ rounded: "full" })).toContain("rounded-3xl")
      expect(container.querySelector(".tableContainer")).toHaveClass("rounded-3xl")
    })

    it("applies rounded and outline to the container", () => {
      const { container, rerender } = render(<Table rounded="xl" />)
      expect(container.querySelector(".tableContainer")).toHaveClass("rounded-xl", "border", "border-primary")
      rerender(<Table outline={false} rounded="none" />)
      expect(container.querySelector(".tableContainer")).toHaveClass("rounded-none")
      expect(container.querySelector(".tableContainer")).not.toHaveClass("border-primary")
    })

    it("uses semibold base text for headers and medium for the footer by default", () => {
      const { container } = render(<Table headers={headers} footer={{ content: ["a"] }} />)
      expect(screen.getAllByRole("columnheader")[0]).toHaveClass("font-semibold", "text-base")
      expect(container.querySelector("tfoot")).toHaveClass("font-medium", "text-base")
    })

    it("applies fontSize and fontWeight to the table, headers and footer", () => {
      const { container } = render(<Table fontSize="lg" fontWeight="bold" headers={headers} footer={{ content: ["a"] }} />)
      expect(screen.getByRole("table")).toHaveClass("text-lg", "font-bold")
      expect(screen.getAllByRole("columnheader")[0]).toHaveClass("text-lg", "font-bold")
      expect(container.querySelector("tfoot")).toHaveClass("text-lg", "font-bold")
    })

    it("applies the row height to headers, cells and footer cells", () => {
      const { container } = render(<Table height="xl" headers={headers} rows={rows} footer={{ content: ["a"] }} />)
      const expected = heightTable({ height: "xl" }).split(" ")
      screen.getAllByRole("columnheader").forEach((cell) => expect(cell).toHaveClass(...expected))
      container.querySelectorAll(".btd").forEach((cell) => expect(cell).toHaveClass(...expected))
      container.querySelectorAll(".ftd").forEach((cell) => expect(cell).toHaveClass(...expected))
    })

    it("exposes the style helpers", () => {
      expect(variantTable({ fontSize: "xl" })).toContain("text-xl")
      expect(heightTable({ height: "md" })).not.toBe("")
      expect(tableStyles({ rounded: "lg" })).toContain("rounded-lg")
      expect(Object.keys(rowStyle)).toEqual(["primary", "secondary", "outline", "ghost"])
    })
  })
})
