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
      {
        title: "Variant",
        anchor: "variants",
      },
      {
        title: "Size",
        anchor: "size",
      },
      {
        title: "Rounded",
        anchor: "rounded",
      },
      {
        title: "Font Size",
        anchor: "font-size",
      },
      {
        title: "Font Weight",
        anchor: "font-weight",
      },
    ],
  },
  {
    title: "Props",
    anchor: "props",
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

export const usageExampleCode = `import { Chip } from "@vbss-ui/chip"

export export const App = () => {
  return <Chip>Example Chip</Chip>
}`

export const propsTableHeaders = [{ content: "Props" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    Type: "primary | secondary | outline",
    Description: "Defines the visual style of the chip.",
    Default: "primary",
  },
  {
    prop: "size",
    Type: "sm | md | lg",
    Description: "Specifies the size of the chip.",
    Default: "md",
  },
  {
    prop: "rounded",
    Type: "none | xs | sm | md | lg | full",
    Description: "Determines the border radius of the chip.",
    Default: "md",
  },
  {
    prop: "fontSize",
    Type: "xs | sm | md | lg | xl",
    Description: "Sets the font size of the chip text.",
    Default: "md",
  },
  {
    prop: "fontWeight",
    Type: "thin | light | normal | medium | bold | extrabold",
    Description: "Specifies the font weight of the chip text.",
    Default: "normal",
  },
  {
    prop: "as",
    Type: "React.ElementType",
    Description: "Defines the HTML element or component to render.",
    Default: "div",
  },
  {
    prop: "ref",
    Type: "React.Ref",
    Description: "Allows accessing the underlying DOM element.",
    Default: "-",
  },
  {
    prop: "children",
    Type: "string | number | React.ReactNode",
    Description: "Content to be displayed inside the chip.",
    Default: "-",
  },
  {
    prop: "className",
    Type: "string",
    Description: "Additional CSS classes for custom styling.",
    Default: "-",
  },
  {
    prop: "style",
    Type: "React.CSSProperties",
    Description: "Additional style for custom styling.",
    Default: "-",
  },
]

export const customizingExampleCode = `<Chip
  style={{
    backgroundColor: "red",
    border: "1px solid red" 
  }}
>
  Example
</Chip>`

export const customizingClassExampleCode = `// CSS
.custom-chip {
  .chip {
    background-color: purple;
  }
}

<div className='custom-chip'>
  <Chip>Example</Chip>
</div>`
