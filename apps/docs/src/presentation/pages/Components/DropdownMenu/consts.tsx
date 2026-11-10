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
      { title: "Menu Label", anchor: "label" },
      { title: "Separator", anchor: "separator" },
      { title: "Position", anchor: "position" },
      { title: "Variant", anchor: "variants" },
      { title: "Rounded", anchor: "rounded" },
      { title: "Size", anchor: "size" },
      { title: "Font Size", anchor: "font-size" },
      { title: "Font Weight", anchor: "font-weight" },
      { title: "Item Options", anchor: "item-options" },
    ],
  },
  { title: "Props", anchor: "props" },
  { title: "Migration", anchor: "migration" },
  {
    title: "Customization",
    anchor: "customization",
    subsections: [
      { title: "Using style", anchor: "custom-style" },
      { title: "Using className", anchor: "custom-classname" },
    ],
  },
]

export const basicExampleCode = `<DropdownMenu
  trigger={<button>Open Menu</button>}
  menus={[
    { item: <Button>Button One</Button> },
    { item: <Button>Button Two</Button> },
    { item: <Button>Button Three</Button> },
  ]}
/>`

export const usageExampleCode = `import { DropdownMenu } from "@vbss-ui/dropdown-menu"
import { Button } from "@vbss-ui/button"

export const App = () => {
  return (
    <DropdownMenu
      trigger={<button>Open Menu</button>}
      menus={[
        { item: <Button variant="ghost">Button One</Button> },
        { item: <Button variant="ghost">Button Two</Button> },
        { item: <Button variant="ghost">Button Three</Button> },
      ]}
    />
  )
}`

export const separatorExampleCode = `<DropdownMenu
  trigger={<button>Open Menu</button>}
  menus={[
    { item: <button>Option 1</button> },
    { item: "separator" },
    { item: <button>Option 2</button> },
    { item: "separator" },
    { item: <button>Option 3</button> }
  ]}
/>`

export const itemOptionsExampleCode = `import { useState } from "react"
import { DropdownMenu } from "@vbss-ui/dropdown-menu"
import { Button } from "@vbss-ui/button"

export const App = () => {
  const [lastAction, setLastAction] = useState("none")

  return (
    <>
      <DropdownMenu
        trigger={<Button>Item actions</Button>}
        menus={[
          { item: "Save", onSelect: () => setLastAction("Saved") },
          { item: "Export", disabled: true },
          {
            item: (
              <a href="https://www.npmjs.com/package/@vbss-ui/dropdown-menu" target="_blank" rel="noopener noreferrer">
                Open on npm
              </a>
            ),
            asChild: true,
          },
        ]}
      />
      <span>Last action: {lastAction}</span>
    </>
  )
}`

export const propsTableHeaders = [{ content: "Props" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost",
    description: "The visual style of the dropdown menu",
    default: "primary",
  },
  {
    prop: "size",
    type: "xs | sm | md | lg | xl",
    description: "The size of the dropdown menu",
    default: "md",
  },
  {
    prop: "rounded",
    type: "none | sm | md | lg | full",
    description: "The border radius of the dropdown menu",
    default: "md",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "The font size of the menu items",
    default: "md",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "The font weight of the menu items",
    default: "normal",
  },
  {
    prop: "side",
    type: "top | right | bottom | left",
    description: "The position of the dropdown menu",
    default: "top",
  },
  {
    prop: "trigger",
    type: "React.ReactNode",
    description:
      "The element that triggers the dropdown menu. A React element becomes the trigger itself and must be focusable (use a button); any other node is wrapped in a button.",
    default: "-",
  },
  {
    prop: "open",
    type: "boolean",
    description: "The controlled open state of the dropdown menu. Use it together with onOpenChange.",
    default: "-",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    description: "The open state of the dropdown menu when it is first rendered, for uncontrolled use.",
    default: "false",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
    default: "-",
  },
  {
    prop: "modal",
    type: "boolean",
    description: "When true, interaction with the rest of the page is blocked while the menu is open.",
    default: "true",
  },
  {
    prop: "menuLabel",
    type: "React.ReactNode",
    description: "Optional label for the menu",
    default: "-",
  },
  {
    prop: "menus",
    type: "{ item: React.ReactNode | 'separator'; onSelect?: (event: Event) => void; disabled?: boolean; asChild?: boolean }[]",
    description:
      "Array of menu items or separators. onSelect runs when the item is selected, disabled blocks the item and asChild renders the item element itself (for example a link) as the menu item.",
    default: "[]",
  },
  {
    prop: "ref",
    type: "React.Ref",
    description: "A ref to the dropdown menu content element (HTMLDivElement)",
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

export const customizingExampleCode = `import { DropdownMenu } from "@vbss-ui/dropdown-menu"

export const MyComponent = () => {
  return (
    <DropdownMenu
      trigger={<button>Open Menu</button>}
      style={{
        backgroundColor: "red",
        color: "white",
      }}
      menus={[
        { item: "Option 1" },
        { item: "Option 2" }
      ]}
    />
  )
}`

export const customizingClassExampleCode = `// CSS
.customDropdownMenu {
  .dropdownMenuTrigger {
    background-color: red;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }
}

.dropdownMenu {
  background-color: red !important;

  .dropdownMenuLabel {
    background-color: blue;
  }
  .dropdownMenuSeparator {}
  .dropdownMenuItem {
    background-color: purple;
  }
}

export const App = () => {
  return (
    <DropdownMenu
      className="dropdownMenu"
      menuLabel="Actions"
      trigger={<button>Open Menu</button>}
      menus={[
        { item: "Option 1" },
        { item: "Option 2" }
      ]}
    />
  )
}`

export const realUsageExampleCode = `import { DropdownMenu } from "@vbss-ui/dropdown-menu"
import { Button } from "@vbss-ui/button"
import { PencilSimple, Trash } from "@phosphor-icons/react"

export const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: "500", margin: 0 }}>User Actions:</h3>
      <DropdownMenu
        trigger={<Button>More Actions</Button>}
        style={{ padding: "0.75rem" }}
        menuLabel="User Options"
        menus={[
          {
            item: (
              <Button onClick={() => console.log("Edit action")} style={{ width: "100%" }}>
                <PencilSimple />
                Edit Profile
              </Button>
            ),
          },
          { item: "separator" },
          {
            item: (
              <Button onClick={() => console.log("Delete action")} style={{ width: "100%" }}>
                <Trash />
                Delete Account
              </Button>
            ),
          },
        ]}
      />
    </div>
  )
}`

export const dropdownMenuWhatsNew: { version: string; date: string; changes: string[] }[] = [
  {
    version: "2.0.0",
    date: "2026-05-16",
    changes: [
      "Improved border behavior on hover and click for better visual feedback",
      "Added variant support for dropdown menu items via the exported dropdownMenuItemStyles helper",
    ],
  },
]
