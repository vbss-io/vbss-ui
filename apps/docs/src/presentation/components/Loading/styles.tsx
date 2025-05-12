import styled from "styled-components"

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 3rem);
  width: 100%;
`

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
