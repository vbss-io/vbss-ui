import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { InteractiveExampleContainer } from "@/presentation/components/InteractiveExampleContainer"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { HistoryNav } from "@vbss-ui/history-nav"
import { Table } from "@vbss-ui/table"
import * as S from "../../styles"
import {
  basicExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  gapExampleCode,
  iconExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
} from "./consts"
import "./style.css"

export const HistoryNavDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>History Navigation</S.Title>
          <S.SubTitle>A customizable and accessible History Navigation component.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>History Navigation</strong> component provides a simple way to navigate through history with back and
              forward buttons. It&apos;s built with accessibility in mind and offers various styling options and customization
              features.
            </S.Paragraph>
            <ExampleContainer code={basicExampleCode}>
              <HistoryNav />
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>History Navigation</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/history-nav"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/history-nav"} language="sh" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="usage" />
              Usage
            </S.SectionTitle>
            <S.Paragraph>After installation, import the component and use it in your project:</S.Paragraph>
            <CodeSnippet code={basicExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="icons" />
              Custom Icons
            </S.SectionSubTitle>
            <S.Paragraph>
              You can use any icon component with the <code>leftIcon</code> and <code>rightIcon</code> props:
            </S.Paragraph>
            <ExampleContainer code={iconExampleCode}>
              <HistoryNav leftIcon={<ArrowLeft />} rightIcon={<ArrowRight />} />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="gap" />
              Gap
            </S.SectionSubTitle>
            <S.Paragraph>
              Control the gap between buttons using the <code>gap</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="gap"
              code={gapExampleCode}
              initIndex={2}
            >
              <HistoryNav leftIcon={<ArrowLeft />} rightIcon={<ArrowRight />} />
            </InteractiveExampleContainer>
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
              You can extend the default styles by passing custom <code>styles</code> names using <code>className</code> or{" "}
              <code>style</code>.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-style" />
              Using style
            </S.SectionSubTitle>
            <S.Paragraph>You can pass custom styles directly to the component:</S.Paragraph>
            <ExampleContainer code={customizingExampleCode}>
              <HistoryNav
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
                style={{
                  padding: "1rem",
                  backgroundColor: "red",
                  color: "white",
                }}
              />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customHistoryNav">
                <HistoryNav leftIcon={<ArrowLeft />} rightIcon={<ArrowRight />} />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="History Navigation" sections={sections} />
    </>
  )
}
