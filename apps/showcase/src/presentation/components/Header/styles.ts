import styled from "styled-components"

export const Container = styled.header`
  position: fixed;
  height: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 50;
  width: 100%;
`

export const Content = styled.div`
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};

  span {
    font-size: 1.25rem;
    font-weight: bold;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`

export const Nav = styled.nav`
  display: none;

  @media ${({ theme }) => theme.media.md} {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
`

export const ConfigSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media ${({ theme }) => theme.media.lg} {
    .menu {
      display: none;
    }
  }
`

export const MobileContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;

  .close-menu {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.7rem 1rem;
    z-index: 1;
  }
`

export const MobileContent = styled(Content)`
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  gap: 1rem;
`

export const MobileNav = styled.nav`
  display: flex;
  gap: 0.5rem;

  a {
    width: 100%;
  }

  @media ${({ theme }) => theme.media.sm} {
    flex-direction: row;
  }

  @media ${({ theme }) => theme.media.md} {
    display: none;
  }
`
