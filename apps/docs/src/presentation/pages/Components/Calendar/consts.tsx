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
      {
        title: "Basic Usage",
        anchor: "basic-usage",
      },
      {
        title: "With Locale",
        anchor: "with-locale",
      },
      {
        title: "Selection Modes",
        anchor: "selection-modes",
      },
      {
        title: "Variants",
        anchor: "variants",
      },
      {
        title: "Rounded",
        anchor: "rounded",
      },
      {
        title: "Disabled",
        anchor: "disabled",
      },
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
        title: "Custom Styles",
        anchor: "custom-styles",
      },
      {
        title: "Custom Colors",
        anchor: "custom-colors",
      },
    ],
  },
]

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Default" }, { content: "Description" }]

export const propsTableRows = [
  {
    prop: "variant",
    Type: '"primary" | "secondary" | "outline" | "outlineSolid" | "ghost"',
    Default: '"primary"',
    Description: "Visual style variant",
  },
  {
    prop: "rounded",
    Type: '"none" | "xs" | "sm" | "md" | "lg" | "full"',
    Default: '"md"',
    Description: "Border radius (full = circular selected days)",
  },
  {
    prop: "mode",
    Type: '"single" | "multiple" | "range"',
    Default: '"single"',
    Description: "Selection mode",
  },
  {
    prop: "locale",
    Type: "Locale",
    Default: "enUS",
    Description: "Date-fns locale for internationalization",
  },
  {
    prop: "disabled",
    Type: "boolean",
    Default: "false",
    Description: "Disable the calendar",
  },
  {
    prop: "showOutsideDays",
    Type: "boolean",
    Default: "true",
    Description: "Show days from previous/next month",
  },
  {
    prop: "selected",
    Type: "Date | Date[] | { from: Date; to?: Date }",
    Default: "-",
    Description: "Selected date(s)",
  },
  {
    prop: "onSelect",
    Type: "(date: Date | Date[] | { from: Date; to?: Date } | undefined) => void",
    Default: "-",
    Description: "Selection callback",
  },
]

export const usageExampleCode = `import { Calendar } from "@vbss-ui/calendar"
import { useState } from "react"

export const App = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      variant="primary"
      rounded="md"
      showOutsideDays={true}
    />
  )
}`

export const localeExampleCode = `import { Calendar, ptBR } from "@vbss-ui/calendar"
import { useState } from "react"

export const App = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      locale={ptBR}
      variant="primary"
      rounded="md"
    />
  )
}`

export const multipleSelectionExampleCode = `import { Calendar } from "@vbss-ui/calendar"
import { useState } from "react"

export const App = () => {
  const [selected, setSelected] = useState<Date[]>([])

  return (
    <Calendar
      mode="multiple"
      selected={selected}
      onSelect={setSelected}
      variant="secondary"
    />
  )
}`

export const rangeSelectionExampleCode = `import { Calendar } from "@vbss-ui/calendar"
import { useState } from "react"

export const App = () => {
  const [selected, setSelected] = useState<{ from: Date; to?: Date } | undefined>()

  return (
    <Calendar
      mode="range"
      selected={selected}
      onSelect={setSelected}
      variant="outline"
    />
  )
}`

export const variantsExampleCode = `// Primary variant (default)
<Calendar variant="primary" />

// Secondary variant
<Calendar variant="secondary" />

// Outline variant
<Calendar variant="outline" />

// Outline Solid variant
<Calendar variant="outlineSolid" />

// Ghost variant
<Calendar variant="ghost" />`

export const roundedExampleCode = `// Different rounded variants
<Calendar rounded="none" />
<Calendar rounded="xs" />
<Calendar rounded="sm" />
<Calendar rounded="md" />
<Calendar rounded="lg" />
<Calendar rounded="full" /> // Selected days will be circular`

export const disabledExampleCode = `import { Calendar } from "@vbss-ui/calendar"

export const App = () => {
  return (
    <Calendar
      disabled={true}
      variant="primary"
    />
  )
}`

export const customizingExampleCode = `import { Calendar } from "@vbss-ui/calendar"

export const App = () => {
  return (
    <Calendar
      style={{
        backgroundColor: "red",
        border: "2px solid red"
      }}
    />
  )
}`

export const customizingClassExampleCode = `// CSS
.customCalendar {
  .calendar {
    background-color: blue;
    .day {
      color: red;
    }
  }
}

// Usage
import "./custom.css"

export const App = () => {
  return <Calendar className="customCalendar" />
}`

export const realUsageExampleCode = `import { Calendar, ptBR } from "@vbss-ui/calendar"
import { useState } from "react"

export const App = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date())

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        locale={ptBR}
        variant="primary"
        rounded="md"
        showOutsideDays={true}
      />
      {selected && (
        <p className="mt-4 text-sm text-gray-600">
          Selected: {selected.toLocaleDateString('pt-BR')}
        </p>
      )}
    </div>
  )
}`

export const calendarWhatsNew = [
  {
    version: "1.0.0",
    date: "2024-01-15",
    changes: [
      "Initial release of Calendar component",
      "Support for single, multiple, and range selection modes",
      "Internationalization with 10+ locales",
      "5 visual variants (primary, secondary, outline, outlineSolid, ghost)",
      "Customizable rounded corners with circular selected days",
      "Accessibility features and keyboard navigation",
      "Built with react-day-picker for reliability",
    ],
  },
]

export const localesTableHeaders = [{ content: "Locale" }, { content: "Language" }, { content: "Import" }]

export const localesTableRows = [
  {
    locale: "ptBR",
    language: "Portuguese (Brazil)",
    import: "import { ptBR } from '@vbss-ui/calendar'",
  },
  {
    locale: "enUS",
    language: "English (US)",
    import: "import { enUS } from '@vbss-ui/calendar'",
  },
  {
    locale: "es",
    language: "Spanish",
    import: "import { es } from '@vbss-ui/calendar'",
  },
  {
    locale: "fr",
    language: "French",
    import: "import { fr } from '@vbss-ui/calendar'",
  },
  {
    locale: "de",
    language: "German",
    import: "import { de } from '@vbss-ui/calendar'",
  },
  {
    locale: "it",
    language: "Italian",
    import: "import { it } from '@vbss-ui/calendar'",
  },
  {
    locale: "ja",
    language: "Japanese",
    import: "import { ja } from '@vbss-ui/calendar'",
  },
  {
    locale: "ko",
    language: "Korean",
    import: "import { ko } from '@vbss-ui/calendar'",
  },
  {
    locale: "zhCN",
    language: "Chinese (Simplified)",
    import: "import { zhCN } from '@vbss-ui/calendar'",
  },
  {
    locale: "ru",
    language: "Russian",
    import: "import { ru } from '@vbss-ui/calendar'",
  },
]
