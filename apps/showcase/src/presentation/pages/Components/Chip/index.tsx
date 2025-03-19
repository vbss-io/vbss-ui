import { Chip } from "@vbss-ui/chip";
import { Table } from "@vbss-ui/table";
import { ExampleContainer } from "@/presentation/components/ExampleContainer";
import { CodeSnippet } from "@/presentation/components/CodeSnippet";
import { ContentSidebar } from "@/presentation/components/ContentSidebar";

import * as S from "../../styles"
import { sections } from "./sections";

export const ChipDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Chip</S.Title>
          <S.SubTitle>
            Component for labels, categories, and status indicators.
          </S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Chip</strong> component is a small, customizable UI element used to display categorized information, labels, or status indicators.
              It supports different variants, sizes, and styles, making it highly flexible for various use cases.
            </S.Paragraph>
            <ExampleContainer code='<Chip>Hello World</Chip>'>
              <Chip>Hello World</Chip>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='installation'/>
              Installation
            </S.SectionTitle>
            <S.Paragraph>
            To install only the <strong>Chip</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-npm'/>
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/chip"} language="sh"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-yarn'/>
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/chip"} language="sh"/>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='usage'/>
              Usage
            </S.SectionTitle>
            <S.Paragraph>
              After installation, import the component and use it in your project:
            </S.Paragraph>
            <CodeSnippet code={usageExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='variants'/>
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
            <CodeSnippet code={variantsExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
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
            <CodeSnippet code={sizeExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
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
            <CodeSnippet code={roundedExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
              Font
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
              Change the font styles of the <strong>Chip</strong> using the <code>fontWeight</code> and <code>fontSize</code> props:
            </S.Paragraph>
            <S.List><li>fontSize:</li></S.List>
            <ExampleContainer>
              <Chip fontSize="xs">xs</Chip>
              <Chip fontSize="sm">sm</Chip>
              <Chip fontSize="md">md</Chip>
              <Chip fontSize="lg">lg</Chip>
              <Chip fontSize="xl">xl</Chip>
            </ExampleContainer>
            <CodeSnippet code={fontSizeExampleCode} language="tsx"/>
            <S.List><li>fontWeight:</li></S.List>
            <ExampleContainer>
              <Chip fontWeight="thin">thin</Chip>
              <Chip fontWeight="light">light</Chip>
              <Chip fontWeight="normal">normal</Chip>
              <Chip fontWeight="medium">medium</Chip>
              <Chip fontWeight="bold">bold</Chip>
              <Chip fontWeight="extrabold">extrabold</Chip>
            </ExampleContainer>
            <CodeSnippet code={fontWeightExampleCode} language="tsx"/>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='props'/>
              Props
            </S.SectionTitle>
            <Table variant="primary" headers={propsTableHeaders} rows={propsTableRows}/>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='customization'/>
              Customization
            </S.SectionTitle>
            <S.Paragraph>
              You can extend the default styles by passing custom class names using <code>className</code> or <code>style</code>.
            </S.Paragraph>
            <ExampleContainer code={customizingExampleCode}>
              <Chip style={{ backgroundColor: "red", border: "1px solid red" }}>Example</Chip>
              <Chip style={{ backgroundColor: "green", border: "1px solid green" }}>Example</Chip>
              <Chip style={{ backgroundColor: "blue", border: "1px solid blue" }}>Example</Chip>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title='ChipDocs' sections={sections}/>
    </>
  )
}

const usageExampleCode = `import { Chip } from "@vbss-ui/chip";

export const App = () => {
  return <Chip>Example Chip</Chip>;
}`

const variantsExampleCode = "<Chip variant=\"primary\">Example Chip</Chip>"
const sizeExampleCode = "<Chip size=\"sm\">Example Chip</Chip>"
const roundedExampleCode = "<Chip rounded=\"md\">Example Chip</Chip>"
const fontSizeExampleCode = "<Chip fontSize=\"xs\">Example Chip</Chip>"
const fontWeightExampleCode = "<Chip fontWeight=\"normal\">Example Chip</Chip>"
const customizingExampleCode = `<Chip style={{ backgroundColor: "red", border: "1px solid red" }}>Example</Chip>
<Chip style={{ backgroundColor: "green", border: "1px solid green" }}>Example</Chip>
<Chip style={{ backgroundColor: "blue", border: "1px solid blue" }}>Example</Chip>`

const propsTableHeaders = [
  { content: "Props" },
  { content: "Type" },
  { content: "Description" },
  { content: "Default" },
]

const propsTableRows = [
  { variant: "variant", Type: "primary | secondary | outline", Description: "Defines the visual style of the chip.", Default: "primary" },
  { variant: "size", Type: "sm | md | lg", Description: "Specifies the size of the chip.", Default: "md" },
  { variant: "rounded", Type: "none | sm | md | lg | full", Description: "Determines the border radius of the chip.", Default: "md" },
  { variant: "fontSize", Type: "xs | sm | md | lg | xl", Description: "Sets the font size of the chip text.", Default: "md" },
  { variant: "as", Type: "React.ElementType", Description: "Defines the HTML element or component to render.", Default: "div" },
  { variant: "children", Type: "string | React.ReactNode", Description: "Content to be displayed inside the chip.", Default: "-" },
  { variant: "className", Type: "string", Description: "Additional CSS classes for custom styling.", Default: "-" },
  { variant: "style", Type: "React.CSSProperties", Description: "Additional style for custom styling.", Default: "-" },
]