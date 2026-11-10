import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { WhatsNew } from "@/presentation/components/WhatsNew"
import { ArrowSquareOut, Question } from "@phosphor-icons/react"
import { Button } from "@vbss-ui/button"
import { Table } from "@vbss-ui/table"
import { Tooltip } from "@vbss-ui/tooltip"
import * as S from "../../styles"
import {
  customizingClassExampleCode,
  customizingExampleCode,
  positionExampleCode,
  propsTableHeaders,
  propsTableRows,
  realUsageExampleCode,
  sections,
  tooltipWhatsNew,
  triggerExampleCode,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const TooltipDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Tooltip</S.Title>
          <S.SubTitle>A customizable and accessible Tooltip component.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Tooltip</strong> component is a floating label that appears when hovering over or focusing on an
              element. It provides additional information or context about the element it&apos;s attached to. Built with
              accessibility in mind, it offers various styling options, positioning, and customization features.
            </S.Paragraph>
            <ExampleContainer code={realUsageExampleCode}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "0.5rem",
                  width: "fit-content",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#475569",
                  }}
                >
                  Password Requirements
                </span>
                <Tooltip
                  trigger={
                    <button
                      type="button"
                      aria-label="Password requirements"
                      style={{ display: "inline-flex", padding: 0, border: 0, background: "none", cursor: "pointer" }}
                    >
                      <Question size={16} style={{ color: "#64748b" }} />
                    </button>
                  }
                  variant="outline"
                  side="top"
                  sideOffset={8}
                  size="sm"
                >
                  Must be at least 8 characters long and include a number
                </Tooltip>
              </div>
            </ExampleContainer>
          </section>
          <WhatsNew title="What's new" entries={tooltipWhatsNew} />
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              <a
                href="https://www.npmjs.com/package/@vbss-ui/tooltip"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
              >
                View on npm <ArrowSquareOut size={16} weight="bold" />
              </a>
            </S.Paragraph>
            <S.Paragraph>
              To install only the <strong>Tooltip</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/tooltip"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/tooltip"} language="sh" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="usage" />
              Usage
            </S.SectionTitle>
            <S.Paragraph>After installation, import the component and use it in your project:</S.Paragraph>
            <CodeSnippet code={usageExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="trigger" />
              Custom Trigger
            </S.SectionSubTitle>
            <S.Paragraph>
              You can use any element as a trigger for the <strong>Tooltip</strong>:
            </S.Paragraph>
            <ExampleContainer code={triggerExampleCode}>
              <Tooltip trigger={<Button>Hover me</Button>}>This is a tooltip with a button trigger</Tooltip>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="position" />
              Position
            </S.SectionSubTitle>
            <S.Paragraph>
              Control the position of the <strong>Tooltip</strong> using the <code>side</code> and <code>sideOffset</code> props:
            </S.Paragraph>
            <ExampleContainer code={positionExampleCode}>
              <S.ColumnContainer>
                <Tooltip trigger={<Button>Top</Button>} side="top">
                  This tooltip appears on top
                </Tooltip>
                <Tooltip trigger={<Button>Right</Button>} side="right">
                  This tooltip appears on the right
                </Tooltip>
                <Tooltip trigger={<Button>Bottom</Button>} side="bottom">
                  This tooltip appears on the bottom
                </Tooltip>
                <Tooltip trigger={<Button>Left</Button>} side="left">
                  This tooltip appears on the left
                </Tooltip>
              </S.ColumnContainer>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>Tooltip</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Tooltip trigger={<Button>Primary</Button>} variant="primary">
                  Primary tooltip
                </Tooltip>
                <Tooltip trigger={<Button>Secondary</Button>} variant="secondary">
                  Secondary tooltip
                </Tooltip>
                <Tooltip trigger={<Button>Outline</Button>} variant="outline">
                  Outline tooltip
                </Tooltip>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Tooltip variant="primary" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Tooltip trigger={<Button>None</Button>} rounded="none">
                  No border radius
                </Tooltip>
                <Tooltip trigger={<Button>Small</Button>} rounded="sm">
                  Small border radius
                </Tooltip>
                <Tooltip trigger={<Button>Medium</Button>} rounded="md">
                  Medium border radius
                </Tooltip>
                <Tooltip trigger={<Button>Large</Button>} rounded="lg">
                  Large border radius
                </Tooltip>
                <Tooltip trigger={<Button>Full</Button>} rounded="full">
                  Full border radius
                </Tooltip>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Tooltip rounded="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="size" />
              Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the size of the <strong>Tooltip</strong> using the <code>size</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Tooltip trigger={<Button>Extra Small</Button>} size="xs">
                  Extra small tooltip
                </Tooltip>
                <Tooltip trigger={<Button>Small</Button>} size="sm">
                  Small tooltip
                </Tooltip>
                <Tooltip trigger={<Button>Medium</Button>} size="md">
                  Medium tooltip
                </Tooltip>
                <Tooltip trigger={<Button>Large</Button>} size="lg">
                  Large tooltip
                </Tooltip>
                <Tooltip trigger={<Button>Extra Large</Button>} size="xl">
                  Extra large tooltip
                </Tooltip>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Tooltip size="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>Tooltip</strong> content using the <code>fontSize</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Tooltip trigger={<Button>Extra Small</Button>} fontSize="xs">
                  Extra small text
                </Tooltip>
                <Tooltip trigger={<Button>Small</Button>} fontSize="sm">
                  Small text
                </Tooltip>
                <Tooltip trigger={<Button>Medium</Button>} fontSize="md">
                  Medium text
                </Tooltip>
                <Tooltip trigger={<Button>Large</Button>} fontSize="lg">
                  Large text
                </Tooltip>
                <Tooltip trigger={<Button>Extra Large</Button>} fontSize="xl">
                  Extra large text
                </Tooltip>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Tooltip fontSize="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>Tooltip</strong> content using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Tooltip trigger={<Button>Thin</Button>} fontWeight="thin">
                  Thin text
                </Tooltip>
                <Tooltip trigger={<Button>Light</Button>} fontWeight="light">
                  Light text
                </Tooltip>
                <Tooltip trigger={<Button>Normal</Button>} fontWeight="normal">
                  Normal text
                </Tooltip>
                <Tooltip trigger={<Button>Medium</Button>} fontWeight="medium">
                  Medium text
                </Tooltip>
                <Tooltip trigger={<Button>Bold</Button>} fontWeight="bold">
                  Bold text
                </Tooltip>
                <Tooltip trigger={<Button>Extra Bold</Button>} fontWeight="extrabold">
                  Extra bold text
                </Tooltip>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Tooltip fontWeight="normal" />' language="tsx" />
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
                rows={propsTableRows.map((row: { prop: string; type: string; description: string; default: string }) => ({
                  ...row,
                  style: { color: "white" },
                }))}
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
              <Tooltip
                trigger={<Button>Hover me</Button>}
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                This is a custom styled tooltip
              </Tooltip>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customTooltip">
                <Tooltip trigger={<Button>Hover me</Button>}>This is a custom styled tooltip</Tooltip>
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Tooltip" sections={sections} />
    </>
  )
}
