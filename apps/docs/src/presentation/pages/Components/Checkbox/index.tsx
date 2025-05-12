import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { CheckedState } from "@radix-ui/react-checkbox"
import { Checkbox } from "@vbss-ui/checkbox"
import { Table } from "@vbss-ui/table"
import { useState } from "react"
import * as S from "../../styles"
import {
  controlledExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const CheckboxDocs = () => {
  const [checked, setChecked] = useState<CheckedState>(false)

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Checkbox</S.Title>
          <S.SubTitle>A customizable and accessible Checkbox component with label support.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Checkbox</strong> component is a form control for boolean input that supports various styling options,
              labels, and accessibility features. Built with flexibility in mind, it provides a clean and modern interface for
              checkbox input with customizable appearance and behavior.
            </S.Paragraph>
            <ExampleContainer
              code={`import { Checkbox } from "@vbss-ui/checkbox"
import { useState } from "react"

export const App = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox
        label="Subscribe to newsletter"
        checked={isSubscribed}
        onCheckedChange={setIsSubscribed}
      />
      <p style={{ fontSize: "0.875rem", color: "#666" }}>
        {isSubscribed ? "Subscribed" : "Not subscribed"}
      </p>
    </div>
  )
}`}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Checkbox label="Subscribe to newsletter" checked={checked} onCheckedChange={setChecked} />
                <p style={{ fontSize: "0.875rem", color: "#666" }}>{checked ? "Subscribed" : "Not subscribed"}</p>
              </div>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Checkbox</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/checkbox"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/checkbox"} language="sh" />
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
              The <strong>Checkbox</strong> component can be controlled using React state:
            </S.Paragraph>
            <S.StateExampleContainer>
              <Checkbox checked={checked} onCheckedChange={setChecked} label="Accept terms" />
              <span>Checkbox state: {checked === true ? "Checked" : checked === false ? "Unchecked" : "Indeterminate"}</span>
            </S.StateExampleContainer>
            <CodeSnippet code={controlledExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>Checkbox</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Checkbox checked variant="primary" label="Primary" />
                <Checkbox checked variant="secondary" label="Secondary" />
                <Checkbox checked variant="outline" label="Outline" />
                <Checkbox checked variant="ghost" label="Ghost" />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Checkbox variant="primary" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Checkbox rounded="none" label="None" />
                <Checkbox rounded="sm" label="Small" />
                <Checkbox rounded="md" label="Medium" />
                <Checkbox rounded="lg" label="Large" />
                <Checkbox rounded="full" label="Full" />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Checkbox rounded="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="size" />
              Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the size of the <strong>Checkbox</strong> using the <code>size</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Checkbox size="xs" label="Extra Small" />
                <Checkbox size="sm" label="Small" />
                <Checkbox size="md" label="Medium" />
                <Checkbox size="lg" label="Large" />
                <Checkbox size="xl" label="Extra Large" />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Checkbox size="sm" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="label" />
              Label
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a label to the <strong>Checkbox</strong> using the <code>label</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Checkbox label="Accept terms" />
            </ExampleContainer>
            <CodeSnippet code='<Checkbox label="Accept terms" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>Checkbox</strong> label using the <code>fontSize</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Checkbox fontSize="xs" label="Extra Small" />
                <Checkbox fontSize="sm" label="Small" />
                <Checkbox fontSize="md" label="Medium" />
                <Checkbox fontSize="lg" label="Large" />
                <Checkbox fontSize="xl" label="Extra Large" />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Checkbox fontSize="sm" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>Checkbox</strong> label using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <Checkbox fontWeight="thin" label="Thin" />
                <Checkbox fontWeight="light" label="Light" />
                <Checkbox fontWeight="normal" label="Normal" />
                <Checkbox fontWeight="medium" label="Medium" />
                <Checkbox fontWeight="bold" label="Bold" />
                <Checkbox fontWeight="extrabold" label="Extra Bold" />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<Checkbox fontWeight="normal" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="disabled" />
              Disabled
            </S.SectionSubTitle>
            <S.Paragraph>
              Disable the <strong>Checkbox</strong> using the <code>disabled</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Checkbox disabled label="Disabled" />
            </ExampleContainer>
            <CodeSnippet code="<Checkbox disabled />" language="tsx" />
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
              <Checkbox
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
                label="Custom style"
              />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customCheckbox">
                <Checkbox label="Custom class" />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Checkbox" sections={sections} />
    </>
  )
}
