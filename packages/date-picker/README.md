# @vbss-ui/date-picker

A customizable and accessible Date Picker component with calendar popup.

## Features

- ✅ Controlled and uncontrolled modes
- ✅ Date validation (min/max dates, disabled dates)
- ✅ Date formatting with `date-fns`
- ✅ Localization support
- ✅ Keyboard navigation
- ✅ ARIA compliance
- ✅ Reduced motion support
- ✅ Clear button (optional)
- ✅ Portal rendering (optional)
- ✅ TypeScript support

## Installation

```bash
npm install @vbss-ui/date-picker
```

## Usage

### Basic Example

```tsx
import { DatePicker } from "@vbss-ui/date-picker"

function App() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      label="Select Date"
      value={date}
      onChange={setDate}
      placeholder="Choose a date..."
    />
  )
}
```

### Uncontrolled Mode

```tsx
import { DatePicker } from "@vbss-ui/date-picker"

function App() {
  return (
    <DatePicker
      label="Birth Date"
      defaultValue={new Date(1990, 0, 1)}
    />
  )
}
```

### Date Validation

```tsx
import { DatePicker } from "@vbss-ui/date-picker"
import { addDays, subDays } from "date-fns"

function App() {
  const today = new Date()

  return (
    <DatePicker
      label="Appointment Date"
      minDate={today}
      maxDate={addDays(today, 30)}
      disabledDates={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  )
}
```

### Custom Formatting

```tsx
import { DatePicker } from "@vbss-ui/date-picker"

function App() {
  return (
    <DatePicker
      label="Date"
      format="MM/dd/yyyy"
    />
  )
}
```

### With Localization

```tsx
import { DatePicker } from "@vbss-ui/date-picker"
import { ptBR } from "date-fns/locale"

function App() {
  return (
    <DatePicker
      label="Data"
      locale={ptBR}
    />
  )
}
```

### With Clear Button

```tsx
import { DatePicker } from "@vbss-ui/date-picker"

function App() {
  return (
    <DatePicker
      label="Date"
      allowClear
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date \| null` | - | Controlled value |
| `onChange` | `(date: Date \| null) => void` | - | Controlled onChange handler |
| `defaultValue` | `Date \| null` | - | Uncontrolled default value |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `disabledDates` | `Date[] \| ((date: Date) => boolean)` | - | Disabled dates |
| `format` | `string` | `"PP"` | Date format string (date-fns) |
| `locale` | `Locale` | - | date-fns locale |
| `label` | `ReactNode` | - | Label text or element |
| `placeholder` | `string` | `"Select date..."` | Input placeholder |
| `allowClear` | `boolean` | `false` | Show clear button |
| `withPortal` | `boolean` | `true` | Render calendar in portal |
| `disabled` | `boolean` | `false` | Disable input |
| `error` | `string` | - | Error message |
| `calendarVariant` | `"primary" \| "secondary" \| ...` | `"primary"` | Calendar variant |
| `calendarRounded` | `"none" \| "xs" \| "sm" \| ...` | `"md"` | Calendar border radius |
| `variant` | `"primary" \| "secondary" \| ...` | `"primary"` | Input variant |
| `height` | `"xs" \| "sm" \| "md" \| ...` | `"md"` | Input height |
| `rounded` | `"none" \| "xs" \| "sm" \| ...` | `"md"` | Input border radius |
| `fontSize` | `"xs" \| "sm" \| "md" \| ...` | `"md"` | Font size |
| `fontWeight` | `"thin" \| "light" \| ...` | `"normal"` | Font weight |

## Accessibility

The DatePicker component follows WAI-ARIA best practices:

- Proper ARIA labels and roles
- Keyboard navigation support (via react-day-picker)
- Focus management
- Screen reader support
- Reduced motion support

### Keyboard Shortcuts

When the calendar is open:

- `Arrow keys` - Navigate between dates
- `Enter` or `Space` - Select focused date
- `Escape` - Close calendar
- `Tab` - Move focus to next element

## TypeScript

The package includes full TypeScript definitions:

```tsx
import { DatePicker, DatePickerProps, DatePickerValue } from "@vbss-ui/date-picker"
```

## Dependencies

- `@vbss-ui/calendar` - Calendar component
- `@vbss-ui/input` - Input component
- `@vbss-ui/popover` - Popover component (via Radix UI)
- `date-fns` - Date utilities
- `react` >= 18.0.0
- `react-dom` >= 18.0.0

## License

MIT © VBSS
