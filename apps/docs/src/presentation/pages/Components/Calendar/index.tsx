import { ArrowSquareOut } from "@phosphor-icons/react"
import { Calendar } from "@vbss-ui/calendar"
import { Table } from "@vbss-ui/table"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import styled from "styled-components"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { InteractiveExampleContainer } from "@/presentation/components/InteractiveExampleContainer"
import { WhatsNew } from "@/presentation/components/WhatsNew"

import * as S from "../../styles"
import {
  calendarWhatsNew,
  customizingClassExampleCode,
  customizingExampleCode,
  disabledExampleCode,
  localesTableHeaders,
  localesTableRows,
  multipleSelectionExampleCode,
  propsTableHeaders,
  propsTableRows,
  rangeSelectionExampleCode,
  realUsageExampleCode,
  sections,
  usageExampleCode,
} from "./consts"
import "./style.css"

const CalendarExampleContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const CalendarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
  margin: 0;
`

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
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

export const CalendarDocs = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date())
  const [multipleSelected, setMultipleSelected] = useState<Date[] | undefined>([])
  const [rangeSelected, setRangeSelected] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>()

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Calendar</S.Title>
          <S.SubTitle>A customizable and accessible Calendar component.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Calendar</strong> component is a flexible date picker that supports various selection modes,
              internationalization, and customizable styling. Built with react-day-picker, it provides a clean and modern
              interface for date selection with accessibility features and multiple visual variants.
            </S.Paragraph>
            <ExampleContainer code={realUsageExampleCode}>
              <CalendarExampleContainer>
                <CalendarTitle>Select a Date</CalendarTitle>
                <CalendarWrapper>
                  <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    locale={ptBR}
                    variant="primary"
                    rounded="md"
                    showOutsideDays={true}
                  />
                </CalendarWrapper>
                {selected && (
                  <SelectedDateContainer>
                    <SelectedDateText>
                      <strong>Selected:</strong> {selected.toLocaleDateString("pt-BR")}
                    </SelectedDateText>
                  </SelectedDateContainer>
                )}
              </CalendarExampleContainer>
            </ExampleContainer>
          </section>
          <WhatsNew title="What's new" entries={calendarWhatsNew} />
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              <a
                href="https://www.npmjs.com/package/@vbss-ui/calendar"
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
              To install only the <strong>Calendar</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code="npm install @vbss-ui/calendar" language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code="yarn add @vbss-ui/calendar" language="sh" />
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
              Change the visual style of the <strong>Calendar</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["primary", "secondary", "outline", "outlineSolid", "ghost"]}
              targetProp="variant"
              code={`<Calendar mode="single" selected={date} onSelect={setDate} variant='variant' />`}
            >
              <Calendar mode="single" selected={new Date()} onSelect={() => {}} variant="primary" />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["none", "xs", "sm", "md", "lg", "full"]}
              targetProp="rounded"
              code={`<Calendar mode="single" selected={date} onSelect={setDate} rounded='rounded' />`}
              initIndex={3}
            >
              <Calendar mode="single" selected={new Date()} onSelect={() => {}} variant="primary" rounded="md" />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="selection-modes" />
              Selection Modes
            </S.SectionSubTitle>
            <S.Paragraph>The Calendar supports three selection modes:</S.Paragraph>
            <S.Paragraph>
              <strong>Single Date Selection:</strong>
            </S.Paragraph>
            <ExampleContainer>
              <CalendarExampleContainer>
                <CalendarTitle>Select a Single Date</CalendarTitle>
                <CalendarWrapper>
                  <Calendar mode="single" selected={selected} onSelect={setSelected} variant="primary" />
                </CalendarWrapper>
                {selected && (
                  <SelectedDateContainer>
                    <SelectedDateText>
                      <strong>Selected:</strong> {selected.toLocaleDateString("pt-BR")}
                    </SelectedDateText>
                  </SelectedDateContainer>
                )}
              </CalendarExampleContainer>
            </ExampleContainer>
            <CodeSnippet code={usageExampleCode} language="tsx" />
            <S.Paragraph>
              <strong>Multiple Date Selection:</strong>
            </S.Paragraph>
            <ExampleContainer>
              <CalendarExampleContainer>
                <CalendarTitle>Select Multiple Dates</CalendarTitle>
                <CalendarWrapper>
                  <Calendar mode="multiple" selected={multipleSelected} onSelect={setMultipleSelected} variant="secondary" />
                </CalendarWrapper>
                {multipleSelected && multipleSelected.length > 0 && (
                  <SelectedDateContainer>
                    <SelectedDateText>
                      <strong>Selected Dates:</strong> {multipleSelected.length} date(s) -{" "}
                      {multipleSelected.map((date) => date.toLocaleDateString("pt-BR")).join(", ")}
                    </SelectedDateText>
                  </SelectedDateContainer>
                )}
              </CalendarExampleContainer>
            </ExampleContainer>
            <CodeSnippet code={multipleSelectionExampleCode} language="tsx" />
            <S.Paragraph>
              <strong>Date Range Selection:</strong>
            </S.Paragraph>
            <ExampleContainer>
              <CalendarExampleContainer>
                <CalendarTitle>Select a Date Range</CalendarTitle>
                <CalendarWrapper>
                  <Calendar mode="range" selected={rangeSelected} onSelect={setRangeSelected} variant="outline" />
                </CalendarWrapper>
                {rangeSelected && (
                  <SelectedDateContainer>
                    <SelectedDateText>
                      <strong>Selected Range:</strong> {rangeSelected.from?.toLocaleDateString("pt-BR")}
                      {rangeSelected.to ? ` - ${rangeSelected.to.toLocaleDateString("pt-BR")}` : " (select end date)"}
                    </SelectedDateText>
                  </SelectedDateContainer>
                )}
              </CalendarExampleContainer>
            </ExampleContainer>
            <CodeSnippet code={rangeSelectionExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="with-locale" />
              With Locale
            </S.SectionSubTitle>
            <S.Paragraph>The Calendar component supports internationalization with pre-exported locales:</S.Paragraph>
            <ExampleContainer>
              <Calendar mode="single" selected={new Date()} onSelect={() => {}} locale={ptBR} variant="primary" />
            </ExampleContainer>
            <CodeSnippet
              code={`<Calendar mode="single" selected={new Date()} onSelect={() => {}} locale={ptBR} variant="primary" />`}
              language="tsx"
            />
            <S.Paragraph>
              <strong>Available locales (exported from @vbss-ui/calendar):</strong>
            </S.Paragraph>
            <S.TableSection>
              <Table headers={localesTableHeaders} rows={localesTableRows} />
            </S.TableSection>
            <S.SectionSubTitle>
              <S.SectionAnchor id="disabled" />
              Disabled
            </S.SectionSubTitle>
            <S.Paragraph>Disable the calendar interaction:</S.Paragraph>
            <ExampleContainer>
              <Calendar mode="single" selected={new Date()} onSelect={() => {}} disabled={true} variant="primary" />
            </ExampleContainer>
            <CodeSnippet code={disabledExampleCode} language="tsx" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="props" />
              Props
            </S.SectionTitle>
            <S.Paragraph>
              The Calendar component extends all props from <code>react-day-picker</code> and adds its own custom props for
              styling and behavior.
            </S.Paragraph>
            <S.TableSection>
              <Table headers={propsTableHeaders} rows={propsTableRows} />
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
              <Calendar
                mode="single"
                selected={new Date()}
                onSelect={() => {}}
                style={{ backgroundColor: "red", border: "2px solid red" }}
              />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using <code>className</code>
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customCalendar">
                <Calendar mode="single" selected={new Date()} onSelect={() => {}} />
              </div>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-colors" />
              Customizing Colors (Optional)
            </S.SectionSubTitle>
            <S.Paragraph>
              If you want to customize the colors used in the vbss-ui components, you can create a custom CSS file with your
              desired color scheme. Create a <code>.css</code> file (e.g., <code>custom-colors.css</code>) and define your colors
              using HSL format as follows:
            </S.Paragraph>
            <CodeSnippet
              language="css"
              code={`:root {
  --background: 0 0% 100%;
  --primary: 117 100% 47%;
  --secondary: 248 53% 58%;
}`}
            />
            <S.Paragraph>After creating your custom colors file, import it into your main file:</S.Paragraph>
            <CodeSnippet code='import "./custom-colors.css";' language="js" />
            <S.Paragraph>This will override the default colors with your custom colors.</S.Paragraph>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Calendar" sections={sections} />
    </>
  )
}
