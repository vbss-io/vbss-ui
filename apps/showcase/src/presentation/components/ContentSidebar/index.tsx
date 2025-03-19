import * as S from "./styles"

interface Section {
  title: string
  anchor: string
  subsections: {
    title: string
    anchor: string
  }[]
}

export type Sections = Section[]

interface ContentSidebarProps {
  title: string
  sections: Sections
} 

export const ContentSidebar = ({ title, sections }: ContentSidebarProps) => {
  return (
    <S.Sidebar>
      <S.Title>{title}</S.Title>
      <S.NavContainer>
      {
        sections?.map((section) => (
          <S.Nav key={section.anchor}>
            <S.NavLink href={`#${section.anchor}`}>{section.title}</S.NavLink>
            {
              section.subsections?.map((subsection) => (
                <S.NavLink
                  key={subsection.anchor}
                  href={`#${subsection.anchor}`}
                  indented
                >
                  {subsection.title}
                </S.NavLink>
              ))
            }
          </S.Nav>
        ))
        }
      </S.NavContainer>
    </S.Sidebar>
  );
}