import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { Button } from "@vbss-ui/button"
import { Dialog } from "@vbss-ui/dialog"
import { Table } from "@vbss-ui/table"
import { useState } from "react"
import * as S from "../../styles"
import {
  basicExampleCode,
  contentExampleCode,
  controllerExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const DialogDocs = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Dialog</S.Title>
          <S.SubTitle>
            A customizable and accessible Dialog component with support for triggers, overlays, and various content sections.
          </S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Dialog</strong> component is a modal window that appears on top of the main content, providing a focused
              interaction space. Built with accessibility in mind, it offers various styling options, content sections, and
              customization features.
            </S.Paragraph>
            <ExampleContainer code={basicExampleCode}>
              <Dialog
                trigger={<Button as="div">Open Dialog</Button>}
                title="Dialog Title"
                description="Dialog Description"
                footer="Dialog Footer"
              >
                <div>Dialog Content</div>
              </Dialog>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Dialog</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/dialog"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/dialog"} language="sh" />
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
              Change the visual style of the <strong>Dialog</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Dialog
                  title="Primary"
                  trigger={
                    <Button as="div" variant="primary">
                      Primary
                    </Button>
                  }
                  variant="primary"
                >
                  Primary dialog
                </Dialog>
                <Dialog
                  title="Secondary"
                  trigger={
                    <Button as="div" variant="secondary">
                      Secondary
                    </Button>
                  }
                  variant="secondary"
                >
                  Secondary dialog
                </Dialog>
                <Dialog
                  title="Outline"
                  trigger={
                    <Button as="div" variant="outline">
                      Outline
                    </Button>
                  }
                  variant="outline"
                >
                  Outline dialog
                </Dialog>
                <Dialog
                  title="Ghost"
                  trigger={
                    <Button as="div" variant="ghost">
                      Ghost
                    </Button>
                  }
                  variant="ghost"
                >
                  Ghost dialog
                </Dialog>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Dialog variant="primary" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Dialog title="None" trigger={<Button as="div">None</Button>} rounded="none">
                  No border radius
                </Dialog>
                <Dialog title="Small" trigger={<Button as="div">Small</Button>} rounded="sm">
                  Small border radius
                </Dialog>
                <Dialog title="Medium" trigger={<Button as="div">Medium</Button>} rounded="md">
                  Medium border radius
                </Dialog>
                <Dialog title="Large" trigger={<Button as="div">Large</Button>} rounded="lg">
                  Large border radius
                </Dialog>
                <Dialog title="Full" trigger={<Button as="div">Full</Button>} rounded="full">
                  Full border radius
                </Dialog>
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Dialog rounded="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="overlay" />
              Overlay
            </S.SectionSubTitle>
            <S.Paragraph>
              Control the overlay opacity using the <code>overlayOpacity</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Dialog title="Custom Overlay" trigger={<Button as="div">Custom Overlay</Button>} overlayOpacity={75}>
                Dialog with custom overlay opacity
              </Dialog>
            </ExampleContainer>
            <CodeSnippet code="<Dialog overlayOpacity={75} />" language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="content" />
              Content
            </S.SectionSubTitle>
            <S.Paragraph>
              The <strong>Dialog</strong> component supports various content sections:
            </S.Paragraph>
            <ExampleContainer>
              <Dialog
                variant="ghost"
                trigger={<Button as="div">Content Example</Button>}
                title="Dialog Title"
                description="This is a description"
                footer={
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </div>
                }
              >
                <div>Main content goes here</div>
              </Dialog>
            </ExampleContainer>
            <CodeSnippet code={contentExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="controlled-state" />
              Controlled State
            </S.SectionSubTitle>
            <S.Paragraph>
              The <strong>Dialog</strong> component can be controlled externally using the <code>open</code> and{" "}
              <code>onOpenChange</code> props:
            </S.Paragraph>
            <ExampleContainer>
              <Dialog
                trigger={<Button as="div">Controlled Dialog</Button>}
                title="Controlled Dialog"
                open={isOpen}
                onOpenChange={setIsOpen}
                footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
              >
                <div>This dialog&apos;s state is controlled externally</div>
              </Dialog>
            </ExampleContainer>
            <CodeSnippet code={controllerExampleCode} language="tsx" />
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
              <Dialog
                title="Custom Dialog"
                trigger={<Button as="div">Open Dialog</Button>}
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Custom styled dialog
              </Dialog>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customDialog">
                <Dialog title="Custom Dialog" trigger={<Button as="div">Open Dialog</Button>}>
                  Custom styled dialog
                </Dialog>
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Dialog" sections={sections} />
    </>
  )
}
