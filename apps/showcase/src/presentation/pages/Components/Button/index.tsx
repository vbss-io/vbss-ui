import { At } from "@phosphor-icons/react"
import { Button } from "@vbss-ui/button"
import { Table } from "@vbss-ui/table"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"

import * as S from "../../styles"
import {
  customizingClassExampleCode,
  customizingExampleCode,
  iconSizeExampleCode,
  invertedExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const ButtonDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Button</S.Title>
          <S.SubTitle>A customizable and accessible Button component.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Button</strong> component is a flexible UI element used to trigger actions or events. It supports various visual styles,
              sizes, shapes, and states, making it suitable for a wide range of interfaces.
            </S.Paragraph>
            <ExampleContainer code="<Button>Click Me</Button>">
              <Button>Click Me</Button>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Button</strong> component, run one of the following commands:
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
              Change the visual style of the <strong>Button</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="outlineSolid">Outline Solid</Button>
              <Button variant="ghost">Ghost</Button>
            </ExampleContainer>
            <CodeSnippet code='<Button variant="primary">Example Button</Button>' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="size" />
              Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the size of the <strong>Button</strong> using the <code>size</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button size="xs">xs</Button>
              <Button size="sm" variant="secondary">
                sm
              </Button>
              <Button size="md" variant="outline">
                md
              </Button>
              <Button size="lg" variant="outlineSolid">
                lg
              </Button>
            </ExampleContainer>
            <CodeSnippet code='<Button size="sm">Example Button</Button>' language="tsx" />
            <S.Paragraph>You can also use size for icon buttons:</S.Paragraph>
            <ExampleContainer>
              <Button size="icon-xs">
                <At />
              </Button>
              <Button size="icon-sm" variant="secondary">
                <At />
              </Button>
              <Button size="icon-md" variant="outline">
                <At />
              </Button>
              <Button size="icon-lg" variant="outlineSolid">
                <At />
              </Button>
            </ExampleContainer>
            <CodeSnippet code={iconSizeExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button rounded="none">none</Button>
              <Button rounded="xs" variant="secondary">
                xs
              </Button>
              <Button rounded="sm" variant="outline">
                sm
              </Button>
              <Button rounded="md" variant="outlineSolid">
                md
              </Button>
              <Button rounded="lg">lg</Button>
              <Button rounded="full" variant="secondary">
                full
              </Button>
            </ExampleContainer>
            <CodeSnippet code='<Button rounded="md">Example Button</Button>' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>Button</strong> using the <code>fontSize</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button fontSize="xs">xs</Button>
              <Button fontSize="sm" variant="secondary">
                sm
              </Button>
              <Button fontSize="md" variant="outline">
                md
              </Button>
              <Button fontSize="lg" variant="outlineSolid">
                lg
              </Button>
              <Button fontSize="xl">xl</Button>
            </ExampleContainer>
            <CodeSnippet code='<Button fontSize="xs">Example Button</Button>' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>Button</strong> using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button fontWeight="thin">thin</Button>
              <Button fontWeight="light" variant="secondary">
                light
              </Button>
              <Button fontWeight="normal" variant="outline">
                normal
              </Button>
              <Button fontWeight="medium" variant="outlineSolid">
                medium
              </Button>
              <Button fontWeight="bold">bold</Button>
              <Button fontWeight="extrabold" variant="secondary">
                extrabold
              </Button>
            </ExampleContainer>
            <CodeSnippet code='<Button fontWeight="normal">Example Button</Button>' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="inverted" />
              Inverted
            </S.SectionSubTitle>
            <S.Paragraph>
              Inverts the <strong>Button</strong> direction using the <code>inverted</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button>
                Button
                <At />
              </Button>
              <Button variant="secondary" inverted>
                Button
                <At />
              </Button>
            </ExampleContainer>
            <CodeSnippet code={invertedExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="disabled" />
              Disabled
            </S.SectionSubTitle>
            <S.Paragraph>
              Disables the <strong>Button</strong> interaction using the <code>disabled</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Button variant="primary" disabled>
                Button
              </Button>
              <Button variant="secondary" disabled>
                Button
              </Button>
              <Button variant="outline" disabled>
                Button
              </Button>
              <Button variant="outlineSolid" disabled>
                Button
              </Button>
              <Button variant="ghost" disabled>
                Button
              </Button>
            </ExampleContainer>
            <CodeSnippet code="<Button disabled>Example Button</Button>" language="tsx" />
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
              <Button style={{ backgroundColor: "red", border: "1px solid red" }}>Example</Button>
              <Button style={{ backgroundColor: "green", border: "1px solid green" }}>Example</Button>
              <Button style={{ backgroundColor: "blue", border: "1px solid blue" }}>Example</Button>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>
              You can use the default component className <code>button</code>:
            </S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="custom-button">
                <Button>Example</Button>
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="ButtonDocs" sections={sections} />
    </>
  )
}
