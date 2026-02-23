export const sections = [
  {
    title: "Installation",
    anchor: "installation",
    subsections: [
      {
        title: "Using npm",
        anchor: "using-npm",
      },
      {
        title: "Using yarn",
        anchor: "using-yarn",
      },
    ],
  },
  {
    title: "Usage",
    anchor: "usage",
    subsections: [
      { title: "Basic Usage", anchor: "basic-usage" },
      { title: "Controlled/Uncontrolled", anchor: "controlled-uncontrolled" },
      { title: "With Locale", anchor: "with-locale" },
      { title: "Validation", anchor: "validation" },
      { title: "Variant", anchor: "variants" },
      { title: "Styling", anchor: "styling" },
      { title: "Accessibility", anchor: "accessibility" },
    ],
  },
  {
    title: "Props",
    anchor: "props",
  },
  {
    title: "Customization",
    anchor: "customization",
    subsections: [
      {
        title: "Using style",
        anchor: "custom-style",
      },
      {
        title: "Using className",
        anchor: "custom-classname",
      },
    ],
  },
]

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "value",
    type: "Date | null",
    description: "Controlled mode: the selected date value",
    default: "-",
  },
  {
    prop: "defaultValue",
    type: "Date | null",
    description: "Uncontrolled mode: the initial date value",
    default: "-",
  },
  {
    prop: "onChange",
    type: "(date: Date | null) => void",
    description: "Callback fired when the date changes",
    default: "-",
  },
  {
    prop: "minDate",
    type: "Date",
    description: "Minimum selectable date",
    default: "-",
  },
  {
    prop: "maxDate",
    type: "Date",
    description: "Maximum selectable date",
    default: "-",
  },
  {
    prop: "disabledDates",
    type: "Date[] | ((date: Date) => boolean)",
    description: "Array of dates or function to disable specific dates",
    default: "-",
  },
  {
    prop: "format",
    type: "string",
    description: "Date format string (date-fns format tokens)",
    default: '"PP"',
  },
  {
    prop: "locale",
    type: "Locale",
    description: "date-fns Locale for internationalization",
    default: "-",
  },
  {
    prop: "label",
    type: "React.ReactNode",
    description: "Label text for the date picker",
    default: "-",
  },
  {
    prop: "placeholder",
    type: "string",
    description: "Placeholder text for the input",
    default: '"Select date..."',
  },
  {
    prop: "allowClear",
    type: "boolean",
    description: "Show clear button when date is selected",
    default: "false",
  },
  {
    prop: "withPortal",
    type: "boolean",
    description: "Render calendar in a portal",
    default: "true",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disable the date picker",
    default: "false",
  },
  {
    prop: "error",
    type: "string",
    description: "Error message to display",
    default: "-",
  },
  {
    prop: "calendarVariant",
    type: '"primary" | "secondary" | "outline" | "outlineSolid" | "ghost"',
    description: "Visual style variant for the calendar",
    default: '"primary"',
  },
  {
    prop: "calendarRounded",
    type: '"none" | "xs" | "sm" | "md" | "lg" | "full"',
    description: "Border radius for the calendar",
    default: '"md"',
  },
  {
    prop: "variant",
    type: '"primary" | "secondary" | "outline" | "ghost"',
    description: "Visual style variant for the input",
    default: '"primary"',
  },
  {
    prop: "height",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    description: "Height of the input",
    default: '"md"',
  },
  {
    prop: "rounded",
    type: '"none" | "xs" | "sm" | "md" | "lg" | "full"',
    description: "Border radius for the input",
    default: '"md"',
  },
  {
    prop: "fontSize",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    description: "Font size for the input and label",
    default: '"md"',
  },
  {
    prop: "fontWeight",
    type: '"thin" | "light" | "normal" | "medium" | "bold" | "extrabold"',
    description: "Font weight for the input and label",
    default: '"normal"',
  },
  {
    prop: "aria-label",
    type: "string",
    description: "Accessible label for screen readers",
    default: "-",
  },
  {
    prop: "aria-describedby",
    type: "string",
    description: "ID of element that describes the date picker",
    default: "-",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes for custom styling",
    default: "-",
  },
  {
    prop: "style",
    type: "React.CSSProperties",
    description: "Additional style for custom styling",
    default: "-",
  },
]

export const usageExampleCode = `import { DatePicker } from "@vbss-ui/date-picker"
import { useState } from "react"

export const App = () => {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Select a date"
    />
  )
}`

export const controlledExampleCode = `import { DatePicker } from "@vbss-ui/date-picker"
import { useState } from "react"

export const App = () => {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      label="Select Date"
    />
  )
}`

export const uncontrolledExampleCode = `import { DatePicker } from "@vbss-ui/date-picker"

export const App = () => {
  return (
    <DatePicker
      defaultValue={new Date()}
      label="Select Date"
    />
  )
}`

export const localeExampleCode = `import { DatePicker } from "@vbss-ui/date-picker"
import { ptBR } from "date-fns/locale"
import { useState } from "react"

export const App = () => {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      locale={ptBR}
      format="PP"
      label="Selecione uma data"
    />
  )
}`

export const validationExampleCode = `import { DatePicker } from "@vbss-ui/date-picker"
import { useState } from "react"
import { subDays, addDays } from "date-fns"

export const App = () => {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      minDate={subDays(new Date(), 7)}
      maxDate={addDays(new Date(), 30)}
      disabledDates={[
        new Date(),
        addDays(new Date(), 1),
      ]}
      label="Select Date (next 7-30 days)"
    />
  )
}`

export const realUsageExampleCode = `import { DatePicker } from "@vbss-ui/date-picker"
import { ptBR } from "date-fns/locale"
import { useState } from "react"

export const App = () => {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
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
        <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
          Selected: {date.toLocaleDateString("pt-BR")}
        </p>
      )}
    </div>
  )
}`

export const customizingExampleCode = `<DatePicker
  style={{
    backgroundColor: "#f3f4f6",
    border: "2px solid #e5e7eb"
  }}
  label="Custom styled date picker"
/>`

export const customizingClassExampleCode = `// CSS
.customDatePicker {
  .datePickerRoot {
    .datePickerTriggerContainer {
      .datePickerTrigger {
        background-color: #f3f4f6;
        border: 2px solid #e5e7eb;
      }
    }
  }
}

// Usage
import "./custom.css"

export const App = () => {
  return (
    <div className="customDatePicker">
      <DatePicker label="Custom styled" />
    </div>
  )
}`
