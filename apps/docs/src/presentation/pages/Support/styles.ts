import styled from "styled-components"

export const FeatureTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`

export const SupportCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f9fafb;
`

export const SupportCardContent = styled.div`
  flex: 1;
`

export const SupportCardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

export const SupportCardDescription = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.6;
`

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
`

export const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const FeatureDescription = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.6;
`

export const ThankYouCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f0f9ff;
  border-radius: 0.5rem;
  margin-top: 2rem;
  min-height: 200px;
`

export const ThankYouIcon = styled.div`
  color: hsl(248 39% 39%);
  font-size: 3rem;
  margin-bottom: 1rem;
`

export const ThankYouText = styled.p`
  margin: 0;
  color: hsl(248 39% 39%);
  font-size: 1.125rem;
  text-align: center;
`
