import { ContentSidebar } from "@/presentation/components/ContentSidebar"

import * as S from "../../styles"
import { sections } from "./consts"
import "./style.css"

export const TableDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Table</S.Title>
          <S.SubTitle>Development.</S.SubTitle>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="TableDocs" sections={sections} />
    </>
  )
}
