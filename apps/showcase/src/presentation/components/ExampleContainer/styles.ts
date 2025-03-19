import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  gap: 1rem
`;

export const ShowCodeButton = styled.button`
  width: 5.5rem;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px 0 8px 0;
`;