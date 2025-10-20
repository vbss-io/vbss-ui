import { At, List, Moon, Sun } from "@phosphor-icons/react"
import { Button } from "@vbss-ui/button"
import { Switch } from "@vbss-ui/switch"
import { useEffect, useState } from "react"

import { useDarkMode } from "@/presentation/hooks/use-dark-mode"

import { MobileHeader } from "./mobile"
import * as S from "./styles"

export const Header = () => {
  const { darkMode, setDarkMode } = useDarkMode()
  const [showMobile, setShowMobile] = useState(false)
  const currentPath = window.location.pathname

  useEffect(() => {
    if (showMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showMobile])

  return (
    <S.Container>
      <S.Content>
        <S.LogoSection>
          <At weight="bold" />
          <span>vbss/ui</span>
        </S.LogoSection>
        <S.Nav>
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
        </S.Nav>
        <S.ConfigSection>
          <Switch
            variant="primary"
            iconOn={<Moon />}
            iconOff={<Sun />}
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <Button className="menu" size="icon-xs" rounded="full" onClick={() => setShowMobile(!showMobile)}>
            <List />
          </Button>
        </S.ConfigSection>
      </S.Content>
      {showMobile && <MobileHeader setShow={setShowMobile} />}
    </S.Container>
  )
}
