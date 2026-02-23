# @vbss-ui/calendar

> A customizable and accessible Calendar component built with React and react-day-picker.

The Calendar component is a flexible date picker that supports various selection modes, internationalization, and customizable styling. Built with react-day-picker, it provides a clean and modern interface for date selection with accessibility features and multiple visual variants.

## **Installation**

To install only the **Calendar** component, run one of the following commands:

```bash
npm install @vbss-ui/calendar
# or
yarn add @vbss-ui/calendar
```

---

## **Usage**

```tsx
import { Calendar } from "@vbss-ui/calendar"
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
}
```

---

## **Examples**

### With Locale (Internationalization)

```tsx
import { Calendar, ptBR } from "@vbss-ui/calendar"
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
}
```

**Available locales (exported from `@vbss-ui/calendar`):**

- `ptBR` - Portuguese (Brazil)
- `enUS` - English (US)
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `ja` - Japanese
- `ko` - Korean
- `zhCN` - Chinese (Simplified)
- `ru` - Russian

For other locales, import directly from `date-fns/locale`. [See all locales](https://date-fns.org)

---

## **Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "outline" \| "outlineSolid" \| "ghost"` | `"primary"` | Visual style variant |
| `rounded` | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "full"` | `"md"` | Border radius (full = circular selected days) |
| `mode` | `"single" \| "multiple" \| "range"` | `"single"` | Selection mode |
| `locale` | `Locale` | `enUS` | Date-fns locale for internationalization |
| `disabled` | `boolean` | `false` | Disable the calendar |
| `showOutsideDays` | `boolean` | `true` | Show days from previous/next month |
| `selected` | `Date \| Date[] \| { from: Date; to?: Date }` | - | Selected date(s) |
| `onSelect` | `(date: Date \| Date[] \| { from: Date; to?: Date } \| undefined) => void` | - | Selection callback |

---

## **Customization**

You can extend the default styles by passing custom styles using className or style.

```tsx
<Calendar
  style={{
    backgroundColor: "red"
  }}
/>
```

Or you can use the default component classNames.

```css
.customCalendar {
  .calendar {
    background-color: blue;
    .day {
      color: red;
    }
  }
}
```

```tsx
import "./custom.css"

export const App = () => {
  return <Calendar />
}
```

## **Customizing Colors (Optional)**

If you want to customize the colors used in the vbss-ui components, you can create a custom CSS file with your desired color scheme. Create a .css file (e.g., custom-colors.css) and define your colors using HSL format as follows:

```css
:root {
  --background: 0 0% 100%;
  --primary: 117 100% 47%;
  --secondary: 248 53% 58%;
}
```

After creating your custom colors file, import it into your main file:

```js
import "./custom-colors.css";
```

This will override the default colors with your custom colors.

---

### Single Date Selection

```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  variant="primary"
/>
```

### Multiple Date Selection

```tsx
<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
  variant="secondary"
/>
```

### Date Range Selection

```tsx
<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  variant="outline"
/>
```

### Custom Styling

```tsx
<Calendar
  variant="ghost"
  rounded="full"
  showOutsideDays={false}
/>
```

---

### **More**

For more information, please visit the [repository](https://github.com/vbss-io/vbss-ui) or check out the documentation at [ui.vbss.io/calendar](https://ui.vbss.io/calendar).

To see the components in action, run Storybook locally. Navigate to the repository directory and execute:

```bash
npm run storybook
```

---

## **Support**

Help us keep vbss-ui free and open source. Your support enables continuous development, better docs and new components.

- Buy me a coffee: [buymeacoffee.com/vbss.io](https://www.buymeacoffee.com/vbss.io)
- Star on GitHub: [github.com/vbss-io/vbss-ui](https://github.com/vbss-io/vbss-ui)
- Share with community: [ui.vbss.io](https://ui.vbss.io)

Thank you for supporting the project!
