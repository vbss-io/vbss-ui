import styled from "styled-components"

export const ColorContainer = styled.div`
  width: 10rem;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

interface ColorProps {
  color: string
}

export const Color = styled.div<ColorProps>`
  width: 2rem;
  height: 1rem;
  border-radius: 1rem;
  background-color: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.colors.shadow};
  margin-top: 0.1rem;
`
