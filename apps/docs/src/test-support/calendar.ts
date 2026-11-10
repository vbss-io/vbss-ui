import { within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

export const freezeToday = () => {
  vi.useFakeTimers({ toFake: ["Date"] })
  vi.setSystemTime(new Date(2026, 10, 9, 12, 0, 0))
}

export const dayButton = (scope: HTMLElement, isoDay: string) => {
  const button = scope.querySelector<HTMLButtonElement>(`td[data-day="${isoDay}"] button`)
  if (!button) throw new Error(`no calendar day ${isoDay}`)
  return button
}

export const pickDay = async (scope: HTMLElement, isoDay: string) => {
  await userEvent.click(dayButton(scope, isoDay))
}

export const gridsIn = (scope: HTMLElement) => within(scope).queryAllByRole("grid")
