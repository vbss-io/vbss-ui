import { act, render } from "@testing-library/react"

import App from "@/App"
import { router } from "@/presentation/router"

export const renderDocsAt = async (path: string) => {
  const view = render(<App />)
  await act(async () => {
    await router.navigate(path)
  })
  return view
}
