export const sections = [
  {
    title: "Installation",
    target: "installation",
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
    target: "usage",
    subsections: [
      { title: "State Management", target: "state-management" },
      { title: "Variant", target: "variants" },
      { title: "Rounded", target: "rounded" },
      { title: "Height", target: "height" },
      { title: "Label", target: "label" },
      { title: "Controls", target: "controls" },
      { title: "Font Size", target: "font-size" },
      { title: "Font Weight", target: "font-weight" },
      { title: "Disabled", target: "disabled" },
    ],
  },
  { title: "Props", target: "props" },
  {
    title: "Customization",
    target: "customization",
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

export const basicExampleCode = `<InputNumber placeholder="Enter a number" plusIcon={<Plus />} minusIcon={<Minus />} />`

export const usageExampleCode = `import { InputNumber } from "@vbss-ui/input-number"

export const App = () => {
  return <InputNumber placeholder="Enter a number" />
}`

export const controlledExampleCode = `import { useState } from "react"
import { InputNumber } from "@vbss-ui/input-number"

export const App = () => {
  const [value, setValue] = useState("")

  return (
    <InputNumber
      label="Quantity:"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type a number..."
      plusIcon={<Plus />}
      minusIcon={<Minus />}
    />
  )
}`

export const controlsExampleCode = `<InputNumber
  controlsProps={{
    variant: "primary",
    rounded: "full",
  }}
  plusIcon={<Plus />}
  minusIcon={<Minus />}
  placeholder="With controls"
/>`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost",
    description: "Defines the visual style of the InputNumber.",
    default: "primary",
  },
  {
    prop: "height",
    type: "xs | sm | md | lg | xl",
    description: "Sets the height of the InputNumber.",
    default: "md",
  },
  {
    prop: "rounded",
    type: "none | xs | sm | md | lg | full",
    description: "Sets the border radius of the InputNumber.",
    default: "md",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "Sets the font size of the InputNumber content.",
    default: "md",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "Specifies the font weight of the InputNumber content.",
    default: "normal",
  },
  {
    prop: "label",
    type: "string",
    description: "Text label for the InputNumber.",
    default: "-",
  },
  {
    prop: "controlsProps",
    Type: <a href="button">ButtonProps</a>,
    description: "Props for the increment/decrement buttons.",
    default: "-",
  },
  {
    prop: "plusIcon",
    type: "React.ReactNode",
    description: "Icon for increment action.",
    default: "-",
  },
  {
    prop: "minusIcon",
    type: "React.ReactNode",
    description: "Icon for decrement action. ",
    default: "-",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the InputNumber interaction.",
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

export const customizingExampleCode = `<InputNumber
  style={{
    backgroundColor: "red",
    color: "white"
  }}
  placeholder="Custom style"
/>`

export const customizingClassExampleCode = `//CSS
.inputNumberContainer {
  .inputNumberLabel {
    color: purple;
  }
  .inputNumberContent {
    .inputNumberLeftControlContainer {
      .inputNumberLeftControl {
        .button {
          /* ...Button classNames */
        }
      }
    }
    .inputNumber {
      background-color: red;
      color: white
    }
    .inputNumberRightControlContainer {
      .inputNumberRightControl {
        .button {
          /* ...Button classNames */
        }
      }
    }
  }
}

export const App = () => {
  return (
    <div className="customInputNumber">
      <InputNumber label="Label:" placeholder="Custom class" />
    </div>
  )
}`
