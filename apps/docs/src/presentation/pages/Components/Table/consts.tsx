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
        title: "Rounded",
        anchor: "rounded",
      },
      {
        title: "Outline",
        anchor: "outline",
      },
      {
        title: "Height",
        anchor: "height",
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
        title: "Footer",
        anchor: "footer",
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
      {
        title: "Styled Headers",
        anchor: "styled-headers",
      },
      {
        title: "Styled Rows",
        anchor: "styled-rows",
      },
      {
        title: "Styled Footer",
        anchor: "styled-footer",
      },
    ],
  },
]

export const basicHeaders = [{ content: "Name" }, { content: "Email" }, { content: "Role" }]

export const basicRows = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
  },
]

export const footer = {
  content: ["", "", `Total: ${basicRows.length}`],
}

export const basicExampleCode = `const headers = [
  { content: "Name" },
  { content: "Email" },
  { content: "Role" }
];

const rows = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Developer"
  }
];

<Table headers={headers} rows={rows} />`

export const usageExampleCode = `import { Table } from "@vbss-ui/table";

export const App = () => {
  const headers = [
    { content: "Name" },
    { content: "Email" },
    { content: "Role" }
  ];

  const rows = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Developer"
    }
  ];

  return <Table headers={headers} rows={rows} />;
}`

export const footerExampleCode = `const footer = {
  content: ["", "", \`Total: \${rows.length}\`],
};

<Table headers={headers} rows={rows} footer={footer} />`

export const propsTableHeaders = [{ content: "Prop" }, { content: "Type" }, { content: "Description" }, { content: "Default" }]

export const propsTableRows = [
  {
    prop: "variant",
    type: "primary | secondary | outline | ghost",
    description: "Defines the visual style of the Table",
    default: "primary",
  },
  {
    prop: "fontSize",
    type: "xs | sm | md | lg | xl",
    description: "Sets the font size of the Table content",
    default: "md",
  },
  {
    prop: "fontWeight",
    type: "thin | light | normal | medium | bold | extrabold",
    description: "Specifies the font weight of the Table content",
    default: "normal",
  },
  {
    prop: "height",
    type: "xs | sm | md | lg | xl",
    description: "Sets the height of table rows",
    default: "md",
  },
  {
    prop: "rounded",
    type: "none | xs | sm | md | lg | xl",
    description: "Sets the border radius of the Table",
    default: "md",
  },
  {
    prop: "outline",
    type: "boolean",
    description: "Adds a border around the Table",
    default: "true",
  },
  {
    prop: "headers",
    type: "Array<{ content: React.ReactNode, className?: string, style?: CSSProperties }>",
    description: "Table headers configuration",
    default: "-",
  },
  {
    prop: "rows",
    type: "Array<{ [key: string]: React.ReactNode | CSSProperties }>",
    description: "Table rows data",
    default: "-",
  },
  {
    prop: "footer",
    type: "{ content: Array<React.ReactNode>, className?: string, style?: CSSProperties }",
    description: "Table footer configuration",
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

export const customizingExampleCode = `<Table
  style={{
    backgroundColor: "green",
    color: "white"
  }}
  headers={basicHeaders}
  rows={basicRows}
/>`

export const customizingClassExampleCode = `//CSS
.customTable {
  .tableContainer {
    .table {
      .thead {
        .htr {
          .hth {
            background-color: blue;
            color: red
          }
        }
      }
      .tbody {
        .btr {
          .btd {
            color: green
          }
        }
      }
      .tfoot {
        .ftd {
          color: purple
        }
      }
    }
  }
}

<div className="customTable">
  <Table headers={basicHeaders} rows={basicRows} footer={footer} />
</div>`

export const styledHeaders = [
  { content: <em>Name</em>, style: { color: "white" } },
  { content: "Email", style: { color: "white" } },
  { content: "Role", style: { color: "white" } },
]

export const styledHeadersExampleCode = `const headers = [
  { content: <em>Name</em>, style: { color: "white" } },
  { content: "Email", style: { color: "white" } },
  { content: "Role", style: { color: "white" } }
];

<Table variant="primary" headers={headers} rows={rows} />`

export const styledRows = basicRows.map((row) => ({
  ...row,
  style: { color: "white", backgroundColor: "purple" },
}))

export const styledRowsExampleCode = `const styledRows = basicRows.map((row) => ({
  ...row,
  style: { color: "white", backgroundColor: "purple" },
}));

<Table variant="primary" headers={basicHeaders} rows={styledRows} />`

export const styledFooter = {
  content: ["", "", `Total: ${basicRows.length}`],
  style: { color: "white", backgroundColor: "rgba(0, 0, 0, 0.2)" },
}

export const styledFooterExampleCode = `const styledRows = {
  content: ["", "", \`Total: ${basicRows.length}\`],
  style: { color: "white", backgroundColor: "rgba(0, 0, 0, 0.2)" },
}

<Table headers={basicHeaders} rows={basicRows} footer={styledFooter} />`

export const realUsageExampleCode = `import { Table } from "@vbss-ui/table"

export const App = () => {
  const taskListHeaders = [
    { content: "Task", style: { width: "40%" } },
    { content: "Status", style: { width: "20%" } },
    { content: "Priority", style: { width: "20%" } },
    { content: "Due Date", style: { width: "20%" } }
  ]

  const taskListRows = [
    {
      task: "Implement user authentication",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-03-15",
      style: { fontWeight: "500" }
    },
    {
      task: "Design dashboard layout",
      status: "Completed",
      priority: "Medium",
      dueDate: "2024-03-10",
      style: { fontWeight: "500" }
    },
    {
      task: "Write API documentation",
      status: "Pending",
      priority: "Low",
      dueDate: "2024-03-20",
      style: { fontWeight: "500" }
    }
  ]

  const taskListFooter = {
    content: [
      "Total Tasks: 3",
      "In Progress: 1",
      "Completed: 1",
      "Pending: 1"
    ],
    style: {
      backgroundColor: "#f1f5f9",
      fontWeight: "500",
      color: "#475569"
    }
  }

  return (
    <Table
      headers={taskListHeaders}
      rows={taskListRows}
      footer={taskListFooter}
      fontSize="sm"
      height="md"
    />
  )
}`
