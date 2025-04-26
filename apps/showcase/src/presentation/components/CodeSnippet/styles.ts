import styled from "styled-components"

export const CodeWrapper = styled.div`
  position: relative;
  background: #282a36;
  border-radius: 8px;
  overflow: hidden;
  font-size: 14px;
  margin: 16px 0;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 8px 12px;
  color: #f8f8f2;
  font-size: 12px;
  font-weight: bold;
`

export const CopyButton = styled.button`
  background: none;
  border: none;
  color: #f8f8f2;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`
