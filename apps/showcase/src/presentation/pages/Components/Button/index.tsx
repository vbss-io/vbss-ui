import { Table } from "@vbss-ui/table";
import { Button } from "@vbss-ui/button";
import { ExampleContainer } from "@/presentation/components/ExampleContainer";
import { CodeSnippet } from "@/presentation/components/CodeSnippet";
import { ContentSidebar } from "@/presentation/components/ContentSidebar";
import { At } from "@phosphor-icons/react";

import * as S from "../../styles"
import { sections } from "./sections";
import "./style.css"

export const ButtonDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Button</S.Title>
          <S.SubTitle>
            A customizable and accessible Button component.
          </S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Button</strong> component is a flexible UI element used to trigger actions or events.
              It supports various visual styles, sizes, shapes, and states, making it suitable for a wide range of interfaces.
            </S.Paragraph>
            <ExampleContainer code='<Button>Click Me</Button>'>
              <Button>Click Me</Button>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id='installation'/>
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Button</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-npm'/>
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/button"} language="sh"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-yarn'/>
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/button"} language="sh"/>
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
              Change the visual style of the <strong>Button</strong> using the <code>variant</code> prop:
            </S.Paragraph>
              <ExampleContainer>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="outlineSolid">Outline Solid</Button>
                <Button variant="ghost">Ghost</Button>
              </ExampleContainer>
            <CodeSnippet code={variantsExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
              Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the size of the <strong>Button</strong> using the <code>size</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button size="xs">xs</Button>
              <Button size="sm" variant="secondary">sm</Button>
              <Button size="md" variant="outline">md</Button>
              <Button size="lg" variant="outlineSolid">lg</Button>
            </ExampleContainer>
            <CodeSnippet code={sizeExampleCode} language="tsx"/>
            <S.Paragraph>
              You can also use size for icon buttons:
            </S.Paragraph>
            <ExampleContainer>
              <Button size="icon-xs"><At/></Button>
              <Button size="icon-sm" variant="secondary"><At/></Button>
              <Button size="icon-md" variant="outline"><At/></Button>
              <Button size="icon-lg" variant="outlineSolid"><At/></Button>
            </ExampleContainer>
            <CodeSnippet code={iconSizeExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
              <ExampleContainer>
              <Button rounded="none">none</Button>
              <Button rounded="xs" variant="secondary">xs</Button>
              <Button rounded="sm" variant="outline">sm</Button>
              <Button rounded="md" variant="outlineSolid">md</Button>
              <Button rounded="lg">lg</Button>
              <Button rounded="full" variant="secondary">full</Button>
              </ExampleContainer>
            <CodeSnippet code={roundedExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
              Font
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font styles of the <strong>Button</strong> using the <code>fontWeight</code> and <code>fontSize</code> props:
            </S.Paragraph>
            <S.List><li>fontSize:</li></S.List>
            <ExampleContainer>
              <Button fontSize="xs">xs</Button>
              <Button fontSize="sm" variant="secondary">sm</Button>
              <Button fontSize="md" variant="outline">md</Button>
              <Button fontSize="lg" variant="outlineSolid">lg</Button>
              <Button fontSize="xl">xl</Button>
            </ExampleContainer>
            <CodeSnippet code={fontSizeExampleCode} language="tsx"/>
            <S.List><li>fontWeight:</li></S.List>
            <ExampleContainer>
              <Button fontWeight="thin">thin</Button>
              <Button fontWeight="light" variant="secondary">light</Button>
              <Button fontWeight="normal" variant="outline">normal</Button>
              <Button fontWeight="medium" variant="outlineSolid">medium</Button>
              <Button fontWeight="bold">bold</Button>
              <Button fontWeight="extrabold" variant="secondary">extrabold</Button>
            </ExampleContainer>
            <CodeSnippet code={fontWeightExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
              Inverted
            </S.SectionSubTitle>
            <S.Paragraph>
              Inverts the <strong>Button</strong> direction using the <code>inverted</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button>
                Button
                <At/>
              </Button>
              <Button variant="secondary" inverted>
                Button
                <At/>
              </Button>
            </ExampleContainer>
            <CodeSnippet code={invertedExampleCode} language="tsx"/>
            <S.SectionSubTitle>
              <S.SectionAnchor id='using-variants'/>
              Disabled
            </S.SectionSubTitle>
            <S.Paragraph>
              Disables the <strong>Button</strong> interaction using the <code>disabled</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button variant="primary" disabled>Button</Button>
              <Button variant="secondary" disabled>Button</Button>
              <Button variant="outline" disabled>Button</Button>
              <Button variant="outlineSolid" disabled>Button</Button>
              <Button variant="ghost" disabled>Button</Button>
            </ExampleContainer>
            <CodeSnippet code={disabledExampleCode} language="tsx"/>
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
              <Button style={{ backgroundColor: "red", border: "1px solid red" }}>Example</Button>
              <Button style={{ backgroundColor: "green", border: "1px solid green" }}>Example</Button>
              <Button style={{ backgroundColor: "blue", border: "1px solid blue" }}>Example</Button>
            </ExampleContainer>
            <S.Paragraph>
              Or you can use the default component className <code>chip</code>.
            </S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className='custom-button'>
                <Button>Example</Button>
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title='ChipDocs' sections={sections}/>
    </>
  )
}

const usageExampleCode = `import { Button } from "@vbss-ui/button";

export const App = () => {
  return <Button>Example Button</Button>;
}`

const variantsExampleCode = "<Button variant=\"primary\">Example Button</Button>"
const sizeExampleCode = "<Button size=\"sm\">Example Button</Button>"
const iconSizeExampleCode = `<Button size="icon-md">
  <At/>
</Button>`
const roundedExampleCode = "<Button rounded=\"md\">Example Button</Button>"
const fontSizeExampleCode = "<Button fontSize=\"xs\">Example Button</Button>"
const fontWeightExampleCode = "<Button fontWeight=\"normal\">Example Button</Button>"
const invertedExampleCode = `<Button inverted>
  Example Button
  <At/>
</Button>`
const disabledExampleCode = "<Button disabled>Example Button</Button>"
const customizingExampleCode = `<Button style={{ backgroundColor: "red", border: "1px solid red" }}>Example</Button>
<Button style={{ backgroundColor: "green", border: "1px solid green" }}>Example</Button>
<Button style={{ backgroundColor: "blue", border: "1px solid blue" }}>Example</Button>`
const customizingClassExampleCode = `// CSS
.custom-button {
  .button {
    background-color: purple;
    border: 1px solid purple
  }
}

<div className='custom-button'>
  <Button>Example</Button>
</div>`

const propsTableHeaders = [
  { content: "Props" },
  { content: "Type" },
  { content: "Description" },
  { content: "Default" },
]

const propsTableRows = [
  { prop: "variant", Type: "primary | secondary | outline | outlineSolid", Description: "Defines the visual style of the Button.", Default: "primary" },
  { prop: "size", Type: "xs | sm | md | lg | icon-sm | icon-md | icon-lg", Description: "Defines the size or icon-specific size of the Button.", Default: "md" },
  { prop: "rounded", Type: "none | xs | sm | md | lg | full", Description: "Sets the border radius of the Button.", Default: "md" },
  { prop: "fontSize", Type: "xs | sm | md | lg | xl", Description: "Sets the font size of the Button text.", Default: "md" },
  { prop: "fontWeight", Type: "thin | light | normal | medium | bold | extrabold", Description: "Specifies the font weight of the Button text.", Default: "normal" },
  { prop: "inverted", Type: "boolean", Description: "Inverts the Button's direction.", Default: "false" },
  { prop: "disabled", Type: "boolean", Description: "Disables the Button interaction.", Default: "false" },
  { prop: "as", Type: "React.ElementType", Description: "Defines the HTML element or component to render.", Default: "button" },
  { prop: "ref", Type: "React.Ref", Description: "Allows accessing the underlying DOM element.", Default: "-" },
  { prop: "children", Type: "string | number | React.ReactNode", Description: "Content to be displayed inside the button.", Default: "-" },
  { prop: "className", Type: "string", Description: "Additional CSS classes for custom styling.", Default: "-" },
  { prop: "style", Type: "React.CSSProperties", Description: "Additional style for custom styling.", Default: "-" },
]