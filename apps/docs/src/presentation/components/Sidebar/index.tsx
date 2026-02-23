import { components } from "@/presentation/consts/components"
import { tools } from "@/presentation/consts/tools"
import { Button } from "@vbss-ui/button"

import * as S from "./styles"

interface SidebarProps {
  isMobile?: boolean
}

export const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const currentPath = window.location.pathname

  const isNewComponent = (releaseDate?: string) => {
    if (!releaseDate) return false

    const release = new Date(releaseDate)
    const now = new Date()
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())

    return release > threeMonthsAgo
  }

  const sortedComponents = components.sort((a, b) => {
    const aDev = "dev" in a ? a.dev : false
    const bDev = "dev" in b ? b.dev : false
    if (aDev !== bDev) {
      return aDev ? 1 : -1
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
          <S.NavLink data-active={currentPath === "/support"}>
            <Button as="a" href="/support">
              Support
            </Button>
          </S.NavLink>
        </S.Section>
        <S.Section>
          <S.Title>Components</S.Title>
          {sortedComponents.map((component) => {
            const isDev = "dev" in component ? (component.dev as boolean) : false
            const hasReleaseDate = "releaseDate" in component
            const releaseDate = hasReleaseDate ? (component.releaseDate as string | undefined) : undefined
            return (
              <S.NavLink key={component.path} data-active={currentPath === component.path} disabled={isDev}>
                <Button as="a" href={component.path}>
                  {component.name as string}
                  {isDev && <span>Dev</span>}
                  {hasReleaseDate && releaseDate && isNewComponent(releaseDate) && <S.NewBadge>New</S.NewBadge>}
                </Button>
              </S.NavLink>
            )
          })}
        </S.Section>
        <S.Section>
          <S.Title>Tools</S.Title>
          {tools.map((tool) => (
            <S.NavLink key={tool.path} data-active={currentPath === tool.path}>
              <Button as="a" href={tool.path}>
                {tool.name}
              </Button>
            </S.NavLink>
          ))}
        </S.Section>
      </S.Nav>
    </S.SidebarContainer>
  )
}
