import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { DropdownMenu, dropdownMenuItemStyles, dropdownMenuSeparatorStyle, dropdownMenuStyles } from "./index"

const menus = [{ item: "Profile" }, { item: "Settings" }, { item: "separator" }, { item: "Logout" }]

const renderMenu = (props: Partial<Parameters<typeof DropdownMenu>[0]> = {}) =>
  render(<DropdownMenu trigger={<span>Open menu</span>} menus={menus} {...props} />)

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByText("Open menu"))
  return screen.findByRole("menu")
}

describe("DropdownMenu", () => {
  describe("rendering", () => {
    it("renders only the trigger while closed", () => {
      renderMenu()
      expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "menu")
      expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false")
      expect(screen.queryByRole("menu")).toBeNull()
    })

    it("renders the provided trigger content inside the trigger button", () => {
      renderMenu()
      expect(screen.getByRole("button")).toHaveClass("dropdownMenuTrigger")
      expect(screen.getByRole("button")).toContainElement(screen.getByText("Open menu"))
    })

    it("renders a default empty trigger when none is given", () => {
      render(<DropdownMenu menus={menus} />)
      const trigger = screen.getByRole("button")
      expect(trigger).toHaveClass("dropdownMenuTrigger")
      expect(trigger.querySelector("div")).not.toBeNull()
    })

    it("exposes the display name", () => {
      expect(DropdownMenu.displayName).toBe("DropdownMenu")
    })
  })

  describe("opening and closing", () => {
    it("opens on click and renders the items", async () => {
      const user = userEvent.setup()
      renderMenu()
      const menu = await openMenu(user)
      expect(screen.getByText("Open menu").closest("button")).toHaveAttribute("aria-expanded", "true")
      expect(menu).toHaveClass("dropdownMenuContent")
      expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual(["Profile", "Settings", "Logout"])
    })

    it("opens from the keyboard with Enter", async () => {
      const user = userEvent.setup()
      renderMenu()
      await user.tab()
      await user.keyboard("{Enter}")
      expect(await screen.findByRole("menu")).toBeInTheDocument()
    })

    it("opens from the keyboard with ArrowDown and focuses the first item", async () => {
      const user = userEvent.setup()
      renderMenu()
      await user.tab()
      await user.keyboard("{ArrowDown}")
      expect(await screen.findByRole("menu")).toBeInTheDocument()
      await waitFor(() => expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveFocus())
    })

    it("closes on Escape and returns focus to the trigger", async () => {
      const user = userEvent.setup()
      renderMenu()
      await openMenu(user)
      await user.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
      expect(screen.getByRole("button")).toHaveFocus()
    })

    it("closes when an item is selected", async () => {
      const user = userEvent.setup()
      renderMenu()
      await openMenu(user)
      await user.click(screen.getByRole("menuitem", { name: "Settings" }))
      await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
    })

    it("closes when clicking outside", async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 })
      render(
        <>
          <DropdownMenu trigger={<span>Open menu</span>} menus={menus} />
          <p>outside</p>
        </>
      )
      await openMenu(user)
      await user.click(screen.getByText("outside"))
      await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
    })

    it("navigates the items with the arrow keys and selects with Enter", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      renderMenu({ menus: [{ item: <span onClick={onClick}>First</span> }, { item: <span onClick={onClick}>Second</span> }] })
      await user.tab()
      await user.keyboard("{ArrowDown}")
      await waitFor(() => expect(screen.getByRole("menuitem", { name: "First" })).toHaveFocus())
      await user.keyboard("{ArrowDown}")
      expect(screen.getByRole("menuitem", { name: "Second" })).toHaveFocus()
      await user.keyboard("{Enter}")
      await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
    })

    it("runs the handler of an interactive item node when clicked", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      renderMenu({ menus: [{ item: <span onClick={onClick}>Action</span> }] })
      await openMenu(user)
      await user.click(screen.getByText("Action"))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("content", () => {
    it("renders no label by default", async () => {
      const user = userEvent.setup()
      renderMenu()
      await openMenu(user)
      expect(document.querySelector(".dropdownMenuLabel")).toBeNull()
    })

    it("renders the menu label", async () => {
      const user = userEvent.setup()
      renderMenu({ menuLabel: "My account" })
      await openMenu(user)
      expect(screen.getByText("My account")).toHaveClass("dropdownMenuLabel", "font-bold")
    })

    it("renders a separator for the separator entry and not as an item", async () => {
      const user = userEvent.setup()
      renderMenu()
      await openMenu(user)
      expect(screen.getByRole("separator")).toHaveClass("dropdownMenuSeparator")
      expect(screen.queryByText("separator")).toBeNull()
    })

    it("renders ReactNode items", async () => {
      const user = userEvent.setup()
      renderMenu({ menus: [{ item: <strong data-testid="rich">Rich</strong> }] })
      await openMenu(user)
      expect(screen.getByRole("menuitem")).toContainElement(screen.getByTestId("rich"))
    })

    it("renders an empty menu when no entries are given", async () => {
      const user = userEvent.setup()
      render(<DropdownMenu trigger={<span>Open menu</span>} />)
      await openMenu(user)
      expect(screen.queryAllByRole("menuitem")).toHaveLength(0)
    })

    it("places the content on the requested side", async () => {
      const user = userEvent.setup()
      const { unmount } = renderMenu({ side: "bottom" })
      await openMenu(user)
      expect(screen.getByRole("menu")).toHaveAttribute("data-side", "bottom")
      unmount()
      renderMenu()
      await openMenu(user)
      expect(screen.getByRole("menu")).toHaveAttribute("data-side", "top")
    })

    it("forwards the ref to the content element", async () => {
      const user = userEvent.setup()
      let received: unknown = null
      renderMenu({
        ref: (node: unknown) => {
          received = node
        },
      } as never)
      const menu = await openMenu(user)
      expect(received).toBe(menu)
    })

    it("passes content props through", async () => {
      const user = userEvent.setup()
      renderMenu({ id: "account-menu", "data-custom": "yes" } as never)
      const menu = await openMenu(user)
      expect(menu).toHaveAttribute("id", "account-menu")
      expect(menu).toHaveAttribute("data-custom", "yes")
    })

    it("lets the consumer react to Escape through onEscapeKeyDown", async () => {
      const user = userEvent.setup()
      const onEscapeKeyDown = vi.fn()
      renderMenu({ onEscapeKeyDown })
      await openMenu(user)
      await user.keyboard("{Escape}")
      expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  describe("variants", () => {
    it.each([
      ["primary", "bg-primary", "bg-white"],
      ["secondary", "bg-secondary", "bg-white"],
      ["outline", "border-primary", "bg-primary"],
      ["ghost", "border-black", "bg-black"],
    ] as const)("applies the %s variant to content and separator", async (variant, contentClass, separatorClass) => {
      const user = userEvent.setup()
      renderMenu({ variant })
      await openMenu(user)
      expect(screen.getByRole("menu")).toHaveClass(contentClass)
      expect(screen.getByRole("separator")).toHaveClass(separatorClass)
    })

    it("applies the variant hover styles to the items", async () => {
      const user = userEvent.setup()
      renderMenu({ variant: "secondary" })
      await openMenu(user)
      screen.getAllByRole("menuitem").forEach((item) => expect(item).toHaveClass("dropdownMenuItem", "hover:bg-secondary/80"))
    })

    it("applies the primary variant to items by default", async () => {
      const user = userEvent.setup()
      renderMenu()
      await openMenu(user)
      expect(screen.getAllByRole("menuitem")[0]).toHaveClass("hover:bg-primary/80")
      expect(screen.getByRole("separator")).toHaveClass("bg-white")
    })

    it("applies size, rounded, fontSize, fontWeight and className to the content", async () => {
      const user = userEvent.setup()
      renderMenu({ size: "xl", rounded: "full", fontSize: "lg", fontWeight: "bold", className: "custom-menu" })
      await openMenu(user)
      expect(screen.getByRole("menu")).toHaveClass("px-6", "py-3", "rounded-full", "text-lg", "font-bold", "custom-menu")
    })

    it("uses medium defaults", async () => {
      const user = userEvent.setup()
      renderMenu()
      await openMenu(user)
      expect(screen.getByRole("menu")).toHaveClass("px-3", "py-1", "rounded-md", "text-base", "font-normal")
    })

    it("exposes the style helpers", () => {
      expect(dropdownMenuStyles({ variant: "ghost" })).toContain("border-black")
      expect(dropdownMenuItemStyles({ variant: "outline" })).toContain("hover:bg-primary/10")
      expect(Object.keys(dropdownMenuSeparatorStyle)).toEqual(["primary", "secondary", "outline", "ghost"])
    })
  })
})
