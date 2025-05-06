import { createBrowserRouter } from "react-router-dom"

import { ButtonDocs } from "@/presentation/pages/Components/Button"
import { ChipDocs } from "@/presentation/pages/Components/Chip"
import { ChipsDocs } from "@/presentation/pages/Components/Chips"
import { DialogDocs } from "@/presentation/pages/Components/Dialog"
import { DropdownMenuDocs } from "@/presentation/pages/Components/DropdownMenu"
import { HistoryNavDocs } from "@/presentation/pages/Components/HistoryNav"
import { InputDocs } from "@/presentation/pages/Components/Input"
import { InputNumberDocs } from "@/presentation/pages/Components/InputNumber"
import { PopoverDocs } from "@/presentation/pages/Components/Popover"
import { RadioGroupDocs } from "@/presentation/pages/Components/RadioGroup"
import { SwitchDocs } from "@/presentation/pages/Components/Switch"
import { TableDocs } from "@/presentation/pages/Components/Table"
import { TextareaDocs } from "@/presentation/pages/Components/Textarea"
import { TooltipDocs } from "@/presentation/pages/Components/Tooltip"
import { Colors } from "@/presentation/pages/GettingStarted/Colors"
import { Installation } from "@/presentation/pages/GettingStarted/Installation"
import { Introduction } from "@/presentation/pages/GettingStarted/Introduction"
import { NotFound } from "@/presentation/pages/NotFound"
import { CheckboxDocs } from "../pages/Components/Checkbox"

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
    path: "/checkbox",
    element: <CheckboxDocs />,
  },
  {
    path: "/dialog",
    element: <DialogDocs />,
  },
  {
    path: "/dropdown-menu",
    element: <DropdownMenuDocs />,
  },
  {
    path: "/history-nav",
    element: <HistoryNavDocs />,
  },
  {
    path: "/input",
    element: <InputDocs />,
  },
  {
    path: "/input-number",
    element: <InputNumberDocs />,
  },
  {
    path: "/popover",
    element: <PopoverDocs />,
  },
  {
    path: "/radio-group",
    element: <RadioGroupDocs />,
  },
  {
    path: "/textarea",
    element: <TextareaDocs />,
  },
  {
    path: "/tooltip",
    element: <TooltipDocs />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
])
