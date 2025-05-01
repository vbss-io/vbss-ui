import { Eye, EyeSlash } from "@phosphor-icons/react"
import { Input } from "@vbss-ui/input"
import { Table } from "@vbss-ui/table"
import { useState } from "react"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"

import { InteractiveExampleContainer } from "@/presentation/components/InteractiveExampleContainer"
import * as S from "../../styles"
import {
  controlledExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  passwordExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  usageExampleCode,
  withButtonExampleCode,
} from "./consts"
import "./style.css"

export const InputDocs = () => {
  const [value, setValue] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Input</S.Title>
          <S.SubTitle>A customizable and accessible Input component.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Input</strong> component is a versatile form control that supports various input types, labels, error
              states, and password visibility toggles. It offers multiple styling options, including different variants, sizes,
              and customizable content. Built with accessibility in mind, it provides a clean and modern interface for user input.
            </S.Paragraph>
            <ExampleContainer code='<Input placeholder="Enter your name" />'>
              <Input placeholder="Enter your name" />
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Input</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/input"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/input"} language="sh" />
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
              The <strong>Input</strong> component can be controlled using React state:
            </S.Paragraph>
            <S.StateExampleContainer>
              <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type something..." />
              <span>Input value: {value || <strong>Empty</strong>}</span>
            </S.StateExampleContainer>
            <CodeSnippet code={controlledExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>Input</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["primary", "secondary", "outline", "ghost"]}
              targetProp="variant"
              code={`<Input variant='variant' placeholder="Type something..." />`}
            >
              <Input placeholder="Type something..." />
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
              code={`<Input rounded='rounded' placeholder="Type something..." />`}
              initIndex={2}
            >
              <Input placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="height" />
              Height
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the height of the <strong>Input</strong> using the <code>height</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="height"
              code={`<Input height='height' placeholder="Type something..." />`}
              initIndex={2}
            >
              <Input placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="label" />
              Label
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a label to the <strong>Input</strong> using the <code>label</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Input label="Username" placeholder="Enter your username" />
            </ExampleContainer>
            <CodeSnippet code='<Input label="Username" placeholder="Enter your username" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="error" />
              Error State
            </S.SectionSubTitle>
            <S.Paragraph>
              Display error messages using the <code>error</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Input error="This field is required" />
            </ExampleContainer>
            <CodeSnippet code='<Input error="This field is required" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="password" />
              Password Input
            </S.SectionSubTitle>
            <S.Paragraph>
              Create a password <strong>Input</strong> with visibility toggle:
            </S.Paragraph>
            <ExampleContainer>
              <Input
                label="Password:"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPasswordSwitch
                iconOn={<Eye />}
                iconOff={<EyeSlash />}
                placeholder="Enter your password"
              />
            </ExampleContainer>
            <CodeSnippet code={passwordExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="with-button" />
              Input With Button
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a <strong>Button</strong> to the <strong>Input</strong> component:
            </S.Paragraph>
            <ExampleContainer>
              <Input
                placeholder="Enter your email"
                buttonProps={{
                  children: "Subscribe",
                  onClick: () => console.log("Subscribed!"),
                }}
              />
            </ExampleContainer>
            <CodeSnippet code={withButtonExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>Input</strong> using the <code>fontSize</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["xs", "sm", "md", "lg", "xl"]}
              targetProp="fontSize"
              code={`<Input fontSize='fontSize' placeholder="Type something..." />`}
              initIndex={2}
            >
              <Input placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>Input</strong> using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["thin", "light", "normal", "medium", "bold", "extrabold"]}
              targetProp="fontWeight"
              code={`<Input fontWeight='fontWeight' placeholder="Type something..." />`}
              initIndex={2}
            >
              <Input placeholder="Type something..." />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="disabled" />
              Disabled
            </S.SectionSubTitle>
            <S.Paragraph>
              Disable the <strong>Input</strong> using the <code>disabled</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Input disabled placeholder="Disabled input" />
            </ExampleContainer>
            <CodeSnippet code="<Input disabled />" language="tsx" />
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
              <Input style={{ backgroundColor: "black", color: "white" }} placeholder="Custom style" />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customInput">
                <Input label="Custom Class:" placeholder="Custom class" error="Required field" />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Input" sections={sections} />
    </>
  )
}
