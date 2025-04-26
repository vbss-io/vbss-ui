import { ContentSidebar } from "@/presentation/components/ContentSidebar"

import * as S from "../../styles"
import { sections } from "./consts"
import "./style.css"

export const SwitchDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Switch</S.Title>
          <S.SubTitle>Development.</S.SubTitle>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="SwitchDocs" sections={sections} />
    </>
  )
}
