import styled from "styled-components"

interface SidebarProps {
  isOpen?: boolean
}

interface NavLinkProps {
  disabled?: boolean
}

export const SidebarContainer = styled.aside<SidebarProps>`
  display: none;
  position: fixed;
  top: 3.5rem;
  bottom: 0;
  overflow-y: auto;

  @media ${({ theme }) => theme.media.lg} {
    display: block;
    width: 12rem;
    background-color: ${({ theme }) => theme.colors.background};
    transition: transform 0.2s ease-in-out;
  }

  &[data-mobile="true"] {
    display: block;
    top: 0rem;
    width: 100%;
    height: 100vh;
    padding: 3rem 1rem;
  }
`

export const Nav = styled.nav`
  padding: 0.5rem 1rem;
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1.5rem;

  &:first-child {
    margin-top: 0;
  }
`

export const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`

export const NavLink = styled.div<NavLinkProps>`
  a {
    width: 100%;
    justify-content: start;
    padding: 1rem 1rem;
    line-height: 1rem;
    color: ${({ theme }) => theme.colors.muted};
    background-color: transparent;
    border: none;

    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent};
      color: white;
    }

    span {
      font-size: 0.75rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.muted};
    }
  }

  &[data-active="true"] a {
    color: white;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`
