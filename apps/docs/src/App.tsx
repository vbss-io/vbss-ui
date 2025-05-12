import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"

import { Header } from "@/presentation/components/Header"
import { LoadingFallback } from "@/presentation/components/Loading"
import { Sidebar } from "@/presentation/components/Sidebar"
import { DarkModeProvider } from "@/presentation/contexts/dark-mode-context"
import { router } from "@/presentation/router"
import styled from "styled-components"

const Main = styled.div`
  display: flex;
  padding-top: 3rem;
`

function App() {
  return (
    <DarkModeProvider>
      <Header />
      <Main>
        <Sidebar />
        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </Main>
    </DarkModeProvider>
  )
}

export default App
