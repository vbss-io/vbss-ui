import styled from "styled-components";

export const Container = styled.main`
  padding: 1rem 1rem 2rem 1rem;
  margin: 0 auto;
  
  @media ${({ theme }) => theme.media.lg} {
    padding-left: 12rem;
  }

  @media ${({ theme }) => theme.media.xlg} {
    padding-left: 0;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 55rem;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  line-height: 2.75rem;
  font-weight: bold;
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  position: relative;
`;

export const SectionSubTitle = styled.h3`
  font-size: 1.25rem;
  line-height: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  position: relative;
`;

export const SectionAnchor = styled.div`
  position: absolute;
  top: -5rem;
`

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 1.5rem;

  a {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.5;
  background-color: ${({ theme }) => theme.colors.secondary};
`
export const List = styled.ol`
  list-style: inside;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`