import { createBrowserRouter } from "react-router-dom";
import { Introduction } from "@/presentation/pages/GettingStarted/Introduction";
import { Installation } from "@/presentation/pages/GettingStarted/Installation";
import { Colors } from "@/presentation/pages/GettingStarted/Colors";
import { ChipDocs } from "@/presentation/pages/Components/Chip";
import { ChipsDocs } from "@/presentation/pages/Components/Chips"
import { NotFound } from "@/presentation/pages/NotFound";

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
    path: "/*",
    element: <NotFound />,
  }
]);