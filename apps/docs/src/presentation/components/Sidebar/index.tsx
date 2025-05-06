import { Button } from "@vbss-ui/button"

import * as S from "./styles"

interface SidebarProps {
  isMobile?: boolean
}

export const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const currentPath = window.location.pathname

  const sortedComponents = components.sort((a, b) => {
    if ((a.dev ?? false) !== (b.dev ?? false)) {
      return (a.dev ?? false) ? 1 : -1
    }
    return a.name.localeCompare(b.name)
  })

  return (
    <S.SidebarContainer isMobile={isMobile}>
      <S.Nav>
        <S.Section>
          <S.Title>Getting Started</S.Title>
          <S.NavLink active={currentPath === "/introduction"}>
            <Button as="a" href="/introduction">
              Introduction
            </Button>
          </S.NavLink>
          <S.NavLink active={currentPath === "/installation"}>
            <Button as="a" href="/installation">
              Installation
            </Button>
          </S.NavLink>
          <S.NavLink active={currentPath === "/colors"}>
            <Button as="a" href="/colors">
              Colors
            </Button>
          </S.NavLink>
        </S.Section>
        <S.Section>
          <S.Title>Components</S.Title>
          {sortedComponents.map((component) => (
            <S.NavLink key={component.path} active={currentPath === component.path} disabled={component.dev}>
              <Button as="a" href={component.path}>
                {component.name} {component.dev && <span>Dev</span>}
              </Button>
            </S.NavLink>
          ))}
        </S.Section>
      </S.Nav>
    </S.SidebarContainer>
  )
}

const components = [
  {
    name: "Chip",
    path: "/chip",
  },
  {
    name: "Chips",
    path: "/chips",
  },
  {
    name: "Button",
    path: "/button",
  },
  {
    name: "Switch",
    path: "/switch",
  },
  {
    name: "Table",
    path: "/table",
  },
  {
    name: "Checkbox",
    path: "/checkbox",
  },
  {
    name: "Dialog",
    path: "/dialog",
  },
  {
    name: "Dropdown",
    path: "/dropdown-menu",
  },
  {
    name: "History Nav",
    path: "/history-nav",
  },
  {
    name: "Input",
    path: "/input",
  },
  {
    name: "Input Number",
    path: "/input-number",
  },
  {
    name: "Popover",
    path: "/popover",
  },
  {
    name: "Radio Group",
    path: "/radio-group",
  },
  {
    name: "Textarea",
    path: "/textarea",
  },
  {
    name: "Tooltip",
    path: "/tooltip",
  },
  {
    name: "Data Table",
    path: "/data-table",
    dev: true,
  },
  {
    name: "Date Picker",
    path: "/date-picker",
    dev: true,
  },
  {
    name: "Calendar",
    path: "/calendar",
    dev: true,
  },
]
