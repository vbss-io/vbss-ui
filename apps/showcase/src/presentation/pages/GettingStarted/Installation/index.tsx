import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"

import * as S from "../../styles"
import { sections } from "./sections"

export const Installation = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Installation</S.Title>
          <S.SubTitle>Adding Components to Your Project</S.SubTitle>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="install-only-what-you-need" />
              Install only what you need
            </S.SectionTitle>
            <S.Paragraph>
              Since each component is distributed as a separate package, you can install only the
              components required for your project.
            </S.Paragraph>
            <S.Paragraph>
              For example, to install the Button component, use one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/button"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/button"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="usage" />
              Usage
            </S.SectionSubTitle>
            <S.Paragraph>
              After installation, import the component and use it in your project:
            </S.Paragraph>
            <CodeSnippet code={usageExampleCode} language="tsx" />
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Installation" sections={sections} />
    </>
  )
}

const usageExampleCode = `
import { Button } from "@vbss-ui/button";

export const App = () => {
  return (
    <div>
      <Button>Click Me</Button>
    </div>
  );
}
`
