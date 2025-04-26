import { Chips } from "@vbss-ui/chips";
import { ContentSidebar } from "@/presentation/components/ContentSidebar";
import { ExampleContainer } from "@/presentation/components/ExampleContainer";
import { CodeSnippet } from "@/presentation/components/CodeSnippet";

import * as S from "../../styles"
import { sections } from "./sections";
import "./style.css"
import { Table } from "@vbss-ui/table";

export const ChipsDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Chips</S.Title>
          <S.SubTitle>
            Wrapper component for multiple Chip elements.
          </S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Chips</strong> component is a flexible container designed to render multiple <strong>Chip</strong> components in a customizable layout.
              It supports layout direction, spacing between chips, and allows passing shared props to chips.
            </S.Paragraph>
            <ExampleContainer code='<Chips chips={["Design", "Development", "Marketing"]} />'>
            <Chips chips={["Design", "Development", "Marketing"]} />
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='installation'/>
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Chips</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-npm'/>
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/chips"} language="sh"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-yarn'/>
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/chips"} language="sh"/>
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
              <S.SectionAnchor id='using-variants'/>
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
            <CodeSnippet code={gapExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
              Flex Direction
            </S.SectionSubTitle>
            <S.Paragraph>
              Defines the layout direction of the <strong>Chips</strong> (horizontal or vertical) using the <code>flexDirection</code> prop:
            </S.Paragraph>
              <ExampleContainer>
                <Chips flexDirection="col" chips={["Chip 1", "Chip 2"]} />
              </ExampleContainer>
            <CodeSnippet code={flexDirectionExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
              Chip Props
            </S.SectionSubTitle>
            <S.Paragraph>
              Defines the props applied to each individual <strong>Chip</strong> using the <code>chipProps</code> (See <a href='chip'>Chip Props</a>) prop:
            </S.Paragraph>
              <ExampleContainer>
                <Chips chipsProps={{
                  variant: "outline",
                }}
                chips={["Chip 1", "Chip 2"]} />
              </ExampleContainer>
            <CodeSnippet code={chipPropsExampleCode} language="tsx"/>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='props'/>
              Props
            </S.SectionTitle>
            <S.TableSection>
              <Table
                variant="primary"
                headers={propsTableHeaders}
                rows={propsTableRows.map((row) => ({...row, style: { color: "white" }}))}
                fontSize="sm"
              />
            </S.TableSection>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='customization'/>
              Customization
            </S.SectionTitle>
            <S.Paragraph>
              You can extend the default styles by passing custom <code>styles</code> names using <code>className</code> or <code>style</code>.
            </S.Paragraph>
            <ExampleContainer code={customizingExampleCode}>
            <Chips chips={["Chip 1", "Chip 2"]} style={{ backgroundColor: "red", padding: "1rem", borderRadius: "1rem" }} />
            <Chips chips={["Chip 1", "Chip 2"]} style={{ backgroundColor: "green", padding: "1rem", borderRadius: "1rem" }} />
            </ExampleContainer>
            <S.Paragraph>
              Or you can use the default component className <code>chip</code>.
            </S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className='custom-chips'>
                <Chips chips={["Chip 1", "Chip 2"]} />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title='ChipsDocs' sections={sections}/>
    </>
  )
}

const usageExampleCode = `import { Chips } from "@vbss-ui/chips";

export const App = () => {
  return <Chips chips={["Design", "Development", "Marketing"]} />;
}`
const gapExampleCode = "<Chips gap=\"md\" chips={[\"Design\", \"Development\", \"Marketing\"]} />;"
const flexDirectionExampleCode = "<Chips flexDirection=\"col\" chips={[\"Design\", \"Development\", \"Marketing\"]} />;"
const chipPropsExampleCode = `<Chips chipsProps={{
  variant: "outline"
  // ... other props
}}
chips={["Chip 1", "Chip 2"]} />`
const customizingExampleCode = `<Chips
  chips={["Chip 1", "Chip 2"]}
  style={{
    backgroundColor: "red",
    padding: "1rem",
    borderRadius: "1rem"
  }}
/>
<Chips
  chips={["Chip 1", "Chip 2"]}
  style={{
    backgroundColor: "green",
    padding: "1rem",
    borderRadius: "1rem"
    }}
/>`
const customizingClassExampleCode = `// CSS
.custom-chips {
  .chips {
    background-color: blue;
    padding: 10px;
    border-radius: 5px;
  }

  .chip {
    background-color: red;
  }
}

<div className='custom-chip'>
  <Chips chips={["Chip 1", "Chip 2"]} />
</div>`

const propsTableHeaders = [
  { content: "Props" },
  { content: "Type" },
  { content: "Description" },
  { content: "Default" },
]

const propsTableRows = [
  { prop: "chips", Type: "string[] | number[] | React.ReactNode[]", Description: "List of chip contents to render.", Default: "[]" },
  { prop: "gap", Type: "xs | sm | md | lg | xl", Description: "Controls spacing between the chips.", Default: "md" },
  { prop: "flexDirection", Type: "row | col", Description: "	Defines the layout direction of the chips (horizontal or vertical).", Default: "row" },
  { prop: "chipsProps", Type: <a href='chip'>ChipProps</a>, Description: "Shared props applied to each individual Chip.", Default: "-" },
  { prop: "as", Type: "React.ElementType", Description: "Defines the HTML element or component to render.", Default: "div" },
  { prop: "ref", Type: "React.Ref", Description: "Allows accessing the underlying DOM element.", Default: "-" },
  { prop: "className", Type: "string", Description: "Additional CSS classes for custom styling.", Default: "-" },
  { prop: "style", Type: "React.CSSProperties", Description: "Additional style for custom styling.", Default: "-" },
]
