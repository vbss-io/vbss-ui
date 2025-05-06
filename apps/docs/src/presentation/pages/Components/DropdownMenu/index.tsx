import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { Button } from "@vbss-ui/button"
import { DropdownMenu } from "@vbss-ui/dropdown-menu"
import { Table } from "@vbss-ui/table"
import * as S from "../../styles"
import {
  basicExampleCode,
  customizingClassExampleCode,
  customizingExampleCode,
  propsTableHeaders,
  propsTableRows,
  sections,
  separatorExampleCode,
  usageExampleCode,
} from "./consts"
import "./style.css"

export const DropdownMenuDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Dropdown Menu</S.Title>
          <S.SubTitle>A customizable and accessible Dropdown Menu component.</S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>Dropdown Menu</strong> component is a floating menu that appears when clicking on a trigger element. It
              provides a list of options or actions that users can select from. Built with accessibility in mind, it offers
              various styling options, positioning, and customization features.
            </S.Paragraph>
            <ExampleContainer code={basicExampleCode}>
              <DropdownMenu
                trigger={<button>Open Menu</button>}
                menus={[
                  { item: <Button>Button One</Button> },
                  { item: <Button>Button Two</Button> },
                  { item: <Button>Button Three</Button> },
                ]}
              />
            </ExampleContainer>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              To install only the <strong>Dropdown Menu</strong> component, run one of the following commands:
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={"npm install @vbss-ui/dropdown-menu"} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={"yarn add @vbss-ui/dropdown-menu"} language="sh" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="usage" />
              Usage
            </S.SectionTitle>
            <S.Paragraph>After installation, import the component and use it in your project:</S.Paragraph>
            <CodeSnippet code={usageExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="label" />
              Menu Label
            </S.SectionSubTitle>
            <S.Paragraph>
              Add a label to your menu using the <code>menuLabel</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <DropdownMenu
                trigger={<button>Open Menu</button>}
                menuLabel="Actions"
                menus={[{ item: <button>Edit</button> }, { item: <button>Delete</button> }, { item: <button>Share</button> }]}
              />
            </ExampleContainer>
            <CodeSnippet code='<DropdownMenu menuLabel="Actions" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="separator" />
              Separator
            </S.SectionSubTitle>
            <S.Paragraph>
              Add separators between menu items using the <code>separator</code> value:
            </S.Paragraph>
            <ExampleContainer>
              <DropdownMenu
                trigger={<button>Open Menu</button>}
                menus={[
                  { item: <button>Option 1</button> },
                  { item: "separator" },
                  { item: <button>Option 2</button> },
                  { item: "separator" },
                  { item: <button>Option 3</button> },
                ]}
              />
            </ExampleContainer>
            <CodeSnippet code={separatorExampleCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="position" />
              Position
            </S.SectionSubTitle>
            <S.Paragraph>
              Control the position of the <strong>Dropdown Menu</strong> using the <code>side</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <DropdownMenu trigger={<button>Top</button>} side="top" menus={[{ item: "Option 1" }, { item: "Option 2" }]} />
                <DropdownMenu
                  trigger={<button>Right</button>}
                  side="right"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Bottom</button>}
                  side="bottom"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu trigger={<button>Left</button>} side="left" menus={[{ item: "Option 1" }, { item: "Option 2" }]} />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<DropdownMenu side="top" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="variants" />
              Variant
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the visual style of the <strong>Dropdown Menu</strong> using the <code>variant</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <DropdownMenu
                  trigger={<button>Primary</button>}
                  variant="primary"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Secondary</button>}
                  variant="secondary"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Outline</button>}
                  variant="outline"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Ghost</button>}
                  variant="ghost"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<DropdownMenu variant="primary" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="rounded" />
              Rounded
            </S.SectionSubTitle>
            <S.Paragraph>
              Define the border radius using the <code>rounded</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <DropdownMenu
                  trigger={<button>None</button>}
                  rounded="none"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Small</button>}
                  rounded="sm"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Medium</button>}
                  rounded="md"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Large</button>}
                  rounded="lg"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Full</button>}
                  rounded="full"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<DropdownMenu rounded="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="size" />
              Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Adjust the size of the <strong>Dropdown Menu</strong> using the <code>size</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <DropdownMenu
                  trigger={<button>Extra Small</button>}
                  size="xs"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu trigger={<button>Small</button>} size="sm" menus={[{ item: "Option 1" }, { item: "Option 2" }]} />
                <DropdownMenu trigger={<button>Medium</button>} size="md" menus={[{ item: "Option 1" }, { item: "Option 2" }]} />
                <DropdownMenu trigger={<button>Large</button>} size="lg" menus={[{ item: "Option 1" }, { item: "Option 2" }]} />
                <DropdownMenu
                  trigger={<button>Extra Large</button>}
                  size="xl"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<DropdownMenu size="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-size" />
              Font Size
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font size of the menu items using the <code>fontSize</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <DropdownMenu
                  trigger={<button>Extra Small</button>}
                  fontSize="xs"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Small</button>}
                  fontSize="sm"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Medium</button>}
                  fontSize="md"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Large</button>}
                  fontSize="lg"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Extra Large</button>}
                  fontSize="xl"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<DropdownMenu fontSize="md" />' language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="font-weight" />
              Font Weight
            </S.SectionSubTitle>
            <S.Paragraph>
              Change the font weight of the menu items using the <code>fontWeight</code> prop:
            </S.Paragraph>
            <ExampleContainer>
              <S.ColumnContainer>
                <DropdownMenu
                  trigger={<button>Thin</button>}
                  fontWeight="thin"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Light</button>}
                  fontWeight="light"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Normal</button>}
                  fontWeight="normal"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Medium</button>}
                  fontWeight="medium"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Bold</button>}
                  fontWeight="bold"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
                <DropdownMenu
                  trigger={<button>Extra Bold</button>}
                  fontWeight="extrabold"
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
              </S.ColumnContainer>
            </ExampleContainer>
            <CodeSnippet code='<DropdownMenu fontWeight="normal" />' language="tsx" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="props" />
              Props
            </S.SectionTitle>
            <S.TableSection>
              <Table
                variant="primary"
                headers={propsTableHeaders}
                rows={propsTableRows.map((row: { prop: string; type: string; description: string; default: string }) => ({
                  ...row,
                  style: { color: "white" },
                }))}
                fontSize="sm"
              />
            </S.TableSection>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="customization" />
              Customization
            </S.SectionTitle>
            <S.Paragraph>
              You can extend the default styles by passing custom <code>styles</code> names using <code>className</code> or{" "}
              <code>style</code>.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-style" />
              Using style
            </S.SectionSubTitle>
            <S.Paragraph>You can pass custom styles directly to the component:</S.Paragraph>
            <ExampleContainer code={customizingExampleCode}>
              <DropdownMenu
                trigger={<button>Open Menu</button>}
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
                menus={[{ item: "Option 1" }, { item: "Option 2" }]}
              />
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-classname" />
              Using className
            </S.SectionSubTitle>
            <S.Paragraph>You can use the default component classNames:</S.Paragraph>
            <ExampleContainer code={customizingClassExampleCode}>
              <div className="customDropdownMenu">
                <DropdownMenu
                  className="dropdownMenu"
                  menuLabel="Actions"
                  trigger={<button>Open Menu</button>}
                  menus={[{ item: "Option 1" }, { item: "Option 2" }]}
                />
              </div>
            </ExampleContainer>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Dropdown Menu" sections={sections} />
    </>
  )
}
