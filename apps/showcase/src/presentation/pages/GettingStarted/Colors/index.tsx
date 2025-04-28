import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"

import * as S from "../../styles"
import { sections } from "./sections"
import * as P from "./styles"

export const Colors = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Colors</S.Title>
          <S.SubTitle>Customize Your Component Colors</S.SubTitle>
          <section>
            <S.Paragraph>
              <strong>vbss-ui</strong> allows you to easily customize the color scheme of the components to match your brand or
              design system. By default, the library provides a clean and modern palette, but you can override these values to
              create a unique look.
            </S.Paragraph>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="default-color-palette" />
              Default Color Palette
            </S.SectionTitle>
            <S.Paragraph>
              Out of the box, <strong>vbss-ui</strong> comes with the following color scheme:
            </S.Paragraph>
            <CodeSnippet code={defaultColorsCode} language="css" />
            <S.List>
              <li>
                <P.ColorContainer>
                  Primary <P.Color color="hsl(248 39% 39%)" />
                </P.ColorContainer>
              </li>
              <li>
                <P.ColorContainer>
                  Secondary <P.Color color="hsl(248 53% 58%)" />
                </P.ColorContainer>
              </li>
              <li>
                <P.ColorContainer>
                  Highlight <P.Color color="hsl(271 76% 53%)" />
                </P.ColorContainer>
              </li>
              <li>
                <P.ColorContainer>
                  Text <P.Color color="hsl(0 0% 0%)" />
                </P.ColorContainer>
              </li>
              <li>
                <P.ColorContainer>
                  Background <P.Color color="hsl(0 0% 100%)" />
                </P.ColorContainer>
              </li>
            </S.List>
          </section>
          <S.SectionDivider />
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="customizing-colors" />
              Customizing Colors
            </S.SectionTitle>
            <S.Paragraph>
              To override these defaults, create a CSS file (e.g. <code>custom-colors.css</code>) and define your custom colors
              using <strong>HSL format</strong>:
            </S.Paragraph>
            <CodeSnippet code={customColorsCode} language="css" />
            <S.Paragraph>Then, import this file into your project:</S.Paragraph>
            <CodeSnippet code={customColorsImportCode} language="tsx" />
            <S.Paragraph>This will override the default colors with your custom values.</S.Paragraph>
          </section>
          <S.SectionDivider />
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="how-it-works" />
              How It Works
            </S.SectionTitle>
            <S.Paragraph>
              To override these defaults, create a CSS file (e.g. <code>custom-colors.css</code>) and define your custom colors
              using <strong>HSL format</strong>:
            </S.Paragraph>
            <S.List>
              <li>These colors are automatically applied to all vbss-ui components.</li>
              <li>You only need to define the variables you want to change.</li>
              <li>
                The <strong>HSL format</strong> makes it easy to adjust hue, saturation, and lightness for fine-tuned color
                control.
              </li>
            </S.List>
            <S.Paragraph>Now your vbss-ui components will seamlessly match your brand&apos;s visual identity!</S.Paragraph>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Colors" sections={sections} />
    </>
  )
}

const defaultColorsCode = `
:root {
  --primary: 248 39% 39%;
  --secondary: 248 53% 58%;
  --highlight: 271 76% 53%;
  --text: 0 0% 0%;
  --background: 0 0% 100%;
}
`

const customColorsCode = `
:root {
  --primary: 200 100% 50%;     /* Bright blue primary */
  --secondary: 340 82% 52%;    /* Pink secondary */
  --highlight: 45 100% 51%;    /* Yellow highlight */
  --text: 0 0% 100%;           /* Light text */
  --background: 220 15% 20%;   /* Dark background */
}
`

const customColorsImportCode = "import './custom-colors.css'"
