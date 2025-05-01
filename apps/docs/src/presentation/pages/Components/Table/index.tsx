import { Table } from "@vbss-ui/table"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { InteractiveExampleContainer } from "@/presentation/components/InteractiveExampleContainer"

import * as S from "../../styles"
import {
  basicExampleCode,
  basicHeaders,
  basicRows,
  customizingClassExampleCode,
  customizingExampleCode,
  footer,
  footerExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  styledFooter,
  styledFooterExampleCode,
  styledHeaders,
  styledHeadersExampleCode,
  styledRows,
  styledRowsExampleCode,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const TableDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Table</S.Title>
          <S.SubTitle>A customizable and accessible Table component.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Table</strong> component is a flexible and feature-rich data display component that supports headers,
              rows, and footers. It offers various styling options, including different variants, sizes, and customizable content.
              The component is built with accessibility in mind and provides a clean, modern interface for displaying tabular
              data.
            </S.Paragraph>
            <ExampleContainer code={basicExampleCode}>
              <Table headers={basicHeaders} rows={basicRows} />
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Table</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/table"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/table"} language="sh" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="usage" />
              Usage
            </S.SectionTitle>
            <S.Paragraph>After installation, import the component and use it in your project:</S.Paragraph>
            <CodeSnippet code={usageExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>Table</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["primary", "secondary", "outline", "ghost"]}
              targetProp="variant"
              code={`<Table headers={headers} rows={rows} variant='variant' />`}
            >
              <Table headers={basicHeaders} rows={basicRows} />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["none", "sm", "md", "lg", "xl"]}
              targetProp="rounded"
              code={`<Table headers={headers} rows={rows} rounded='rounded' />`}
              initIndex={2}
            >
              <Table headers={basicHeaders} rows={basicRows} />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="outline" />
              Outline
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a border around the <strong>Table</strong> using the <code>outline</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Table outline={false} headers={basicHeaders} rows={basicRows} />
              <Table outline={true} headers={basicHeaders} rows={basicRows} />
            </ExampleContainer>
            <CodeSnippet code="<Table outline={false} headers={headers} rows={rows} />" language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="height" />
              Height
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the height of table rows using the <code>height</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="height"
              code={`<Table headers={headers} rows={rows} height='height' />`}
              initIndex={2}
            >
              <Table headers={basicHeaders} rows={basicRows} />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>Table</strong> using the <code>fontSize</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="fontSize"
              code={`<Table headers={headers} rows={rows} fontSize='fontSize' />`}
              initIndex={2}
            >
              <Table headers={basicHeaders} rows={basicRows} />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>Table</strong> using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["thin", "light", "normal", "medium", "bold", "extrabold"]}
              targetProp="fontWeight"
              code={`<Table headers={headers} rows={rows} fontWeight='fontWeight' />`}
              initIndex={2}
            >
              <Table headers={basicHeaders} rows={basicRows} />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="footer" />
              Footer
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a footer to the <strong>Table</strong> using the <code>footer</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Table headers={basicHeaders} rows={basicRows} footer={footer} />
            </ExampleContainer>
            <CodeSnippet code={footerExampleCode} language="tsx" />
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
              <Table style={{ backgroundColor: "green", color: "white" }} headers={basicHeaders} rows={basicRows} />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customTable">
                <Table headers={basicHeaders} rows={basicRows} footer={footer} />
              </div>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="styled-headers" />
              Styled Headers
            </S.SectionSubTitle>
            <S.Paragraph>Customize the appearance of table headers:</S.Paragraph>
            <ExampleContainer>
              <Table variant="primary" headers={styledHeaders} rows={basicRows} />
            </ExampleContainer>
            <CodeSnippet code={styledHeadersExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="styled-rows" />
              Styled Rows
            </S.SectionSubTitle>
            <S.Paragraph>Customize the appearance of table rows:</S.Paragraph>
            <ExampleContainer>
              <Table variant="primary" headers={basicHeaders} rows={styledRows} />
            </ExampleContainer>
            <CodeSnippet code={styledRowsExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="styled-footer" />
              Styled Footer
            </S.SectionSubTitle>
            <S.Paragraph>Customize the appearance of table footer:</S.Paragraph>
            <ExampleContainer>
              <Table headers={basicHeaders} rows={basicRows} footer={styledFooter} />
            </ExampleContainer>
            <CodeSnippet code={styledFooterExampleCode} language="tsx" />
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Table" sections={sections} />
    </>
  )
}
