import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { Button } from "@vbss-ui/button"
import { Popover } from "@vbss-ui/popover"
import { Table } from "@vbss-ui/table"
import * as S from "../../styles"
import {
  basicExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const PopoverDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Popover</S.Title>
          <S.SubTitle>
            A customizable and accessible Popover component that displays content in a floating container next to a trigger
            element.
          </S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Popover</strong> component is a floating container that appears next to a trigger element, providing
              additional information or actions. Built with accessibility in mind, it offers various styling options, positioning
              features, and customization capabilities.
            </S.Paragraph>
            <ExampleContainer code={basicExampleCode}>
              <Popover trigger={<Button as="div">Click Me</Button>} variant="primary">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <Button variant="secondary">Button</Button>
                  <Button variant="secondary">Button</Button>
                </div>
              </Popover>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Popover</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/popover"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/popover"} language="sh" />
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
              Change the visual style of the <strong>Popover</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Popover
                  trigger={
                    <Button as="div" variant="primary">
                      Primary
                    </Button>
                  }
                  variant="primary"
                >
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost">Button</Button>
                    <Button variant="ghost">Button</Button>
                  </div>
                </Popover>
                <Popover
                  trigger={
                    <Button as="div" variant="secondary">
                      Secondary
                    </Button>
                  }
                  variant="secondary"
                >
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost">Button</Button>
                    <Button variant="ghost">Button</Button>
                  </div>
                </Popover>
                <Popover
                  trigger={
                    <Button as="div" variant="outline">
                      Outline
                    </Button>
                  }
                  variant="outline"
                >
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost">Button</Button>
                    <Button variant="ghost">Button</Button>
                  </div>
                </Popover>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Popover variant="primary" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="sizes" />
              Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the padding size using the <code>size</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Popover trigger={<Button as="div">Extra Small</Button>} size="xs">
                  <div>Extra Small Popover</div>
                </Popover>
                <Popover trigger={<Button as="div">Small</Button>} size="sm">
                  <div>Small Popover</div>
                </Popover>
                <Popover trigger={<Button as="div">Medium</Button>} size="md">
                  <div>Medium Popover</div>
                </Popover>
                <Popover trigger={<Button as="div">Large</Button>} size="lg">
                  <div>Large Popover</div>
                </Popover>
                <Popover trigger={<Button as="div">Extra Large</Button>} size="xl">
                  <div>Extra Large Popover</div>
                </Popover>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Popover size="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="positioning" />
              Positioning
            </S.SectionSubTitle>
            <S.Paragraph>
              Control the position of the Popover using the <code>side</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Popover trigger={<Button as="div">Top</Button>} side="top">
                  <div>Popover on top</div>
                </Popover>
                <Popover trigger={<Button as="div">Right</Button>} side="right">
                  <div>Popover on right</div>
                </Popover>
                <Popover trigger={<Button as="div">Bottom</Button>} side="bottom">
                  <div>Popover on bottom</div>
                </Popover>
                <Popover trigger={<Button as="div">Left</Button>} side="left">
                  <div>Popover on left</div>
                </Popover>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Popover side="top" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Control the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Popover trigger={<Button as="div">Top</Button>} rounded="none">
                  <div>No border radius</div>
                </Popover>
                <Popover trigger={<Button as="div">Right</Button>} rounded="sm">
                  <div>Small border radius</div>
                </Popover>
                <Popover trigger={<Button as="div">Bottom</Button>} rounded="md">
                  <div>Medium border radius</div>
                </Popover>
                <Popover trigger={<Button as="div">Left</Button>} rounded="lg">
                  <div>Large border radius</div>
                </Popover>
                <Popover trigger={<Button as="div">Top</Button>} rounded="full">
                  <div>Full border radius</div>
                </Popover>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Popover rounded="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>Popover</strong> content using the <code>fontSize</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Popover trigger={<Button as="div">Extra Small</Button>} fontSize="xs">
                  <div>Extra small text</div>
                </Popover>
                <Popover trigger={<Button as="div">Small</Button>} fontSize="sm">
                  <div>Small text</div>
                </Popover>
                <Popover trigger={<Button as="div">Medium</Button>} fontSize="md">
                  <div>Medium text</div>
                </Popover>
                <Popover trigger={<Button as="div">Large</Button>} fontSize="lg">
                  <div>Large text</div>
                </Popover>
                <Popover trigger={<Button as="div">Extra Large</Button>} fontSize="xl">
                  <div>Extra large text</div>
                </Popover>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Popover fontSize="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>Popover</strong> content using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Popover trigger={<Button as="div">Thin</Button>} fontWeight="thin">
                  <div>Thin text</div>
                </Popover>
                <Popover trigger={<Button as="div">Light</Button>} fontWeight="light">
                  <div>Light text</div>
                </Popover>
                <Popover trigger={<Button as="div">Normal</Button>} fontWeight="normal">
                  <div>Normal text</div>
                </Popover>
                <Popover trigger={<Button as="div">Medium</Button>} fontWeight="medium">
                  <div>Medium text</div>
                </Popover>
                <Popover trigger={<Button as="div">Bold</Button>} fontWeight="bold">
                  <div>Bold text</div>
                </Popover>
                <Popover trigger={<Button as="div">Extra Bold</Button>} fontWeight="extrabold">
                  <div>Extra bold text</div>
                </Popover>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Popover fontWeight="normal" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="align" />
              Alignment
            </S.SectionSubTitle>
            <S.Paragraph>
              Control the alignment of the <strong>Popover</strong> using the <code>align</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Popover trigger={<Button as="div">Start</Button>} align="start">
                  <div>Aligned to start</div>
                </Popover>
                <Popover trigger={<Button as="div">Center</Button>} align="center">
                  <div>Aligned to center</div>
                </Popover>
                <Popover trigger={<Button as="div">End</Button>} align="end">
                  <div>Aligned to end</div>
                </Popover>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Popover align="center" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="side-offset" />
              Side Offset
            </S.SectionSubTitle>
            <S.Paragraph>
              Control the offset from the trigger element using the <code>sideOffset</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Popover trigger={<Button as="div">No Offset</Button>} sideOffset={0}>
                  <div>No offset from trigger</div>
                </Popover>
                <Popover trigger={<Button as="div">Small Offset</Button>} sideOffset={4}>
                  <div>Small offset from trigger</div>
                </Popover>
                <Popover trigger={<Button as="div">Large Offset</Button>} sideOffset={8}>
                  <div>Large offset from trigger</div>
                </Popover>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code="<Popover sideOffset={4} />" language="tsx" />
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
              <Popover
                trigger={<Button as="div">Open Popover</Button>}
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Custom styled popover
              </Popover>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customPopover">
                <Popover trigger={<Button as="div">Open Popover</Button>}>Custom styled popover</Popover>
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Popover" sections={sections} />
    </>
  )
}
