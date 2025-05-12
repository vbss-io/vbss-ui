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
      { title: "Height", anchor: "height" },
      { title: "Label", anchor: "label" },
      { title: "Controls", anchor: "controls" },
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
      onChange={(e) => setValue(e.anchor.value)}
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
    prop: "error",
    type: "string",
    description: "Error message to display.",
    default: "-",
  },
  {
    prop: "isFloat",
    type: "boolean",
    description: "Enables decimal number input with specified decimal places.",
    default: "false",
  },
  {
    prop: "step",
    type: "number",
    description: "Increment/decrement step value. For float values, this can be a decimal number.",
    default: "1",
  },
  {
    prop: "denyNegative",
    type: "boolean",
    description: "When true, prevents negative values in the input. Values below 0 will be set to 0.",
    default: "false",
  },
  {
    prop: "disableControls",
    Type: "boolean",
    description: "Prop to disable Input controls.",
    default: "false",
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

export const realUsageExampleCode = `import { InputNumber } from "@vbss-ui/input-number"
import { Button } from "@vbss-ui/button"
import { useState } from "react"

export const App = () => {
  const [quantity, setQuantity] = useState("")
  const [quantityError, setQuantityError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setQuantityError("")
    if (!quantity) {
      return setQuantityError("Quantity is required")
    }
    const numQuantity = Number(quantity)
    if (numQuantity < 1 || numQuantity > 10) {
      return setQuantityError("Quantity must be between 1 and 10")
    }
    console.log({ quantity: numQuantity })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.5rem",
        backgroundColor: "#f3f4f6",
        borderRadius: "0.5rem",
      }}
    >
      <h3 style={{ fontSize: "1.25rem", fontWeight: "500", margin: 0 }}>Product Order</h3>
      <InputNumber
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter quantity"
        error={quantityError}
        isFloat
        step={0.1}
      />
      <Button type="submit">Add to Cart</Button>
    </form>
  )
}`
