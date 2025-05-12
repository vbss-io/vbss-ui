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
      { title: "State Management", anchor: "state-management" },
      { title: "Variant", anchor: "variants" },
      { title: "Rounded", anchor: "rounded" },
      { title: "Size", anchor: "size" },
      { title: "Label", anchor: "label" },
      { title: "Font Size", anchor: "font-size" },
      { title: "Font Weight", anchor: "font-weight" },
      { title: "Disabled", anchor: "disabled" },
    ],
  },
  { title: "Props", anchor: "props" },
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

export const usageExampleCode = `import { Checkbox } from "@vbss-ui/checkbox"

export const App = () => {
  return <Checkbox label="Accept terms" />
}`

export const controlledExampleCode = `import { useState } from "react"
import { Checkbox } from "@vbss-ui/checkbox"

export const App = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      label="Accept terms"
    />
  )
}`

export const realUsageExampleCode = `import { Checkbox } from "@vbss-ui/checkbox"
import { useState } from "react"

export const App = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox
        label="Subscribe to newsletter"
        checked={isSubscribed}
        onCheckedChange={setIsSubscribed}
      />
      <p style={{ fontSize: "0.875rem", color: "#666" }}>
        {isSubscribed ? "Subscribed" : "Not subscribed"}
      </p>
    </div>
  )
}`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost",
    description: "Defines the visual style of the Checkbox.",
    default: "primary",
  },
  {
    prop: "size",
    type: "xs | sm | md | lg | xl",
    description: "Sets the size of the Checkbox.",
    default: "sm",
  },
  {
    prop: "rounded",
    type: "none | sm | md | lg | full",
    description: "Sets the border radius of the Checkbox.",
    default: "md",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "Sets the font size of the Checkbox label.",
    default: "md",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "Specifies the font weight of the Checkbox label.",
    default: "normal",
  },
  {
    prop: "label",
    type: "string",
    description: "Text label for the Checkbox.",
    default: "-",
  },
  {
    prop: "icon",
    type: "ReactNode",
    description: "Custom icon for the checked state.",
    default: "-",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the Checkbox interaction.",
    default: "false",
  },
  {
    prop: "ref",
    type: "React.Ref",
    description: "Allows accessing the underlying DOM element.",
    default: "-",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes for custom styling.",
    default: "-",
  },
  {
    prop: "style",
    type: "React.CSSProperties",
    description: "Additional style for custom styling.",
    default: "-",
  },
]

export const customizingExampleCode = `<Checkbox
  style={{
    backgroundColor: "red",
    color: "white"
  }}
  label="Custom style"
/>`

export const customizingClassExampleCode = `//CSS
.customCheckbox {
  .checkboxContainer {
    .checkboxRoot {
      background-color: blue;
      .checkboxIconContainer {
        color: red;
      }
    }
    .checkboxLabel {
      color: red;
    }
  }
}

<div className="customCheckbox">
  <Checkbox label="Custom class" />
</div>`
