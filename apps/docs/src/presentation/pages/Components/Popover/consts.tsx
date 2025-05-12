export const sections = [
  {
    title: "Installation",
    anchor: "installation",
    subsections: [
      { title: "Using npm", anchor: "using-npm" },
      { title: "Using yarn", anchor: "using-yarn" },
    ],
  },
  {
    title: "Usage",
    anchor: "usage",
    subsections: [
      { title: "Variant", anchor: "variants" },
      { title: "Size", anchor: "sizes" },
      { title: "Positioning", anchor: "positioning" },
      { title: "Rounded", anchor: "rounded" },
      { title: "Font Size", anchor: "font-size" },
      { title: "Font Weight", anchor: "font-weight" },
      { title: "Alignment", anchor: "align" },
      { title: "Side Offset", anchor: "side-offset" },
    ],
  },
  { title: "Props", anchor: "props" },
  {
    title: "Customization",
    anchor: "customization",
    subsections: [
      { title: "Using style", anchor: "custom-style" },
      { title: "Using className", anchor: "custom-classname" },
    ],
  },
]

export const usageExampleCode = `import { Popover } from "@vbss-ui/popover"
import { Button } from "@vbss-ui/button"

export const App = () => {
  return (
    <Popover
      trigger={<Button as="div">Click Me</Button>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Button variant="ghost">Button</Button>
        <Button variant="ghost">Button</Button>
      </div>
    </Popover>
  )
}`

export const realUsageExampleCode = `import { Popover } from "@vbss-ui/popover"
import { Button } from "@vbss-ui/button"
import { User } from "@phosphor-icons/react"

export const App = () => {
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "1rem",
      padding: "1rem",
      backgroundColor: "#f3f4f6",
      borderRadius: "0.5rem"
    }}>
      <span style={{ fontSize: "0.875rem" }}>User Profile:</span>
      <Popover 
        trigger={
          <Button as="div" variant="outline">
            <User size={20} />
            John Doe
          </Button>
        }
        side="bottom"
        align="start"
      >
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "0.5rem",
          minWidth: "200px"
        }}>
          <div style={{ 
            padding: "0.5rem", 
            borderBottom: "1px solid #e5e7eb" 
          }}>
            <div style={{ fontWeight: "500" }}>John Doe</div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>john.doe@example.com</div>
          </div>
          <Button variant="ghost" style={{ justifyContent: "flex-start" }}>
            Edit Profile
          </Button>
          <Button variant="ghost" style={{ justifyContent: "flex-start", color: "#ef4444" }}>
            Sign Out
          </Button>
        </div>
      </Popover>
    </div>
  )
}`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline",
    description: "Defines the visual style of the Popover.",
    default: "primary",
  },
  {
    prop: "size",
    type: "xs | sm | md | lg | xl",
    description: "Sets the padding size of the Popover.",
    default: "md",
  },
  {
    prop: "rounded",
    type: "none | sm | md | lg | full",
    description: "Sets the border radius of the Popover.",
    default: "md",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "Sets the font size of the Popover content.",
    default: "md",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "Sets the font weight of the Popover content.",
    default: "normal",
  },
  {
    prop: "trigger",
    type: "React.ReactNode",
    description: "The element that triggers the Popover.",
    default: "<div />",
  },
  {
    prop: "side",
    type: "top | right | bottom | left",
    description: "Sets the position of the Popover.",
    default: "top",
  },
  {
    prop: "align",
    type: "start | center | end",
    description: "Sets the alignment of the Popover.",
    default: "center",
  },
  {
    prop: "sideOffset",
    type: "number",
    description: "Sets the offset from the trigger element.",
    default: "4",
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

export const customizingExampleCode = `<Popover
  trigger={<Button as="div">Open Popover</Button>}
  style={{
    backgroundColor: "red",
    color: "white",
  }}
>
  Custom styled popover
</Popover>`

export const customizingClassExampleCode = `// CSS
.customPopover {
  .popoverTrigger {
    background-color: red;
    padding: 1rem;
  }
}

.popoverContent {}

export const App = () => {
  return (
    <div className="customPopover">
      <Popover trigger={<Button as="div">Open Popover</Button>}>
        Custom styled popover
      </Popover>
    </div>
  )
}`
