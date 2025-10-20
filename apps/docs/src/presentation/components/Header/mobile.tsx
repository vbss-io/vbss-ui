import { X } from "@phosphor-icons/react"
import { Button } from "@vbss-ui/button"

import { Sidebar } from "@/presentation/components/Sidebar"

import * as S from "./styles"

interface MobileHeaderProps {
  setShow: (value: boolean) => void
}

export const MobileHeader = ({ setShow }: MobileHeaderProps) => {
  const currentPath = window.location.pathname

  return (
    <S.MobileContainer>
      <Button className="close-menu" size="icon-xs" rounded="full" onClick={() => setShow(false)}>
        <X />
      </Button>
      <S.MobileContent>
        <S.MobileNav>
          <Button
            as="a"
            href="/introduction"
            size="xs"
            fontSize="xs"
            rounded="full"
            variant={currentPath === "/introduction" || currentPath === "/" ? "primary" : "outline"}
          >
            Documentation
          </Button>
          <Button
            as="a"
            href="/support"
            size="xs"
            fontSize="xs"
            rounded="full"
            variant={currentPath === "/support" ? "primary" : "outline"}
          >
            Support
          </Button>
        </S.MobileNav>
        <Sidebar isMobile />
      </S.MobileContent>
    </S.MobileContainer>
  )
}
