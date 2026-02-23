import { ArrowSquareOut } from "@phosphor-icons/react"
import { DataTable, type DataTableColumn, type SortState } from "@vbss-ui/data-table"
import { Table } from "@vbss-ui/table"
import { useState } from "react"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { InteractiveExampleContainer } from "@/presentation/components/InteractiveExampleContainer"

import * as S from "../../styles"
import {
  customizingClassExampleCode,
  customizingExampleCode,
  emptyStateExampleCode,
  mockUsers,
  paginationExampleCode,
  propsTableHeaders,
  propsTableRows,
  realUsageExampleCode,
  sections,
  sortingExampleCode,
  type MockUser,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const DataTableDocs = () => {
  const [sort, setSort] = useState<SortState>(null)
  const [page, setPage] = useState(1)

  const basicColumns: DataTableColumn<MockUser>[] = [
    {
      id: "name",
      header: "Name",
      accessor: (row: MockUser) => row.name,
    },
    {
      id: "email",
      header: "Email",
      accessor: (row: MockUser) => row.email,
    },
    {
      id: "role",
      header: "Role",
      accessor: (row: MockUser) => row.role,
    },
  ]

  const sortableColumns: DataTableColumn<MockUser>[] = [
    {
      id: "name",
      header: "Name",
      accessor: (row: MockUser) => row.name,
      sortable: true,
      sortAccessor: (row: MockUser) => row.name,
    },
    {
      id: "email",
      header: "Email",
      accessor: (row: MockUser) => row.email,
      sortable: true,
      sortAccessor: (row: MockUser) => row.email,
    },
    {
      id: "role",
      header: "Role",
      accessor: (row: MockUser) => row.role,
      sortable: true,
    },
    {
      id: "joinDate",
      header: "Join Date",
      accessor: (row: MockUser) => row.joinDate.toLocaleDateString(),
      sortable: true,
      sortAccessor: (row: MockUser) => row.joinDate,
    },
  ]

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Data Table</S.Title>
          <S.SubTitle>A customizable and accessible Data Table component with sorting and pagination capabilities.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Data Table</strong> component is a feature-rich table for displaying structured data. It provides
              built-in sorting, optional pagination, and customizable styling. Built with accessibility in mind, it uses proper
              table semantics, headers association, and keyboard navigation for sorting.
            </S.Paragraph>
            <ExampleContainer code={realUsageExampleCode}>
              <div style={{ padding: "1rem", maxWidth: "800px" }}>
                <DataTable
                  columns={sortableColumns}
                  data={mockUsers}
                  sort={sort}
                  onSortChange={setSort}
                  pageSize={3}
                  page={page}
                  onPageChange={setPage}
                  label={<h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: 600 }}>Users</h2>}
                  emptyState={
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                      <p>No users found</p>
                    </div>
                  }
                />
              </div>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              <a
                href="https://www.npmjs.com/package/@vbss-ui/data-table"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                View on npm <ArrowSquareOut size={16} weight="bold" />
              </a>
            </S.Paragraph>
            <S.Paragraph>
              To install only the <strong>Data Table</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code="npm install @vbss-ui/data-table" language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code="yarn add @vbss-ui/data-table" language="sh" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="usage" />
              Usage
            </S.SectionTitle>
            <S.Paragraph>After installation, import the component and use it in your project:</S.Paragraph>
            <CodeSnippet code={usageExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="basic-usage" />
              Basic Usage
            </S.SectionSubTitle>
            <S.Paragraph>
              The <strong>Data Table</strong> requires <code>columns</code> and <code>data</code> props:
            </S.Paragraph>
            <ExampleContainer>
              <div style={{ padding: "1rem", maxWidth: "600px" }}>
                <DataTable columns={basicColumns} data={mockUsers.slice(0, 3)} />
              </div>
            </ExampleContainer>
            <CodeSnippet code={usageExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="sorting" />
              Sorting
            </S.SectionSubTitle>
            <S.Paragraph>
              Enable sorting by setting <code>sortable: true</code> on columns. Use <code>sortAccessor</code> to customize how
              values are compared:
            </S.Paragraph>
            <ExampleContainer>
              <div style={{ padding: "1rem", maxWidth: "800px" }}>
                <DataTable columns={sortableColumns.slice(0, 3)} data={mockUsers} />
              </div>
            </ExampleContainer>
            <CodeSnippet code={sortingExampleCode} language="tsx" />
            <S.Paragraph>
              <strong>Sorting behavior:</strong> Click a sortable column header to sort ascending. Click again to sort descending.
              Click a third time to clear sorting. The sort indicator arrows show the current sort direction.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="pagination" />
              Pagination
            </S.SectionSubTitle>
            <S.Paragraph>
              Enable pagination by providing a <code>pageSize</code> prop. Use <code>page</code> and <code>onPageChange</code> for
              controlled pagination:
            </S.Paragraph>
            <ExampleContainer>
              <div style={{ padding: "1rem", maxWidth: "800px" }}>
                <DataTable columns={basicColumns} data={mockUsers} pageSize={3} page={page} onPageChange={setPage} />
                <div style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
                  Page {page} of {Math.ceil(mockUsers.length / 3)}
                </div>
              </div>
            </ExampleContainer>
            <CodeSnippet code={paginationExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="empty-state" />
              Empty State
            </S.SectionSubTitle>
            <S.Paragraph>
              Display custom content when the table is empty using the <code>emptyState</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <div style={{ padding: "1rem", maxWidth: "600px" }}>
                <DataTable
                  columns={basicColumns}
                  data={[]}
                  emptyState={
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                      <p style={{ color: "#666" }}>No data available</p>
                    </div>
                  }
                />
              </div>
            </ExampleContainer>
            <CodeSnippet code={emptyStateExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="styling" />
              Styling
            </S.SectionSubTitle>
            <S.Paragraph>
              Customize the appearance with <code>variant</code>, <code>fontSize</code>, <code>fontWeight</code>,{" "}
              <code>height</code>, and <code>rounded</code> props:
            </S.Paragraph>
            <InteractiveExampleContainer
              props={["primary", "secondary", "outline", "ghost"]}
              targetProp="variant"
              code={`<DataTable columns={columns} data={data} variant='variant' />`}
            >
              <DataTable columns={basicColumns} data={mockUsers.slice(0, 2)} variant="primary" />
            </InteractiveExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="accessibility" />
              Accessibility
            </S.SectionSubTitle>
            <S.Paragraph>
              The <strong>Data Table</strong> component includes comprehensive accessibility features:
            </S.Paragraph>
            <S.List as="ul">
              <li>
                <strong>Table Semantics:</strong> Uses proper <code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>,{" "}
                <code>&lt;tbody&gt;</code>, <code>&lt;th&gt;</code>, and <code>&lt;td&gt;</code> elements
              </li>
              <li>
                <strong>Headers Association:</strong> Column headers are properly associated with data cells using ARIA attributes
              </li>
              <li>
                <strong>Keyboard Navigation:</strong> Sortable columns can be activated with Enter or Space key
              </li>
              <li>
                <strong>ARIA Labels:</strong> Sortable headers include descriptive ARIA labels indicating current sort state
              </li>
              <li>
                <strong>Screen Reader Support:</strong> Sort indicators and states are announced to screen readers
              </li>
            </S.List>
            <ExampleContainer>
              <div style={{ padding: "1rem", maxWidth: "600px" }}>
                <DataTable
                  columns={sortableColumns.slice(0, 3)}
                  data={mockUsers.slice(0, 2)}
                  label={<h2 style={{ marginBottom: "1rem", fontSize: "1rem", fontWeight: 600 }}>Accessible Table</h2>}
                />
              </div>
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="props" />
              Props
            </S.SectionTitle>
            <S.Paragraph>
              The Data Table component accepts the following props. It uses generics to ensure type safety with your data
              structure.
            </S.Paragraph>
            <S.TableSection>
              <Table
                variant="primary"
                headers={propsTableHeaders}
                rows={propsTableRows.map((row) => ({ ...row, style: { color: "white" } }))}
                fontSize="sm"
              />
            </S.TableSection>
            <S.Paragraph>
              <strong>DataTableColumn&lt;T&gt; interface:</strong>
            </S.Paragraph>
            <S.List as="ul">
              <li>
                <code>id: string</code> - Unique identifier for the column
              </li>
              <li>
                <code>header: React.ReactNode</code> - Header content
              </li>
              <li>
                <code>accessor: (row: T) =&gt; React.ReactNode</code> - Function to extract cell value
              </li>
              <li>
                <code>sortable?: boolean</code> - Enable sorting for this column
              </li>
              <li>
                <code>sortAccessor?: (row: T) =&gt; string | number | Date</code> - Custom function for sorting (defaults to
                accessor result)
              </li>
              <li>
                <code>width?: number | string</code> - Column width
              </li>
              <li>
                <code>align?: &apos;left&apos; | &apos;center&apos; | &apos;right&apos;</code> - Text alignment
              </li>
            </S.List>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="customization" />
              Customization
            </S.SectionTitle>
            <S.Paragraph>
              You can extend the default styles by passing custom styles using <code>className</code> or <code>style</code>.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-style" />
              Using <code>style</code>
            </S.SectionSubTitle>
            <S.Paragraph>You can pass custom styles directly to the component:</S.Paragraph>
            <ExampleContainer code={customizingExampleCode}>
              <DataTable
                style={{
                  backgroundColor: "#f3f4f6",
                  border: "2px solid #e5e7eb",
                }}
                columns={basicColumns}
                data={mockUsers.slice(0, 2)}
              />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using <code>className</code>
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customDataTable">
                <DataTable columns={basicColumns} data={mockUsers.slice(0, 2)} />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Data Table" sections={sections} />
    </>
  )
}
