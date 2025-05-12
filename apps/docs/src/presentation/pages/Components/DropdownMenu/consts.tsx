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
    description: "The element that triggers the dropdown menu",
    default: "-",
  },
  {
    prop: "menuLabel",
    type: "React.ReactNode",
    description: "Optional label for the menu",
    default: "-",
  },
  {
    prop: "menus",
    type: "{ item: React.ReactNode | 'separator' }[]",
    description: "Array of menu items or separators",
    default: "[]",
  },
  {
    prop: "ref",
    type: "React.Ref",
    description: "A ref to the dropdown menu element",
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
        trigger={<Button as="div">More Actions</Button>}
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
