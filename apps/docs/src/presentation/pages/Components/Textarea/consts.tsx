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

export const usageExampleCode = `import { Textarea } from "@vbss-ui/textarea"

export const App = () => {
  return <Textarea placeholder="Enter your message" />
}`

export const controlledExampleCode = `import { useState } from "react"
import { Textarea } from "@vbss-ui/textarea"

export const App = () => {
  const [value, setValue] = useState("")

  return (
    <Textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  )
}`

export const realUsageExampleCode = `import { Textarea } from "@vbss-ui/textarea"

export const App = () => {
  return (
    <div style={{ 
      width: "20rem",
      padding: "1.5rem",
      backgroundColor: "#f8fafc",
      borderRadius: "0.5rem"
    }}>
      <h3 style={{ 
        fontSize: "1.25rem", 
        fontWeight: "500",
        marginBottom: "1rem",
        color: "#1e293b"
      }}>
        Send Feedback
      </h3>
      <Textarea
        label="Your Message"
        placeholder="Tell us what you think..."
        error="Please provide your feedback"
        variant="outline"
        fontSize="md"
      />
    </div>
  )
}`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost",
    description: "Defines the visual style of the Textarea.",
    default: "primary",
  },
  {
    prop: "rounded",
    type: "none | sm | md | lg | full",
    description: "Sets the border radius of the Textarea.",
    default: "md",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "Sets the font size of the Textarea content.",
    default: "md",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "Specifies the font weight of the Textarea content.",
    default: "normal",
  },
  {
    prop: "label",
    type: "string",
    description: "Text label for the Textarea.",
    default: "-",
  },
  {
    prop: "error",
    type: "string",
    description: "Error message to display.",
    default: "-",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the Textarea interaction.",
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

export const customizingExampleCode = `<Textarea
  style={{
    backgroundColor: "red",
    color: "white"
  }}
  placeholder="Custom style"
/>`

export const customizingClassExampleCode = `//CSS
.customTextarea {
  .textareaContainer {
    .textareaLabel {
      color: red;
    }
    .textarea {
      background-color: purple;
      color: white
    }
  }
}


export const App = () => {
  return (
    <div className="customTextarea">
      <Textarea label="Label:" placeholder="Custom class" />
    </div>
  )
}`
