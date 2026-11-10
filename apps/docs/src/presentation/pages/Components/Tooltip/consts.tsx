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
      { title: "Delay and Provider", anchor: "provider" },
    ],
  },
  { title: "Props", anchor: "props" },
  { title: "Migration", anchor: "migration" },
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
    <Tooltip trigger={<Button>Hover me</Button>}>
      This is a tooltip
    </Tooltip>
  )
}`

export const usageExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip trigger={<Button>Hover me</Button>}>
      This is a tooltip
    </Tooltip>
  )
}`

export const triggerExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip trigger={<Button>Hover me</Button>}>
      This is a tooltip with a button trigger
    </Tooltip>
  )
}`

export const positionExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <Tooltip
      trigger={<Button>Right</Button>}
      side="right"
      sideOffset={8}
    >
      This tooltip appears on the right
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
    default: "4",
  },
  {
    prop: "trigger",
    type: "React.ReactNode",
    description:
      "The element that triggers the tooltip. A React element becomes the trigger itself and must be focusable (use a button); any other node is wrapped in a button.",
    default: "-",
  },
  {
    prop: "delayDuration",
    type: "number",
    description: "How long in milliseconds the pointer must rest on the trigger before the tooltip opens.",
    default: "700",
  },
  {
    prop: "skipDelayDuration",
    type: "number",
    description:
      "How long in milliseconds after a tooltip closes the next one opens without delay. Used by the provider the Tooltip creates, so it has no effect with provider={false}.",
    default: "300",
  },
  {
    prop: "provider",
    type: "boolean",
    description:
      "When true the Tooltip creates its own provider. Pass false to use a TooltipProvider rendered above it and share the delay between tooltips.",
    default: "true",
  },
  {
    prop: "open",
    type: "boolean",
    description: "The controlled open state of the tooltip. Use it together with onOpenChange.",
    default: "-",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    description: "The open state of the tooltip when it is first rendered, for uncontrolled use.",
    default: "false",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
    default: "-",
  },
  {
    prop: "ref",
    type: "React.Ref",
    description: "A ref to the tooltip content element (HTMLDivElement)",
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

export const providerExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip, TooltipProvider } from "@vbss-ui/tooltip"

export const App = () => {
  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={500}>
      <Tooltip provider={false} trigger={<Button>First</Button>}>
        First tooltip
      </Tooltip>
      <Tooltip provider={false} trigger={<Button>Second</Button>}>
        Second tooltip
      </Tooltip>
    </TooltipProvider>
  )
}`

export const customizingExampleCode = `import { Button } from "@vbss-ui/button"
import { Tooltip } from "@vbss-ui/tooltip"

export const MyComponent = () => {
  return (
    <Tooltip
      trigger={<Button>Hover me</Button>}
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
  <Tooltip trigger={<Button>Hover me</Button>}>
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
          <button
            type="button"
            aria-label="Password requirements"
            style={{ display: "inline-flex", padding: 0, border: 0, background: "none", cursor: "pointer" }}
          >
            <Question size={16} style={{ color: "#64748b" }} />
          </button>
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

export const tooltipWhatsNew: { version: string; date: string; changes: string[] }[] = [
  {
    version: "2.0.0",
    date: "2026-05-16",
    changes: ["Added reduced-motion support for tooltip open/close animations"],
  },
]
