import { Minus, Plus } from "@phosphor-icons/react"
import { Button } from "@vbss-ui/button"
import { InputNumber } from "@vbss-ui/input-number"
import { Table } from "@vbss-ui/table"
import { useState } from "react"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { InteractiveExampleContainer } from "@/presentation/components/InteractiveExampleContainer"
import * as S from "../../styles"
import {
  controlledExampleCode,
  controlsExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  propsTableHeaders,
  propsTableRows,
  realUsageExampleCode,
  sections,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const InputNumberDocs = () => {
  const [value, setValue] = useState("")
  const [quantity, setQuantity] = useState("")
  const [quantityError, setQuantityError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setQuantityError("")
    if (!quantity) {
      return setQuantityError("Quantity is required")
    }
    const numQuantity = Number(quantity)
    if (numQuantity < 1 || numQuantity > 10) {
      return setQuantityError("Quantity must be between 1 and 10")
    }
    console.log({ quantity: numQuantity })
  }

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Input Number</S.Title>
          <S.SubTitle>A customizable and accessible Number Input component with increment/decrement controls.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>InputNumber</strong> component is a specialized form control for numeric input that includes increment
              and decrement buttons. It supports various input types, labels, and styling options. Built with accessibility in
              mind, it provides a clean and modern interface for numeric input with convenient controls.
            </S.Paragraph>
            <ExampleContainer code={realUsageExampleCode}>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  padding: "1.5rem",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "0.5rem",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: "500", margin: 0 }}>Product Order</h3>
                <InputNumber
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  error={quantityError}
                  isFloat
                  step={0.1}
                />
                <Button type="submit">Add to Cart</Button>
              </form>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>InputNumber</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/input-number"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/input-number"} language="sh" />
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
              The <strong>InputNumber</strong> component can be controlled using React state:
            </S.Paragraph>
            <S.StateExampleContainer>
              <InputNumber
                label="Quantity:"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type a number..."
                plusIcon={<Plus />}
                minusIcon={<Minus />}
              />
              <span>Input value: {value || <strong>Empty</strong>}</span>
            </S.StateExampleContainer>
            <CodeSnippet code={controlledExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>InputNumber</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["primary", "secondary", "outline", "ghost"]}
              targetProp="variant"
              code={`<InputNumber variant='variant' placeholder="Type something..." />`}
            >
              <InputNumber placeholder="Type something..." />
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
              code={`<InputNumber rounded='rounded' placeholder="Type something..." />`}
              initIndex={2}
            >
              <InputNumber placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="height" />
              Height
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the height of the <strong>InputNumber</strong> using the <code>height</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="height"
              code={`<InputNumber height='height' placeholder="Type something..." />`}
              initIndex={2}
            >
              <InputNumber placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="label" />
              Label
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a label to the <strong>InputNumber</strong> using the <code>label</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <InputNumber label="Quantity" placeholder="Enter quantity" />
            </ExampleContainer>
            <CodeSnippet code='<InputNumber label="Quantity" placeholder="Enter quantity" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="controls" />
              Controls
            </S.SectionSubTitle>
            <S.Paragraph>
              Customize the increment/decrement buttons using the <code>controlsProps</code> prop, see{" "}
              <a href="button">ButtonProps</a>:
            </S.Paragraph>
            <ExampleContainer>
              <InputNumber
                controlsProps={{
                  variant: "primary",
                  rounded: "full",
                  icon: "plus",
                }}
                plusIcon={<Plus />}
                minusIcon={<Minus />}
                placeholder="With controls"
              />
            </ExampleContainer>
            <CodeSnippet code={controlsExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>InputNumber</strong> using the <code>fontSize</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="fontSize"
              code={`<InputNumber fontSize='fontSize' placeholder="Type something..." />`}
              initIndex={2}
            >
              <InputNumber placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>InputNumber</strong> using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["thin", "light", "normal", "medium", "bold", "extrabold"]}
              targetProp="fontWeight"
              code={`<InputNumber fontWeight='fontWeight' placeholder="Type something..." />`}
              initIndex={2}
            >
              <InputNumber placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="disabled" />
              Disabled
            </S.SectionSubTitle>
            <S.Paragraph>
              Disable the <strong>InputNumber</strong> using the <code>disabled</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <InputNumber disabled placeholder="Disabled input" />
            </ExampleContainer>
            <CodeSnippet code="<InputNumber disabled />" language="tsx" />
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
              <InputNumber style={{ backgroundColor: "red", color: "white" }} placeholder="Custom style" />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customInputNumber">
                <InputNumber label="Label:" placeholder="Custom class" />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Input Number" sections={sections} />
    </>
  )
}
