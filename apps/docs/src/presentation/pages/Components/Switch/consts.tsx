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
        title: "State Management",
        anchor: "state-management",
      },
      {
        title: "Variant",
        anchor: "variants",
      },
      {
        title: "Rounded",
        anchor: "rounded",
      },
      {
        title: "Label",
        anchor: "label",
      },
      {
        title: "With Icons",
        anchor: "icons",
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

export const usageExampleCode = `import { Switch } from "@vbss-ui/switch";

export const App = () => {
  return <Switch />;
}`

export const controlledExampleCode = `const [isEnabled, setIsEnabled] = useState(false);

<Switch 
  checked={isEnabled}
  onCheckedChange={(checked) => setIsEnabled(checked)}
  label="Enable Feature"
/>`

export const withIconsExampleCode = `import { Moon, Sun } from "@phosphor-icons/react";

<Switch iconOn={<Moon />} iconOff={<Sun />} />`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost",
    description: "Defines the visual style of the Switch",
    default: "primary",
  },
  {
    prop: "rounded",
    type: "none | sm | md | lg | full",
    description: "Sets the border radius of the Switch",
    default: "full",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "Sets the font size of the Switch label",
    default: "sm",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "Specifies the font weight of the Switch label",
    default: "normal",
  },
  {
    prop: "inverted",
    type: "boolean",
    description: "Inverts the Switch's direction",
    default: "false",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the Switch interaction",
    default: "false",
  },
  {
    prop: "label",
    type: "string",
    description: "Text label for the Switch",
    default: "-",
  },
  {
    prop: "iconOn",
    type: "React.ReactNode",
    description: "Icon to display when Switch is on",
    default: "-",
  },
  {
    prop: "iconOff",
    type: "React.ReactNode",
    description: "Icon to display when Switch is off",
    default: "-",
  },
  {
    prop: "ref",
    Type: "React.Ref",
    Description: "Allows accessing the underlying DOM element.",
    Default: "-",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes for custom styling",
    default: "-",
  },
  {
    prop: "style",
    type: "React.CSSProperties",
    description: "Additional style for custom styling",
    default: "-",
  },
]

export const customizingExampleCode = `<Switch
  style={{
    backgroundColor: "red"
  }}
/>`

export const customizingClassExampleCode = `//CSS
.customSwitch {
  .switchContainer {
    .switchRoot {
      .switchIconOnContainer {}
      .switchThumb {
        background-color: red;
      }
      .switchIconOffContainer {}
    }
    .switchLabel {
      color: blue
    }
  }
}
  
<div className="customSwitch">
  <Switch label="Custom Style" />
</div>`
