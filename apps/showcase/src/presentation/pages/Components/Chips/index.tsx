import { Chips } from "@vbss-ui/chips"
import { Table } from "@vbss-ui/table"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"

import * as S from "../../styles"
import {
  chipPropsExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  flexDirectionExampleCode,
  gapExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const ChipsDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Chips</S.Title>
          <S.SubTitle>Wrapper component for multiple Chip elements.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Chips</strong> component is a flexible container designed to render
              multiple <strong>Chip</strong> components in a customizable layout. It supports layout
              direction, spacing between chips, and allows passing shared props to chips.
            </S.Paragraph>
            <ExampleContainer code='<Chips chips={["Design", "Development", "Marketing"]} />'>
              <Chips chips={["Design", "Development", "Marketing"]} />
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Chips</strong> component, run one of the following
              commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/chips"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/chips"} language="sh" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="usage" />
              Usage
            </S.SectionTitle>
            <S.Paragraph>
              After installation, import the component and use it in your project:
            </S.Paragraph>
            <CodeSnippet code={usageExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-variants" />
              Gap
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the space between the <strong>Chips</strong> using the <code>gap</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Chips chips={["sm", "sm"]} gap="sm" />
              <Chips chips={["md", "md"]} gap="md" />
              <Chips chips={["lg", "lg"]} gap="lg" />
            </ExampleContainer>
            <CodeSnippet code={gapExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-variants" />
              Flex Direction
            </S.SectionSubTitle>
            <S.Paragraph>
              Defines the layout direction of the <strong>Chips</strong> (horizontal or vertical)
              using the <code>flexDirection</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Chips flexDirection="col" chips={["Chip 1", "Chip 2"]} />
            </ExampleContainer>
            <CodeSnippet code={flexDirectionExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-variants" />
              Chip Props
            </S.SectionSubTitle>
            <S.Paragraph>
              Defines the props applied to each individual <strong>Chip</strong> using the{" "}
              <code>chipProps</code> (See <a href="chip">Chip Props</a>) prop:
            </S.Paragraph>
            <ExampleContainer>
              <Chips
                chipsProps={{
                  variant: "outline",
                }}
                chips={["Chip 1", "Chip 2"]}
              />
            </ExampleContainer>
            <CodeSnippet code={chipPropsExampleCode} language="tsx" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="props" />
              Props
            </S.SectionTitle>
            <S.TableSection>
              <Table
                variant="primary"
                headers={propsTableHeaders}
                rows={propsTableRows.map((row) => ({ ...row, style: { color: "white" } }))}
                fontSize="sm"
              />
            </S.TableSection>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="customization" />
              Customization
            </S.SectionTitle>
            <S.Paragraph>
              You can extend the default styles by passing custom <code>styles</code> names using{" "}
              <code>className</code> or <code>style</code>.
            </S.Paragraph>
            <ExampleContainer code={customizingExampleCode}>
              <Chips
                chips={["Chip 1", "Chip 2"]}
                style={{ backgroundColor: "red", padding: "1rem", borderRadius: "1rem" }}
              />
              <Chips
                chips={["Chip 1", "Chip 2"]}
                style={{ backgroundColor: "green", padding: "1rem", borderRadius: "1rem" }}
              />
            </ExampleContainer>
            <S.Paragraph>
              Or you can use the default component className <code>chip</code>.
            </S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="custom-chips">
                <Chips chips={["Chip 1", "Chip 2"]} />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="ChipsDocs" sections={sections} />
    </>
  )
}
