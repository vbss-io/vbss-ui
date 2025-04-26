import styled from "styled-components"

export const Sidebar = styled.aside`
  display: none;

  @media ${({ theme }) => theme.media.xlg} {
    display: block;
    position: fixed;
    right: 0;
    top: 3rem;
    bottom: 0;
    width: 12rem;
    background-color: ${({ theme }) => theme.colors.background};
    overflow-y: auto;
    padding: 1rem;
  }
`

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const NavLink = styled.a<{ indented?: boolean }>`
  font-size: 0.875rem;
  text-decoration: none;
  color: ${({ indented, theme }) => (indented ? theme.colors.muted : theme.colors.primary)};
  padding-left: ${({ indented }) => (indented ? "1rem" : "0")};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`
