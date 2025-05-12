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
      { title: "Variant", anchor: "variants" },
      { title: "Rounded", anchor: "rounded" },
      { title: "Overlay", anchor: "overlay" },
      { title: "Content", anchor: "content" },
      { title: "Controlled State", anchor: "controlled-state" },
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

export const usageExampleCode = `import { Dialog } from "@vbss-ui/dialog"
import { Button } from "@vbss-ui/button"

export const App = () => {
  return (
    <Dialog
      trigger={<Button as="div">Open Dialog</Button>}
      title="Dialog Title"
      description="Dialog Description"
    >
      <div>Dialog Content</div>
    </Dialog>
  )
}`

export const basicExampleCode = `<Dialog
  trigger={<Button as="div">Open Dialog</Button>}
  title="Dialog Title"
  description="Dialog Description"
  footer="Dialog Footer"
>
  <div>Dialog Content</div>
</Dialog>`

export const contentExampleCode = `<Dialog
  variant="ghost"
  trigger={<Button as="div">Content Example</Button>}
  title="Dialog Title"
  description="This is a description"
  footer={
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  }
>
  <div>Main content goes here</div>
</Dialog>`

export const controllerExampleCode = `import { useState } from "react"
import { Dialog } from "@vbss-ui/dialog"
import { Button } from "@vbss-ui/button"

export export const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog
      trigger={<Button as="div">Controlled Dialog</Button>}
      title="Controlled Dialog"
      open={isOpen}
      onOpenChange={setIsOpen}
      footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
    >
      <div>This dialog's state is controlled externally</div>
    </Dialog>
  )
}`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost",
    description: "Defines the visual style of the Dialog.",
    default: "primary",
  },
  {
    prop: "rounded",
    type: "none | sm | md | lg | full",
    description: "Sets the border radius of the Dialog.",
    default: "md",
  },
  {
    prop: "trigger",
    type: "React.ReactNode",
    description: "The element that triggers the Dialog.",
    default: "<div />",
  },
  {
    prop: "overlayOpacity",
    type: "number",
    description: "Sets the opacity of the overlay (0-100).",
    default: "50",
  },
  {
    prop: "border",
    type: "boolean",
    description: "Adds a border to the Dialog.",
    default: "false",
  },
  {
    prop: "title",
    type: "React.ReactNode",
    description: "The title of the Dialog.",
    default: "-",
  },
  {
    prop: "description",
    type: "React.ReactNode",
    description: "The description text of the Dialog.",
    default: "-",
  },
  {
    prop: "footer",
    type: "React.ReactNode",
    description: "Content to be displayed in the footer.",
    default: "-",
  },
  {
    prop: "disableTextColor",
    type: "boolean",
    description: "Disable variant-based text color.",
    default: "false",
  },
  {
    prop: "hideClose",
    type: "boolean",
    description: "Shows/hides the close button.",
    default: "false",
  },
  {
    prop: "open",
    type: "boolean",
    description: "Controls whether the dialog is open or closed.",
    default: "-",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Callback when the dialog's open state changes.",
    default: "false",
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

export const customizingExampleCode = `<Dialog
  title="Custom Dialog"
  trigger={<Button as="div">Open Dialog</Button>}
  style={{
    backgroundColor: "red",
    color: "white",
  }}
>
  Custom styled dialog
</Dialog>`

export const customizingClassExampleCode = `// CSS
.customDialog {
  .dialogTrigger {
    background-color: red;
    padding: 1rem;
  }
}

.dialogOverlay {}
.dialogContent {
  .dialogInfo {
    .dialogTitle {}
    .dialogDescription {}
  }
  .dialogFooter {}
  .dialogCloseContainer {
    .dialogCloseIcon {}
  }
}

<div className="customDialog">
  <Dialog trigger={<Button>Open Dialog</Button>}>
    Custom styled dialog
  </Dialog>
</div>`

export const realUsageExampleCode = `import { Dialog } from "@vbss-ui/dialog"
import { Button } from "@vbss-ui/button"
import { useState } from "react"

export const App = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    // Handle delete action
    setIsDeleteDialogOpen(false)
  }

  return (
    <Dialog
      trigger={<Button as="div">Delete Account</Button>}
      title="Delete Account"
      description="Are you sure you want to delete your account? This action cannot be undone."
      footer={
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleDelete}
            style={{ backgroundColor: "#dc2626", borderColor: "#dc2626" }}
          >
            Delete
          </Button>
        </div>
      }
      open={isDeleteDialogOpen}
      onOpenChange={setIsDeleteDialogOpen}
    >
      <div style={{ padding: "1rem 0" }}>
        This will permanently delete your account and all associated data.
      </div>
    </Dialog>
  )
}`
