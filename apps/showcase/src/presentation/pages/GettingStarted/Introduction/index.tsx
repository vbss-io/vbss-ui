import { ContentSidebar } from "@/presentation/components/ContentSidebar";

import * as S from "../../styles"
import { sections } from "./sections";

export const Introduction = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Introduction</S.Title>
          <S.SubTitle>
            Build beautiful UIs with minimal effort
          </S.SubTitle>
          <section>
            <S.Paragraph>
              <strong>vbss-ui</strong> is a modern and customizable UI components library designed to simplify the process of building web applications.
              With <strong>vbss-ui</strong>, you can create responsive and attractive interfaces using a minimal setup, just import the components you need, and you&apos;re ready to go!
            </S.Paragraph>
            <S.Paragraph>
              Each component is available as an independent package, allowing you to keep your project lightweight by installing only what you need.
            </S.Paragraph>
          </section>
          <S.SectionDivider/>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='built-with-modern-technologies'/>
              Built with Modern Technologies
            </S.SectionTitle>
            <S.Paragraph>
              <strong>vbss-ui</strong> is built with the latest frontend technologies to ensure performance, maintainability, and ease of use:
            </S.Paragraph>
            <S.List>
              <li><strong>React</strong> for a declarative UI development experience</li>
              <li><strong>TypeScript</strong> for type safety and better developer experience</li>
              <li><strong>Tailwind CSS</strong> for rapid and consistent styling</li>
              <li><strong>Monorepo managed with Lerna</strong> for scalable package management</li>
              <li><strong>Built with Vite</strong> for fast development and optimized builds</li>
            </S.List>
          </section>
          <S.SectionDivider/>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='built-in-typeScript-support'/>
              Built-in TypeScript Support
            </S.SectionTitle>
            <S.Paragraph>
              No need to install additional type definitions, <strong>vbss-ui</strong> comes with <strong>built-in TypeScript support</strong>. This ensures a seamless development experience with autocompletion and type checking out of the box.
            </S.Paragraph>
          </section>
          <S.SectionDivider/>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='open-source-e-community-driven'/>
              Open Source & Community-Driven
            </S.SectionTitle>
            <S.Paragraph>
            <strong>vbss-ui</strong> is an open-source project, and the code is available on <a href='https://github.com/vbss-io/vbss-ui' target="_blank" rel="noreferrer">GitHub</a>. Contributions and feature requests are always welcome! If you have suggestions, issues, or ideas, feel free to open a pull request or an issue on the repository.
            </S.Paragraph>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title='Introduction' sections={sections}/>
    </>
  )
}