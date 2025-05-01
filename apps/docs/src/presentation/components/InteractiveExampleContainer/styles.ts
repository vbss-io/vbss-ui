import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`
export const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  place-content: center;
  place-items: center;
  gap: 1rem;
`

export const Controls = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`

export const CodeContainer = styled.div`
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`
