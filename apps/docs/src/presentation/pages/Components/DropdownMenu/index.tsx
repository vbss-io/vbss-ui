import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { PencilSimple, Trash } from "@phosphor-icons/react"
import { Button } from "@vbss-ui/button"
import { DropdownMenu } from "@vbss-ui/dropdown-menu"
import { Table } from "@vbss-ui/table"
import * as S from "../../styles"
import {
  customizingClassExampleCode,
  customizingExampleCode,
  propsTableHeaders,
  propsTableRows,
  realUsageExampleCode,
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
            <ExampleContainer code={realUsageExampleCode}>
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
                trigger={<Button as="div">Open Menu</Button>}
                menuLabel="Actions"
                menus={[{ item: "Item 1" }, { item: "Item 2" }, { item: "Item 3" }]}
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
                trigger={<Button as="div">Open Menu</Button>}
                menus={[{ item: "Item 1" }, { item: "separator" }, { item: "Item 2" }, { item: "separator" }, { item: "Item 3" }]}
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
                <DropdownMenu
                  trigger={<Button as="div">Top</Button>}
                  side="top"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Right</Button>}
                  side="right"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Bottom</Button>}
                  side="bottom"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Left</Button>}
                  side="left"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
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
                  trigger={<Button as="div">Primary</Button>}
                  variant="primary"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Secondary</Button>}
                  variant="secondary"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Outline</Button>}
                  variant="outline"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Ghost</Button>}
                  variant="ghost"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
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
                  trigger={<Button as="div">None</Button>}
                  rounded="none"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Small</Button>}
                  rounded="sm"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Medium</Button>}
                  rounded="md"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Large</Button>}
                  rounded="lg"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Full</Button>}
                  rounded="full"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
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
                  trigger={<Button as="div">Extra Small</Button>}
                  size="xs"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Small</Button>}
                  size="sm"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Medium</Button>}
                  size="md"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Large</Button>}
                  size="lg"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Extra Large</Button>}
                  size="xl"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
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
                  trigger={<Button as="div">Extra Small</Button>}
                  fontSize="xs"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Small</Button>}
                  fontSize="sm"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Medium</Button>}
                  fontSize="md"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Large</Button>}
                  fontSize="lg"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Extra Large</Button>}
                  fontSize="xl"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
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
                  trigger={<Button as="div">Thin</Button>}
                  fontWeight="thin"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Light</Button>}
                  fontWeight="light"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Normal</Button>}
                  fontWeight="normal"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Medium</Button>}
                  fontWeight="medium"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Bold</Button>}
                  fontWeight="bold"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
                />
                <DropdownMenu
                  trigger={<Button as="div">Extra Bold</Button>}
                  fontWeight="extrabold"
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
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
                trigger={<Button as="div">Open Menu</Button>}
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
                menus={[{ item: "Item 1" }, { item: "Item 2" }]}
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
                  trigger={<Button as="div">Open Menu</Button>}
                  menus={[{ item: "Item 1" }, { item: "Item 2" }]}
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
