import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

export const NotFoundText = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const NotFound404 = styled.div`
  font-size: 6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
`

export const NotFound404Text = styled.div`
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`