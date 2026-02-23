import { ArrowSquareOut } from "@phosphor-icons/react"
import { DatePicker } from "@vbss-ui/date-picker"
import { Table } from "@vbss-ui/table"
import { ptBR } from "date-fns/locale"
import { addDays, subDays } from "date-fns"
import { useState } from "react"
import styled from "styled-components"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { InteractiveExampleContainer } from "@/presentation/components/InteractiveExampleContainer"

import * as S from "../../styles"
import {
  controlledExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  localeExampleCode,
  propsTableHeaders,
  propsTableRows,
  realUsageExampleCode,
  sections,
  uncontrolledExampleCode,
  usageExampleCode,
  validationExampleCode,
} from "./consts"
import "./style.css"

const DatePickerExampleContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
`

const SelectedDateContainer = styled.div`
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`

const SelectedDateText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`

export const DatePickerDocs = () => {
  const [date, setDate] = useState<Date | null>(null)
  const [controlledDate, setControlledDate] = useState<Date | null>(new Date())
  const [localeDate, setLocaleDate] = useState<Date | null>(null)
  const [validatedDate, setValidatedDate] = useState<Date | null>(null)

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Date Picker</S.Title>
          <S.SubTitle>A customizable and accessible Date Picker component with calendar popup.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Date Picker</strong> component is a flexible date input that combines an input field with a calendar
              popover for date selection. It supports controlled and uncontrolled modes, date validation, formatting, and
              internationalization. Built with accessibility in mind, it provides keyboard navigation, ARIA attributes, and focus
              management.
            </S.Paragraph>
            <ExampleContainer code={realUsageExampleCode}>
              <DatePickerExampleContainer>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  locale={ptBR}
                  format="PP"
                  label="Data de Nascimento"
                  placeholder="Selecione uma data"
                  allowClear
                />
                {date && (
                  <SelectedDateContainer>
                    <SelectedDateText>
                      <strong>Selected:</strong> {date.toLocaleDateString("pt-BR")}
                    </SelectedDateText>
                  </SelectedDateContainer>
                )}
              </DatePickerExampleContainer>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              <a
                href="https://www.npmjs.com/package/@vbss-ui/date-picker"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                View on npm <ArrowSquareOut size={16} weight="bold" />
              </a>
            </S.Paragraph>
            <S.Paragraph>
              To install only the <strong>Date Picker</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code="npm install @vbss-ui/date-picker" language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code="yarn add @vbss-ui/date-picker" language="sh" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="usage" />
              Usage
            </S.SectionTitle>
            <S.Paragraph>After installation, import the component and use it in your project:</S.Paragraph>
            <CodeSnippet code={usageExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="basic-usage" />
              Basic Usage
            </S.SectionSubTitle>
            <S.Paragraph>
              The <strong>Date Picker</strong> can be used in both controlled and uncontrolled modes:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="controlled-uncontrolled" />
              Controlled / Uncontrolled
            </S.SectionSubTitle>
            <S.Paragraph>
              <strong>Controlled mode:</strong> Use <code>value</code> and <code>onChange</code> props:
            </S.Paragraph>
            <ExampleContainer code={controlledExampleCode}>
              <DatePickerExampleContainer>
                <DatePicker value={controlledDate} onChange={setControlledDate} label="Select Date" />
                {controlledDate && (
                  <SelectedDateContainer>
                    <SelectedDateText>
                      <strong>Selected:</strong> {controlledDate.toLocaleDateString()}
                    </SelectedDateText>
                  </SelectedDateContainer>
                )}
              </DatePickerExampleContainer>
            </ExampleContainer>
            <S.Paragraph>
              <strong>Uncontrolled mode:</strong> Use <code>defaultValue</code> prop:
            </S.Paragraph>
            <ExampleContainer code={uncontrolledExampleCode}>
              <DatePickerExampleContainer>
                <DatePicker defaultValue={new Date()} label="Select Date" />
              </DatePickerExampleContainer>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="with-locale" />
              With Locale
            </S.SectionSubTitle>
            <S.Paragraph>
              The Date Picker component supports internationalization with <code>date-fns</code> locales:
            </S.Paragraph>
            <ExampleContainer>
              <DatePickerExampleContainer>
                <DatePicker
                  value={localeDate}
                  onChange={setLocaleDate}
                  locale={ptBR}
                  format="PP"
                  label="Selecione uma data"
                  placeholder="Selecione uma data"
                />
                {localeDate && (
                  <SelectedDateContainer>
                    <SelectedDateText>
                      <strong>Selected:</strong> {localeDate.toLocaleDateString("pt-BR")}
                    </SelectedDateText>
                  </SelectedDateContainer>
                )}
              </DatePickerExampleContainer>
            </ExampleContainer>
            <CodeSnippet code={localeExampleCode} language="tsx" />
            <S.Paragraph>
              <strong>Note:</strong> Import locales selectively to keep bundle size small. For example:{" "}
              <code>import &#123; ptBR &#125; from &quot;date-fns/locale&quot;</code>
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="validation" />
              Validation
            </S.SectionSubTitle>
            <S.Paragraph>
              You can restrict date selection using <code>minDate</code>, <code>maxDate</code>, and <code>disabledDates</code>:
            </S.Paragraph>
            <ExampleContainer>
              <DatePickerExampleContainer>
                <DatePicker
                  value={validatedDate}
                  onChange={setValidatedDate}
                  minDate={subDays(new Date(), 7)}
                  maxDate={addDays(new Date(), 30)}
                  disabledDates={[new Date(), addDays(new Date(), 1)]}
                  label="Select Date (next 7-30 days)"
                  placeholder="Select a date"
                />
                {validatedDate && (
                  <SelectedDateContainer>
                    <SelectedDateText>
                      <strong>Selected:</strong> {validatedDate.toLocaleDateString()}
                    </SelectedDateText>
                  </SelectedDateContainer>
                )}
              </DatePickerExampleContainer>
            </ExampleContainer>
            <CodeSnippet code={validationExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>Date Picker</strong> input using the <code>variant</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["primary", "secondary", "outline", "ghost"]}
              targetProp="variant"
              code={`<DatePicker value={date} onChange={setDate} variant='variant' />`}
            >
              <DatePicker value={null} onChange={() => {}} variant="primary" />
            </InteractiveExampleContainer>
            <S.Paragraph>
              You can also customize the calendar variant using the <code>calendarVariant</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["primary", "secondary", "outline", "outlineSolid", "ghost"]}
              targetProp="calendarVariant"
              code={`<DatePicker value={date} onChange={setDate} calendarVariant='calendarVariant' />`}
            >
              <DatePicker value={null} onChange={() => {}} calendarVariant="primary" />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="styling" />
              Styling
            </S.SectionSubTitle>
            <S.Paragraph>
              Customize the appearance with <code>height</code>, <code>rounded</code>, <code>fontSize</code>, and{" "}
              <code>fontWeight</code> props:
            </S.Paragraph>
            <ExampleContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <DatePicker value={null} onChange={() => {}} label="Small height" height="sm" />
                <DatePicker value={null} onChange={() => {}} label="Medium height" height="md" />
                <DatePicker value={null} onChange={() => {}} label="Large height" height="lg" />
              </div>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="accessibility" />
              Accessibility
            </S.SectionSubTitle>
            <S.Paragraph>
              The <strong>Date Picker</strong> component includes comprehensive accessibility features:
            </S.Paragraph>
            <S.List as="ul">
              <li>
                <strong>Keyboard Navigation:</strong> Use arrow keys to navigate dates, Enter/Space to select, Escape to close the
                calendar
              </li>
              <li>
                <strong>ARIA Attributes:</strong> Proper roles and labels for screen readers (<code>aria-label</code>,{" "}
                <code>aria-describedby</code>)
              </li>
              <li>
                <strong>Focus Management:</strong> Focus is automatically managed when opening/closing the calendar
              </li>
              <li>
                <strong>Disabled Dates:</strong> Keyboard navigation skips disabled dates automatically
              </li>
              <li>
                <strong>Reduced Motion:</strong> Respects <code>prefers-reduced-motion</code> media query
              </li>
            </S.List>
            <ExampleContainer>
              <DatePicker
                value={null}
                onChange={() => {}}
                label="Accessible Date Picker"
                aria-label="Select appointment date"
                aria-describedby="date-help"
              />
              <p id="date-help" style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>
                Select a date for your appointment
              </p>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="props" />
              Props
            </S.SectionTitle>
            <S.Paragraph>
              The Date Picker component accepts the following props. It extends all standard input props and adds date-specific
              functionality.
            </S.Paragraph>
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
              You can extend the default styles by passing custom styles using <code>className</code> or <code>style</code>.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-style" />
              Using <code>style</code>
            </S.SectionSubTitle>
            <S.Paragraph>You can pass custom styles directly to the component:</S.Paragraph>
            <ExampleContainer code={customizingExampleCode}>
              <DatePicker
                style={{
                  backgroundColor: "#f3f4f6",
                  border: "2px solid #e5e7eb",
                }}
                value={null}
                onChange={() => {}}
                label="Custom styled date picker"
              />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using <code>className</code>
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customDatePicker">
                <DatePicker value={null} onChange={() => {}} label="Custom styled" />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Date Picker" sections={sections} />
    </>
  )
}
