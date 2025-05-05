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
      { title: "Direction", anchor: "direction" },
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

export const basicExampleCode = `<RadioGroup
  defaultValue="option-1"
  values={[
    { value: "option-1", label: "Option 1" },
    { value: "option-2", label: "Option 2" }
  ]}
/>`

export const usageExampleCode = `import { RadioGroup } from "@vbss-ui/radio-group"

export const App = () => {
  return (
    <RadioGroup
      values={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" }
      ]}
    />
  )
}`

export const controlledExampleCode = `import { useState } from "react"
import { RadioGroup } from "@vbss-ui/radio-group"

export const App = () => {
  const [value, setValue] = useState("option1")

  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      values={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" }
      ]}
    />
  )
}`

export const labelExampleCode = `<RadioGroup
  label="Select an Option:"
  defaultValue="option1"
  values={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" }
  ]}
/>`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost",
    description: "Defines the visual style of the RadioGroup.",
    default: "primary",
  },
  {
    prop: "size",
    type: "xs | sm | md | lg | xl",
    description: "Sets the size of the RadioGroup.",
    default: "sm",
  },
  {
    prop: "rounded",
    type: "none | sm | md | lg | full",
    description: "Sets the border radius of the RadioGroup.",
    default: "md",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "Sets the font size of the RadioGroup label.",
    default: "md",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "Specifies the font weight of the RadioGroup label.",
    default: "normal",
  },
  {
    prop: "direction",
    type: "col | row",
    description: "Change the items direction for the RadioGroup.",
    default: "col",
  },
  {
    prop: "label",
    type: "string",
    description: "Text label for the RadioGroup.",
    default: "-",
  },
  {
    prop: "icon",
    type: "ReactNode",
    description: "Custom icon for the checked state.",
    default: "-",
  },
  {
    prop: "values",
    type: "{ value: string; label: string }[]",
    description: "Array of options for the RadioGroup.",
    default: "[]",
  },
  {
    prop: "value",
    type: "string",
    description: "Controlled value of the RadioGroup.",
    default: "-",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Callback when value changes.",
    default: "-",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Default value of the RadioGroup.",
    default: "-",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the RadioGroup interaction.",
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

export const customizingExampleCode = `<RadioGroup
  style={{
    backgroundColor: "red",
    color: "white"
  }}
  values={[
    { value: "option1", label: "Custom style" },
    { value: "option2", label: "Custom style" }
  ]}
/>`

export const customizingClassExampleCode = `// CSS
.customRadioGroup {
  .radioGroupContainer {
    .radioGroupLabel {
      color: red;
    }
    .radioGroupRoot {
      .radioGroupItemContainer {
        .radioGroupItem {
          .radioGroupIndicator {
          }
        }
        .radioGroupItemLabel {
          color: blue;
        }
      }
    }
  }
}

<div className="customRadioGroup">
  <RadioGroup
    label="Select an Option:"
    values={[
      { value: "option1", label: "Custom class" },
      { value: "option2", label: "Custom class" }
    ]}
  />
</div>`
