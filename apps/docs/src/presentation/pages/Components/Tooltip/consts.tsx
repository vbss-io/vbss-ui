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
      { title: "Custom Trigger", anchor: "trigger" },
      { title: "Position", anchor: "position" },
      { title: "Variant", anchor: "variants" },
      { title: "Rounded", anchor: "rounded" },
      { title: "Size", anchor: "size" },
      { title: "Font Size", anchor: "font-size" },
      { title: "Font Weight", anchor: "font-weight" },
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

export const basicExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip trigger={<Button as="div">Hover me</Button>}>
      This is a tooltip
    </Tooltip>
  )
}`

export const usageExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip trigger={<Button as="div">Hover me</Button>}>
      This is a tooltip
    </Tooltip>
  )
}`

export const triggerExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip trigger={<Button as="div">Hover me</Button>}>
      This is a tooltip with a button trigger
    </Tooltip>
  )
}`

export const positionExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip
      trigger={<Button as="div">Top</Button>}
      side="top"
    >
      This tooltip appears on top
    </Tooltip>
  )
}`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline",
    description: "The visual style of the tooltip",
    default: "primary",
  },
  {
    prop: "size",
    type: "xs | sm | md | lg | xl",
    description: "The size of the tooltip",
    default: "md",
  },
  {
    prop: "rounded",
    type: "none | sm | md | lg | full",
    description: "The border radius of the tooltip",
    default: "md",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "The font size of the tooltip content",
    default: "md",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "The font weight of the tooltip content",
    default: "normal",
  },
  {
    prop: "side",
    type: "top | right | bottom | left",
    description: "The position of the tooltip relative to the trigger",
    default: "top",
  },
  {
    prop: "sideOffset",
    type: "number",
    description: "The distance between the tooltip and the trigger",
    default: "5",
  },
  {
    prop: "trigger",
    type: "React.ReactNode",
    description: "The element that triggers the tooltip",
    default: "-",
  },
  {
    prop: "ref",
    type: "React.Ref",
    description: "A ref to the tooltip element",
    default: "-",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS class names",
    default: "-",
  },
  {
    prop: "style",
    type: "React.CSSProperties",
    description: "Additional inline styles",
    default: "-",
  },
]

export const customizingExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip } from "@vbss-ui/tooltip"

export const MyComponent = () => {
  return (
    <Tooltip
      trigger={<Button as="div">Hover me</Button>}
      style={{
        backgroundColor: "red",
        color: "white",
      }}
    >
      This is a custom styled tooltip
    </Tooltip>
  )
}`

export const customizingClassExampleCode = `// CSS
.customTooltip {
  .tooltipTrigger {
    background-color: purple;
    color: white;
    border-radius: 1rem;
    padding: 1rem;
  }
  .tooltipContent {
    background-color: red;
  }
}
  
<div className="customTooltip">
  <Tooltip trigger={<Button as="div">Hover me</Button>}>
    This is a custom styled tooltip
  </Tooltip>
</div>`

export const realUsageExampleCode = `import { Tooltip } from "@vbss-ui/tooltip"
import { Question } from "@phosphor-icons/react"

export const App = () => {
  return (
    <div style={{ 
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "1rem",
      backgroundColor: "#f8fafc",
      borderRadius: "0.5rem",
      width: "fit-content"
    }}>
      <span style={{ 
        fontSize: "0.875rem",
        color: "#475569"
      }}>
        Password Requirements
      </span>
      <Tooltip 
        trigger={
          <Question 
            size={16} 
            style={{ 
              color: "#64748b",
              cursor: "pointer"
            }} 
          />
        }
        variant="outline"
        side="top"
        sideOffset={8}
        size="sm"
      >
        Must be at least 8 characters long and include a number
      </Tooltip>
    </div>
  )
}`
