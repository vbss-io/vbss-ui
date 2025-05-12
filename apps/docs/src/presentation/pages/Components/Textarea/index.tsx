import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { InteractiveExampleContainer } from "@/presentation/components/InteractiveExampleContainer"
import { Table } from "@vbss-ui/table"
import { Textarea } from "@vbss-ui/textarea"
import { useState } from "react"
import * as S from "../../styles"
import {
  controlledExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  propsTableHeaders,
  propsTableRows,
  realUsageExampleCode,
  sections,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const TextareaDocs = () => {
  const [value, setValue] = useState("")

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Textarea</S.Title>
          <S.SubTitle>A customizable and accessible multi-line text input component.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Textarea</strong> component is a form control for multi-line text input that supports various styling
              options, labels, and accessibility features. Built with flexibility in mind, it provides a clean and modern
              interface for text input with customizable appearance and behavior.
            </S.Paragraph>
            <ExampleContainer code={realUsageExampleCode}>
              <div
                style={{
                  width: "20rem",
                  padding: "1.5rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "0.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    marginBottom: "1rem",
                    color: "#1e293b",
                  }}
                >
                  Send Feedback
                </h3>
                <Textarea
                  label="Your Message"
                  placeholder="Tell us what you think..."
                  error="Please provide your feedback"
                  variant="outline"
                  fontSize="md"
                />
              </div>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Textarea</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/textarea"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/textarea"} language="sh" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="usage" />
              Usage
            </S.SectionTitle>
            <S.Paragraph>After installation, import the component and use it in your project:</S.Paragraph>
            <CodeSnippet code={usageExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="state-management" />
              State Management
            </S.SectionSubTitle>
            <S.Paragraph>
              The <strong>Textarea</strong> component can be controlled using React state:
            </S.Paragraph>
            <S.StateExampleContainer>
              <Textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type something..." />
              <span>Textarea value: {value || <strong>Empty</strong>}</span>
            </S.StateExampleContainer>
            <CodeSnippet code={controlledExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>Textarea</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["primary", "secondary", "outline", "ghost"]}
              targetProp="variant"
              code={`<Textarea variant='variant' placeholder="Type something..." />`}
            >
              <Textarea placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["none", "sm", "md", "lg", "full"]}
              targetProp="rounded"
              code={`<Textarea rounded='rounded' placeholder="Type something..." />`}
              initIndex={2}
            >
              <Textarea placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="label" />
              Label
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a label to the <strong>Textarea</strong> using the <code>label</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Textarea label="Message" placeholder="Enter your message" />
            </ExampleContainer>
            <CodeSnippet code='<Textarea label="Message" placeholder="Enter your message" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>Textarea</strong> content using the <code>fontSize</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="fontSize"
              code={`<Textarea fontSize='fontSize' placeholder="Type something..." />`}
              initIndex={2}
            >
              <Textarea placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>Textarea</strong> content using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["thin", "light", "normal", "medium", "bold", "extrabold"]}
              targetProp="fontWeight"
              code={`<Textarea fontWeight='fontWeight' placeholder="Type something..." />`}
              initIndex={2}
            >
              <Textarea placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="disabled" />
              Disabled
            </S.SectionSubTitle>
            <S.Paragraph>
              Disable the <strong>Textarea</strong> using the <code>disabled</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Textarea disabled placeholder="Disabled" />
            </ExampleContainer>
            <CodeSnippet code="<Textarea disabled />" language="tsx" />
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
              <Textarea
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
                placeholder="Custom style"
              />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customTextarea">
                <Textarea label="Label:" placeholder="Custom class" />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Textarea" sections={sections} />
    </>
  )
}
