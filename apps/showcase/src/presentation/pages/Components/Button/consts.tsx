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
      {
        title: "Inverted",
        anchor: "inverted",
      },
      {
        title: "Disabled",
        anchor: "disabled",
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

export const usageExampleCode = `import { Button } from "@vbss-ui/button"

export export const App = () => {
  return <Button>Example Button</Button>
}`

export const iconSizeExampleCode = `<Button size="icon-md">
  <Icon/>
</Button>`

export const invertedExampleCode = `<Button inverted>
  Example Button
  <Icon/>
</Button>`

export const propsTableHeaders = [{ content: "Props" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    Type: "primary | secondary | outline | outlineSolid | ghost",
    Description: "Defines the visual style of the Button.",
    Default: "primary",
  },
  {
    prop: "size",
    Type: "xs | sm | md | lg | icon-xs | icon-sm | icon-md | icon-lg",
    Description: "Defines the size or icon-specific size of the Button.",
    Default: "md",
  },
  {
    prop: "rounded",
    Type: "none | xs | sm | md | lg | full",
    Description: "Sets the border radius of the Button.",
    Default: "md",
  },
  {
    prop: "fontSize",
    Type: "xs | sm | md | lg | xl",
    Description: "Sets the font size of the Button text.",
    Default: "md",
  },
  {
    prop: "fontWeight",
    Type: "thin | light | normal | medium | bold | extrabold",
    Description: "Specifies the font weight of the Button text.",
    Default: "normal",
  },
  {
    prop: "inverted",
    Type: "boolean",
    Description: "Inverts the Button's direction.",
    Default: "false",
  },
  {
    prop: "disabled",
    Type: "boolean",
    Description: "Disables the Button interaction.",
    Default: "false",
  },
  {
    prop: "as",
    Type: "React.ElementType",
    Description: "Defines the HTML element or component to render.",
    Default: "button",
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
    Description: "Content to be displayed inside the button.",
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

export const customizingExampleCode = `<Button
  style={{
    backgroundColor: "red",
    border: "1px solid red"
  }}
>
  Example
</Button>`

export const customizingClassExampleCode = `// CSS
.custom-button {
  .button {
    background-color: purple;
    border: 1px solid purple
  }
}

<div className='custom-button'>
  <Button>Example</Button>
</div>`
