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
        title: "Gap",
        anchor: "gap",
      },
      {
        title: "Flex Direction",
        anchor: "flex-direction",
      },
      {
        title: "Chip Props",
        anchor: "chip-props",
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

export const usageExampleCode = `import { Chips } from "@vbss-ui/chips"

export export const App = () => {
  return <Chips chips={["Design", "Development", "Marketing"]} />
}`

export const chipPropsExampleCode = `<Chips chipsProps={{
  variant: "outline"
  // ... other props
}}
chips={["Chip 1", "Chip 2"]} />`

export const propsTableHeaders = [{ content: "Props" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "chips",
    Type: "string[] | number[] | React.ReactNode[]",
    Description: "List of chip contents to render.",
    Default: "[]",
  },
  {
    prop: "gap",
    Type: "xs | sm | md | lg | xl",
    Description: "Controls spacing between the chips.",
    Default: "md",
  },
  {
    prop: "flexDirection",
    Type: "row | col",
    Description: "	Defines the layout direction of the chips (horizontal or vertical).",
    Default: "row",
  },
  {
    prop: "chipsProps",
    Type: <a href="chip">ChipProps</a>,
    Description: "Shared props applied to each individual Chip.",
    Default: "-",
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

export const customizingExampleCode = `<Chips
  chips={["Example", "Example"]}
  style={{
    backgroundColor: "red",
    padding: "1rem",
    borderRadius: "1rem"
    }}
/>`

export const customizingClassExampleCode = `// CSS
.custom-chips {
  .chips {
    background-color: blue;
    padding: 10px;
    border-radius: 5px;
  }

  .chip {
    background-color: red;
  }
}

<div className='custom-chip'>
  <Chips chips={["Example", "Example"]} />
</div>`
