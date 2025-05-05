import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { InteractiveExampleContainer } from "@/presentation/components/InteractiveExampleContainer"
import { RadioGroup } from "@vbss-ui/radio-group"
import { Table } from "@vbss-ui/table"
import { useState } from "react"
import * as S from "../../styles"
import {
  basicExampleCode,
  controlledExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  labelExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const RadioGroupDocs = () => {
  const [value, setValue] = useState("optionOne")

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>RadioGroup</S.Title>
          <S.SubTitle>A customizable and accessible RadioGroup component for single selection.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>RadioGroup</strong> component is a form control that allows users to select a single option from a set
              of choices. It supports various styling options, labels, and accessibility features. Built with flexibility in mind,
              it provides a clean and modern interface for radio input with customizable appearance and behavior.
            </S.Paragraph>
            <ExampleContainer code={basicExampleCode}>
              <RadioGroup
                defaultValue="option-1"
                values={[
                  { value: "option-1", label: "Option 1" },
                  { value: "option-2", label: "Option 2" },
                ]}
              />
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>RadioGroup</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/radio-group"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/radio-group"} language="sh" />
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
              The <strong>RadioGroup</strong> component can be controlled using React state:
            </S.Paragraph>
            <S.StateExampleContainer>
              <RadioGroup
                value={value}
                onValueChange={setValue}
                values={[
                  { value: "optionOne", label: "Option 1" },
                  { value: "optionTwo", label: "Option 2" },
                ]}
              />
              <span>Selected value: {value}</span>
            </S.StateExampleContainer>
            <CodeSnippet code={controlledExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>RadioGroup</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["primary", "secondary", "outline", "ghost"]}
              targetProp="variant"
              code="<RadioGroup variant='variant' />"
            >
              <RadioGroup
                defaultValue="variant-1"
                values={[
                  { value: "variant-1", label: "Option 1" },
                  { value: "variant-2", label: "Option 2" },
                ]}
              />
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
              code="<RadioGroup rounded='rounded' />"
              initIndex={2}
            >
              <RadioGroup
                defaultValue="rounded-1"
                values={[
                  { value: "rounded-1", label: "Option 1" },
                  { value: "rounded-2", label: "Option 2" },
                ]}
              />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="size" />
              Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the size of the <strong>RadioGroup</strong> using the <code>size</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="size"
              code="<RadioGroup size='size' />"
              initIndex={1}
            >
              <RadioGroup
                defaultValue="size-1"
                values={[
                  { value: "size-1", label: "Option 1" },
                  { value: "size-2", label: "Option 2" },
                ]}
              />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="direction" />
              Direction
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the items direction for the <strong>RadioGroup</strong> using the <code>direction</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["col", "row"]}
              targetProp="direction"
              code="<RadioGroup direction='direction' />"
            >
              <RadioGroup
                defaultValue="direction-1"
                values={[
                  { value: "direction-1", label: "Option 1" },
                  { value: "direction-2", label: "Option 2" },
                ]}
              />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="label" />
              Label
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a label to the <strong>RadioGroup</strong> using the <code>label</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <RadioGroup
                label="Select an Option:"
                defaultValue="label-1"
                values={[
                  { value: "label-1", label: "Option 1" },
                  { value: "label-2", label: "Option 2" },
                ]}
              />
            </ExampleContainer>
            <CodeSnippet code={labelExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>RadioGroup</strong> label using the <code>fontSize</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="fontSize"
              code="<RadioGroup fontSize='fontSize' />"
              initIndex={2}
            >
              <RadioGroup
                defaultValue="fontSize-1"
                values={[
                  { value: "fontSize-1", label: "Option 1" },
                  { value: "fontSize-2", label: "Option 2" },
                ]}
              />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>RadioGroup</strong> label using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["thin", "light", "normal", "medium", "bold", "extrabold"]}
              targetProp="fontWeight"
              code="<RadioGroup fontWeight='fontWeight' />"
              initIndex={2}
            >
              <RadioGroup
                defaultValue="fontWeight-1"
                values={[
                  { value: "fontWeight-1", label: "Option 1" },
                  { value: "fontWeight-2", label: "Option 2" },
                ]}
              />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="disabled" />
              Disabled
            </S.SectionSubTitle>
            <S.Paragraph>
              Disable the <strong>RadioGroup</strong> using the <code>disabled</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <RadioGroup
                disabled
                values={[
                  { value: "disabled-1", label: "Disabled" },
                  { value: "disabled-2", label: "Disabled" },
                ]}
              />
            </ExampleContainer>
            <CodeSnippet code="<RadioGroup disabled />" language="tsx" />
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
              <RadioGroup
                style={{
                  color: "red",
                }}
                values={[
                  { value: "style-1", label: "Custom style" },
                  { value: "style-2", label: "Custom style" },
                ]}
              />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customRadioGroup">
                <RadioGroup
                  label="Select an Option:"
                  values={[
                    { value: "className-1", label: "Custom class" },
                    { value: "className-2", label: "Custom class" },
                  ]}
                />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="RadioGroupDocs" sections={sections} />
    </>
  )
}
