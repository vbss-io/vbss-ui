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
      { title: "Custom Icons", anchor: "icons" },
      { title: "Gap", anchor: "gap" },
    ],
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

export const basicExampleCode = `import { HistoryNav } from "@vbss-ui/history-nav"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

export const App = () => {
  return (
    <HistoryNav
      leftIcon={<ArrowLeft />}
      rightIcon={<ArrowRight />}
      leftOnClick={() => window.history.back()}
      rightOnClick={() => window.history.forward()}
    />
  )
}`

export const iconExampleCode = `import { HistoryNav } from "@vbss-ui/history-nav"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

export const App = () => {
  return (
    <HistoryNav
      leftIcon={<ArrowLeft />}
      rightIcon={<ArrowRight />}
      leftOnClick={() => window.history.back()}
      rightOnClick={() => window.history.forward()}
    />
  )
}`

export const gapExampleCode = `<HistoryNav
  gap='gap'
  leftIcon={<ChevronLeftIcon />}
  rightIcon={<ChevronRightIcon />}
  leftOnClick={() => window.history.back()}
  rightOnClick={() => window.history.forward()}
/>`

export const propsTableHeaders = [{ content: "Props" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "gap",
    type: "xs | sm | md | lg | xl",
    description: "Sets the gap between buttons",
    default: "md",
  },
  {
    prop: "buttonsProps",
    type: <a href="button">ButtonProps</a>,
    description: "Props passed to the underlying buttons",
    default: "-",
  },
  {
    prop: "leftOnClick",
    type: "() => void",
    description: "Function called when the left button is clicked",
    default: "-",
  },
  {
    prop: "rightOnClick",
    type: "() => void",
    description: "Function called when the right button is clicked",
    default: "-",
  },
  {
    prop: "leftIcon",
    type: "React.ReactNode",
    description: "Icon displayed in the left button",
    default: "-",
  },
  {
    prop: "rightIcon",
    type: "React.ReactNode",
    description: "Icon displayed in the right button",
    default: "-",
  },
  {
    prop: "ref",
    type: "React.Ref",
    description: "Allows accessing the underlying DOM element",
    default: "-",
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

export const customizingExampleCode = `<HistoryNav
  leftIcon={<ChevronLeftIcon />}
  rightIcon={<ChevronRightIcon />}
  style={{
    padding: "1rem",
    backgroundColor: "red",
    color: "white",
  }}
  leftOnClick={() => window.history.back()}
  rightOnClick={() => window.history.forward()}
/>`

export const customizingClassExampleCode = `// CSS
.customHistoryNav {
  .historyNavContainer {
    .button {
      /* ...Button classNames */
      background-color: red;
    }
  }
}

export const App = () => {
  return (
    <div className="customHistoryNav">
      <HistoryNav
        leftIcon={<ChevronLeftIcon />}
        rightIcon={<ChevronRightIcon />}
        leftOnClick={() => window.history.back()}
        rightOnClick={() => window.history.forward()}
      />
    </div>
  )
}`
