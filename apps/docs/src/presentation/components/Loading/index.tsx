import * as S from "./styles"

export function LoadingFallback() {
  return (
    <S.LoadingContainer>
      <S.Spinner />
    </S.LoadingContainer>
  )
}
