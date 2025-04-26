import { createBrowserRouter } from "react-router-dom"

import { ButtonDocs } from "@/presentation/pages/Components/Button"
import { ChipDocs } from "@/presentation/pages/Components/Chip"
import { ChipsDocs } from "@/presentation/pages/Components/Chips"
import { SwitchDocs } from "@/presentation/pages/Components/Switch"
import { TableDocs } from "@/presentation/pages/Components/Table"
import { Colors } from "@/presentation/pages/GettingStarted/Colors"
import { Installation } from "@/presentation/pages/GettingStarted/Installation"
import { Introduction } from "@/presentation/pages/GettingStarted/Introduction"
import { NotFound } from "@/presentation/pages/NotFound"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Introduction />,
  },
  {
    path: "/introduction",
    element: <Introduction />,
  },
  {
    path: "/installation",
    element: <Installation />,
  },
  {
    path: "/colors",
    element: <Colors />,
  },
  {
    path: "/chip",
    element: <ChipDocs />,
  },
  {
    path: "/chips",
    element: <ChipsDocs />,
  },
  {
    path: "/button",
    element: <ButtonDocs />,
  },
  {
    path: "/switch",
    element: <SwitchDocs />,
  },
  {
    path: "/table",
    element: <TableDocs />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
])
