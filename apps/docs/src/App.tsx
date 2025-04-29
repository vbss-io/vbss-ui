import { RouterProvider } from "react-router-dom"
import styled from "styled-components"

import { Header } from "@/presentation/components/Header"
import { Sidebar } from "@/presentation/components/Sidebar"
import { DarkModeProvider } from "@/presentation/contexts/dark-mode-context"
import { router } from "@/presentation/router"

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
        <RouterProvider router={router} />
      </Main>
    </DarkModeProvider>
  )
}

export default App
