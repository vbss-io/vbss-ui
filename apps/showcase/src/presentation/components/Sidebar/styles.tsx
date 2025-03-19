import styled, { css } from "styled-components";

interface SidebarProps {
  isOpen?: boolean;
  isMobile?: boolean
}

interface NavLinkProps {
  active?: boolean;
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

  ${({ isMobile }) =>
    isMobile && css`
      display: block;
      top: 0rem;
      width: 100%;
      padding: 3rem 1rem;
    `
  }
`;

export const Nav = styled.nav`
  padding: 0.5rem 1rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1.5rem;

  &:first-child {
    margin-top: 0;
  }
`;

export const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const NavLink = styled.div<NavLinkProps>`
  a {
    width: 100%;
    justify-content: start;
    padding: 1rem 1rem;
    line-height: 1rem;
    color: ${({ active, theme }) => (active ? "white" : theme.colors.muted)};
    background-color: ${({ active, theme }) => (active ? theme.colors.secondary : "transparent")};
    border: none;

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent};
      color: white
    }
  }
`;