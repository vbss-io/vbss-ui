import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { renderWithTheme } from "@/test-support/render-with-theme"

import { InputDocs } from "."

describe("InputDocs", () => {
  it("validates the login form field by field before submitting", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {})
    renderWithTheme(<InputDocs />)
    await userEvent.click(screen.getByRole("button", { name: "Sign In" }))
    expect(screen.getByText("Email is required")).toBeInTheDocument()
    await userEvent.type(screen.getAllByPlaceholderText("Enter your email")[0], "a@b.co")
    await userEvent.click(screen.getByRole("button", { name: "Sign In" }))
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument()
    expect(screen.getByText("Password is required")).toBeInTheDocument()
    await userEvent.type(screen.getAllByPlaceholderText("Enter your password")[0], "secret")
    await userEvent.click(screen.getByRole("button", { name: "Sign In" }))
    expect(screen.queryByText("Password is required")).not.toBeInTheDocument()
    expect(log).toHaveBeenCalledWith({ email: "a@b.co", loginPassword: "secret" })
  })

  it("echoes the controlled input value", async () => {
    renderWithTheme(<InputDocs />)
    const demo = screen.getByText(/^Input value:/).parentElement as HTMLElement
    expect(demo).toHaveTextContent("Input value: Empty")
    await userEvent.type(within(demo).getByPlaceholderText("Type something..."), "docs")
    expect(demo).toHaveTextContent("Input value: docs")
  })

  it("types into the password demo and runs the button demo action", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {})
    renderWithTheme(<InputDocs />)
    const passwords = screen.getAllByPlaceholderText("Enter your password")
    await userEvent.type(passwords[1], "hunter2")
    expect(passwords[1]).toHaveValue("hunter2")
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }))
    expect(log).toHaveBeenCalledWith("Subscribed!")
  })

  it("toggles the password visibility from the keyboard with the labelled button", async () => {
    renderWithTheme(<InputDocs />)
    const toggle = screen.getAllByRole("button", { name: "Show password" })[0]
    expect(toggle).toHaveAttribute("aria-pressed", "false")
    toggle.focus()
    await userEvent.keyboard("{Enter}")
    expect(screen.getAllByRole("button", { name: "Hide password" })[0]).toHaveAttribute("aria-pressed", "true")
  })
})
