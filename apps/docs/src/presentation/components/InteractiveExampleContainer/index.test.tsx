import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithTheme } from "@/test-support/render-with-theme"
import { describe, expect, it } from "vitest"

import { InteractiveExampleContainer } from "."

const Probe = ({ size }: { size?: string }) => <output data-testid="probe">{size ?? "unset"}</output>

describe("InteractiveExampleContainer", () => {
  it("starts on the initial index and passes the selected value to the demo", () => {
    renderWithTheme(
      <InteractiveExampleContainer props={["sm", "md", "lg"]} targetProp="size" initIndex={1}>
        <Probe />
      </InteractiveExampleContainer>
    )
    expect(screen.getByTestId("probe")).toHaveTextContent("md")
  })

  it("switches the demo and rewrites the code sample when another option is picked", async () => {
    renderWithTheme(
      <InteractiveExampleContainer props={["sm", "md"]} targetProp="size" code="<Probe size='size' />">
        <Probe />
      </InteractiveExampleContainer>
    )
    expect(document.body).toHaveTextContent("<Probe size='sm' />")
    await userEvent.click(screen.getByRole("button", { name: "md" }))
    expect(screen.getByTestId("probe")).toHaveTextContent("md")
    expect(document.body).toHaveTextContent("<Probe size='md' />")
  })

  it("renders plain children untouched and omits the code area when there is no code", () => {
    renderWithTheme(
      <InteractiveExampleContainer props={["a"]} targetProp="size">
        text child
      </InteractiveExampleContainer>
    )
    expect(screen.getByText("text child")).toBeInTheDocument()
    expect(screen.queryByText("tsx")).not.toBeInTheDocument()
  })
})
