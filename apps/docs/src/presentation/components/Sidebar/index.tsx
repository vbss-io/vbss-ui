import { components } from "@/presentation/consts/components"
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
    <S.SidebarContainer data-mobile={isMobile}>
      <S.Nav>
        <S.Section>
          <S.Title>Getting Started</S.Title>
          <S.NavLink data-active={currentPath === "/introduction"}>
            <Button as="a" href="/introduction">
              Introduction
            </Button>
          </S.NavLink>
          <S.NavLink data-active={currentPath === "/installation"}>
            <Button as="a" href="/installation">
              Installation
            </Button>
          </S.NavLink>
          <S.NavLink data-active={currentPath === "/colors"}>
            <Button as="a" href="/colors">
              Colors
            </Button>
          </S.NavLink>
        </S.Section>
        <S.Section>
          <S.Title>Components</S.Title>
          {sortedComponents.map((component) => (
            <S.NavLink key={component.path} data-active={currentPath === component.path} disabled={component.dev}>
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
