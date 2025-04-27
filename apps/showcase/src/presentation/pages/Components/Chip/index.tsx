import { Chip } from "@vbss-ui/chip"
import { Table } from "@vbss-ui/table"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"

import * as S from "../../styles"
import { customizingClassExampleCode, customizingExampleCode, propsTableHeaders, propsTableRows, sections, usageExampleCode } from "./consts"
import "./style.css"

export const ChipDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Chip</S.Title>
          <S.SubTitle>Component for labels, categories, and status indicators.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Chip</strong> component is a small, customizable UI element used to display categorized information, labels, or status
              indicators. It supports different variants, sizes, and styles, making it highly flexible for various use cases.
            </S.Paragraph>
            <ExampleContainer code="<Chip>Hello World</Chip>">
              <Chip>Hello World</Chip>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Chip</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/chip"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/chip"} language="sh" />
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
              Change the visual style of the <strong>Chip</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Chip variant="primary">Primary</Chip>
              <Chip variant="secondary">Secondary</Chip>
              <Chip variant="outline">Outline</Chip>
            </ExampleContainer>
            <CodeSnippet code='<Chip variant="primary">Example Chip</Chip>' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="size" />
              Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the size of the <strong>Chip</strong> using the <code>size</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Chip size="sm">sm</Chip>
              <Chip size="md">md</Chip>
              <Chip size="lg">lg</Chip>
            </ExampleContainer>
            <CodeSnippet code='<Chip size="sm">Example Chip</Chip>' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Chip rounded="none">none</Chip>
              <Chip rounded="sm">sm</Chip>
              <Chip rounded="md">md</Chip>
              <Chip rounded="lg">lg</Chip>
              <Chip rounded="full">full</Chip>
            </ExampleContainer>
            <CodeSnippet code='<Chip rounded="md">Example Chip</Chip>' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>Chip</strong> using the <code>fontSize</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Chip fontSize="xs">xs</Chip>
              <Chip fontSize="sm">sm</Chip>
              <Chip fontSize="md">md</Chip>
              <Chip fontSize="lg">lg</Chip>
              <Chip fontSize="xl">xl</Chip>
            </ExampleContainer>
            <CodeSnippet code='<Chip fontSize="xs">Example Chip</Chip>' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>Chip</strong> using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Chip fontWeight="thin">thin</Chip>
              <Chip fontWeight="light">light</Chip>
              <Chip fontWeight="normal">normal</Chip>
              <Chip fontWeight="medium">medium</Chip>
              <Chip fontWeight="bold">bold</Chip>
              <Chip fontWeight="extrabold">extrabold</Chip>
            </ExampleContainer>
            <CodeSnippet code='<Chip fontWeight="normal">Example Chip</Chip>' language="tsx" />
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
              You can extend the default styles by passing custom <code>styles</code> names using <code>className</code> or <code>style</code>.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-style" />
              Using style
            </S.SectionSubTitle>
            <S.Paragraph>You can pass custom styles directly to the component:</S.Paragraph>
            <ExampleContainer code={customizingExampleCode}>
              <Chip style={{ backgroundColor: "red", border: "1px solid red" }}>Example</Chip>
              <Chip style={{ backgroundColor: "green", border: "1px solid green" }}>Example</Chip>
              <Chip style={{ backgroundColor: "blue", border: "1px solid blue" }}>Example</Chip>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>
              You can use the default component className <code>button</code>:
            </S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="custom-chip">
                <Chip>Example</Chip>
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="ChipDocs" sections={sections} />
    </>
  )
}
