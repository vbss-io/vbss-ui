import styled, { keyframes } from "styled-components"

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0 1.25rem 0;
  position: relative;
`

export const TitleRow = styled.span`
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
`

export const VersionTag = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
`

export const TriggerWrapper = styled.div`
  position: relative;
  width: 100%;
  display: inline-flex;
  align-items: center;
`

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
`

export const PulsingDot = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  animation: ${pulse} 1.5s ease-in-out infinite;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.5rem;
  color: #ffffff;
`

export const Entry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.75rem;
  &:last-child {
    border-bottom: none;
  }
`

export const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const EntryVersion = styled.span`
  font-weight: 700;
  color: #ffffff;
`

export const EntryDate = styled.span`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
`

export const List = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  color: #ffffff;
  li {
    line-height: 1.6;
  }
`
