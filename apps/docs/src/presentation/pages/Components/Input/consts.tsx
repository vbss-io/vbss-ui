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
      { title: "Error State", anchor: "error" },
      { title: "Password Input", anchor: "password" },
      { title: "With Button", anchor: "with-button" },
      { title: "Font Size", anchor: "font-size" },
      { title: "Font Weight", anchor: "font-weight" },
      { title: "Disabled", anchor: "disabled" },
      { title: "Props", anchor: "props" },
    ],
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

export const usageExampleCode = `import { Input } from "@vbss-ui/input"

export const App = () => {
  return <Input placeholder="Enter your name" />
}`

export const controlledExampleCode = `import { useState } from "react"
import { Input } from "@vbss-ui/input"

export const App = () => {
  const [value, setValue] = useState("")

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  )
}`

export const errorExampleCode = `<Input error="This field is required" />`

export const passwordExampleCode = `import { Eye, EyeSlash } from "@phosphor-icons/react"
import { Input } from "@vbss-ui/input"

export const App = () => {
  return (
    <Input
      label="Password:"
      type="password"
      showPasswordSwitch
      iconOn={<Eye />}
      iconOff={<EyeSlash />}
      placeholder="Enter your password"
    />
  )
}`

export const withButtonExampleCode = `<Input
  placeholder="Enter your email"
  buttonProps={{
    children: "Subscribe",
    onClick: () => console.log("Subscribed!"),
  }}
/>`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost",
    description: "Defines the visual style of the Input.",
    default: "primary",
  },
  {
    prop: "height",
    type: "xs | sm | md | lg | xl",
    description: "Sets the height of the Input.",
    default: "md",
  },
  {
    prop: "rounded",
    type: "none | xs | sm | md | lg | full",
    description: "Sets the border radius of the Input.",
    default: "md",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "Sets the font size of the Input content.",
    default: "md",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "Specifies the font weight of the Input content.",
    default: "normal",
  },
  {
    prop: "type",
    type: "text | password | number",
    description: "Sets the input type.",
    default: "text",
  },
  {
    prop: "label",
    type: "string",
    description: "Text label for the Input.",
    default: "-",
  },
  {
    prop: "error",
    type: "string",
    description: "Error message to display.",
    default: "-",
  },
  {
    prop: "showPasswordSwitch",
    type: "boolean",
    description: "Enables password visibility toggle.",
    default: "false",
  },
  {
    prop: "iconOn",
    type: "React.ReactNode",
    description: "Icon to display when password is hidden.",
    default: "-",
  },
  {
    prop: "iconOff",
    type: "React.ReactNode",
    description: "Icon to display when password is visible.",
    default: "-",
  },
  {
    prop: "buttonProps",
    Type: <a href="button">ButtonProps</a>,
    description: "Props for the attached button.",
    default: "-",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the Input interaction.",
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

export const customizingExampleCode = `<Input
  style={{
    backgroundColor: "black",
    color: "white"
  }}
  placeholder="Custom style"
/>`

export const customizingClassExampleCode = `//CSS
.customInput {
  .inputRoot {
    .inputLabel {
      color: purple
    }
    .inputContainer {
      .inputContent {
        .input {
          background-color: red !important;
        }
        .inputIconOnContainer {
          .inputIconOn {}
        }
        .inputIconOffContainer {
          .inputIconOff {}
        }
        .button {
          /* ...Button classNames */
        }
      }
    }
    .inputError {
      color: blue
    }
  }
}

export const App = () => {
  return (
    <div className="customInput">
      <Input label="Custom Class:" placeholder="Custom class" error="Required field" />
    </div>
  )
}`
