import { Moon, Sun } from "@phosphor-icons/react"
import { Switch } from "@vbss-ui/switch"
import { Table } from "@vbss-ui/table"
import { useState } from "react"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"

import * as S from "../../styles"
import {
  controlledExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  usageExampleCode,
  withIconsExampleCode,
} from "./consts"
import "./style.css"

export const SwitchDocs = () => {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Switch</S.Title>
          <S.SubTitle>A customizable and accessible Switch component.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Switch</strong> component is a toggle control that allows users to switch between two states. It
              supports various visual styles, sizes, and states, making it suitable for a wide range of interfaces. Built on top
              of Radix UI Switch primitive, it provides a fully accessible and customizable solution.
            </S.Paragraph>
            <ExampleContainer code="<Switch />">
              <Switch />
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Switch</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/switch"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/switch"} language="sh" />
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
              The <strong>Switch</strong> component can be controlled using React state or form libraries.
            </S.Paragraph>
            <S.StateExampleContainer>
              <Switch checked={isEnabled} label="Enable Feature" onCheckedChange={(checked) => setIsEnabled(checked)} />
              <span>Switch value: {isEnabled ? <strong>On</strong> : <strong>Off</strong>}</span>
            </S.StateExampleContainer>
            <CodeSnippet code={controlledExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>Switch</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Switch variant="primary" />
              <Switch variant="secondary" />
              <Switch variant="outline" />
              <Switch variant="ghost" />
            </ExampleContainer>
            <CodeSnippet code='<Switch variant="primary" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Switch rounded="none" />
              <Switch rounded="sm" />
              <Switch rounded="md" />
              <Switch rounded="lg" />
              <Switch rounded="full" />
            </ExampleContainer>
            <CodeSnippet code='<Switch rounded="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="label" />
              Label
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a label to the <strong>Switch</strong> using the <code>label</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Switch label="Enable notifications" />
            </ExampleContainer>
            <CodeSnippet code='<Switch label="Enable notifications" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="icons" />
              With Icons
            </S.SectionSubTitle>
            <S.Paragraph>
              Add icons to the <strong>Switch</strong> using the <code>iconOn</code> and <code>iconOff</code> props:
            </S.Paragraph>
            <ExampleContainer>
              <Switch iconOn={<Moon />} iconOff={<Sun />} />
            </ExampleContainer>
            <CodeSnippet code={withIconsExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the <strong>Switch</strong> using the <code>fontSize</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Switch label="xs" fontSize="xs" />
              <Switch label="sm" fontSize="sm" />
              <Switch label="md" fontSize="md" />
              <Switch label="lg" fontSize="lg" />
              <Switch label="xl" fontSize="xl" />
            </ExampleContainer>
            <CodeSnippet code='<Switch fontSize="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the <strong>Switch</strong> using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Switch label="thin" fontWeight="thin" />
              <Switch label="light" fontWeight="light" />
              <Switch label="normal" fontWeight="normal" />
              <Switch label="medium" fontWeight="medium" />
              <Switch label="bold" fontWeight="bold" />
              <Switch label="extrabold" fontWeight="extrabold" />
            </ExampleContainer>
            <CodeSnippet code='<Switch fontWeight="normal" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="inverted" />
              Inverted
            </S.SectionSubTitle>
            <S.Paragraph>
              Inverts the <strong>Switch</strong> direction using the <code>inverted</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Switch label="Label" />
              <Switch label="Label" inverted />
            </ExampleContainer>
            <CodeSnippet code="<Switch inverted />" language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="disabled" />
              Disabled
            </S.SectionSubTitle>
            <S.Paragraph>
              Disables the <strong>Switch</strong> interaction using the <code>disabled</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <Switch disabled />
              <Switch label="Disabled" disabled />
            </ExampleContainer>
            <CodeSnippet code="<Switch disabled />" language="tsx" />
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
            <ExampleContainer code={customizingExampleCode}>
              <Switch style={{ backgroundColor: "red" }} />
              <Switch style={{ backgroundColor: "green" }} />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>
              You can use the default component className <code>button</code>:
            </S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customSwitch">
                <Switch label="Custom Style" />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="SwitchDocs" sections={sections} />
    </>
  )
}
