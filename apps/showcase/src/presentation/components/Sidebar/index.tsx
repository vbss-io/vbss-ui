import { Button } from "@vbss-ui/button"

import * as S from "./styles"

interface SidebarProps {
  isMobile?: boolean
}

export const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const currentPath = window.location.pathname

  return (
    <S.SidebarContainer isMobile={isMobile}>
      <S.Nav>
        <S.Section>
          <S.Title>Getting Started</S.Title>
          <S.NavLink active={currentPath === "/introduction"}>
            <Button as='a'href="/introduction">Introduction</Button>
          </S.NavLink>
          <S.NavLink active={currentPath === "/installation"}>
            <Button as='a' href="/installation">Installation</Button>
          </S.NavLink>
          <S.NavLink active={currentPath === "/colors"}>
            <Button as='a' href="/colors">Colors</Button>
          </S.NavLink>
        </S.Section>
        <S.Section>
          <S.Title>Components</S.Title>
          <S.NavLink active={currentPath === "/chip"}>
            <Button as='a'href="chip">Chip</Button>
          </S.NavLink>
          <S.NavLink active={currentPath === "/chips"}>
            <Button as='a' href="chips">Chips</Button>
          </S.NavLink>
        </S.Section>
      </S.Nav>
    </S.SidebarContainer>
  )
} 