import { ContentSidebar } from "@/presentation/components/ContentSidebar";

import * as S from "../../styles"
import { sections } from "./sections";

export const ChipsDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Chips</S.Title>
          <S.SubTitle>
            Welcome to our ChipsDocs documentation. This guide will help you get started with our platform
            and understand its core concepts.
          </S.SubTitle>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title='ChipsDocs' sections={sections}/>
    </>
  )
}