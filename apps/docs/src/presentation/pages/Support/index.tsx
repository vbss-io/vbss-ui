import { Code, Coffee, Heart, Star, Users } from "@phosphor-icons/react"
import { Button } from "@vbss-ui/button"

import { ContentSidebar } from "@/presentation/components/ContentSidebar"

import * as S from "../styles"
import { sections } from "./sections"
import * as SupportS from "./styles"

export const SupportDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>Support vbss-ui</S.Title>
          <S.SubTitle>Help us keep vbss-ui free and open source</S.SubTitle>
          <section>
            <S.Paragraph>
              <strong>vbss-ui</strong> is a free and open-source component library built with love and dedication. Your support
              helps us maintain, improve, and expand this project for the entire developer community.
              <strong>Your contributions keep us motivated</strong> to continue developing and improving this library.
            </S.Paragraph>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="why-support" />
              Why Support vbss-ui?
            </S.SectionTitle>
            <SupportS.FeatureGrid>
              <SupportS.FeatureItem>
                <SupportS.FeatureHeader>
                  <Heart weight="fill" style={{ color: "hsl(248 39% 39%)" }} />
                  <SupportS.FeatureTitle>Free Forever</SupportS.FeatureTitle>
                </SupportS.FeatureHeader>
                <SupportS.FeatureDescription>
                  Keep vbss-ui completely free and accessible to all developers, regardless of their budget.
                </SupportS.FeatureDescription>
              </SupportS.FeatureItem>
              <SupportS.FeatureItem>
                <SupportS.FeatureHeader>
                  <Code weight="fill" style={{ color: "hsl(248 39% 39%)" }} />
                  <SupportS.FeatureTitle>Active Development</SupportS.FeatureTitle>
                </SupportS.FeatureHeader>
                <SupportS.FeatureDescription>
                  Continuous improvements, new components, and bug fixes to keep the library up-to-date.
                </SupportS.FeatureDescription>
              </SupportS.FeatureItem>
              <SupportS.FeatureItem>
                <SupportS.FeatureHeader>
                  <Users weight="fill" style={{ color: "hsl(248 39% 39%)" }} />
                  <SupportS.FeatureTitle>Community Support</SupportS.FeatureTitle>
                </SupportS.FeatureHeader>
                <SupportS.FeatureDescription>
                  Better documentation, examples, and community resources for all users.
                </SupportS.FeatureDescription>
              </SupportS.FeatureItem>
              <SupportS.FeatureItem>
                <SupportS.FeatureHeader>
                  <Star weight="fill" style={{ color: "hsl(248 39% 39%)" }} />
                  <SupportS.FeatureTitle>Quality Assurance</SupportS.FeatureTitle>
                </SupportS.FeatureHeader>
                <SupportS.FeatureDescription>
                  Comprehensive testing, accessibility improvements, and performance optimizations.
                </SupportS.FeatureDescription>
              </SupportS.FeatureItem>
            </SupportS.FeatureGrid>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="how-to-support" />
              How to Support
            </S.SectionTitle>
            <S.Paragraph>There are several ways you can support the vbss-ui project:</S.Paragraph>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                marginTop: "1.5rem",
              }}
            >
              <SupportS.SupportCard>
                <Coffee weight="fill" style={{ color: "hsl(248 39% 39%)", fontSize: "2rem" }} />
                <SupportS.SupportCardContent>
                  <SupportS.SupportCardTitle>Buy us a Coffee</SupportS.SupportCardTitle>
                  <SupportS.SupportCardDescription>
                    A small contribution goes a long way in helping us maintain and improve vbss-ui.
                  </SupportS.SupportCardDescription>
                </SupportS.SupportCardContent>
                <Button
                  as="a"
                  href="https://www.buymeacoffee.com/vbss.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                >
                  Buy me a coffee
                </Button>
              </SupportS.SupportCard>
              <SupportS.SupportCard>
                <Star weight="fill" style={{ color: "hsl(248 39% 39%)", fontSize: "2rem" }} />
                <SupportS.SupportCardContent>
                  <SupportS.SupportCardTitle>Star on GitHub</SupportS.SupportCardTitle>
                  <SupportS.SupportCardDescription>
                    Give us a star on GitHub to help others discover vbss-ui.
                  </SupportS.SupportCardDescription>
                </SupportS.SupportCardContent>
                <Button
                  as="a"
                  href="https://github.com/vbss-io/vbss-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                >
                  Star Project
                </Button>
              </SupportS.SupportCard>
              <SupportS.SupportCard>
                <Users weight="fill" style={{ color: "hsl(248 39% 39%)", fontSize: "2rem" }} />
                <SupportS.SupportCardContent>
                  <SupportS.SupportCardTitle>Share with Community</SupportS.SupportCardTitle>
                  <SupportS.SupportCardDescription>
                    Share vbss-ui with your network and help grow our community.
                  </SupportS.SupportCardDescription>
                </SupportS.SupportCardContent>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "vbss-ui - Modern React Component Library",
                        text: "Check out this amazing React component library!",
                        url: "https://ui.vbss.io",
                      })
                    } else {
                      navigator.clipboard.writeText("https://ui.vbss.io")
                      alert("Link copied to clipboard!")
                    }
                  }}
                >
                  Share
                </Button>
              </SupportS.SupportCard>
              <SupportS.SupportCard>
                <Code weight="fill" style={{ color: "hsl(248 39% 39%)", fontSize: "2rem" }} />
                <SupportS.SupportCardContent>
                  <SupportS.SupportCardTitle>Contribute with Code</SupportS.SupportCardTitle>
                  <SupportS.SupportCardDescription>
                    Help improve vbss-ui by opening a Pull Request on our GitHub repository.
                  </SupportS.SupportCardDescription>
                </SupportS.SupportCardContent>
                <Button
                  as="a"
                  href="https://github.com/vbss-io/vbss-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                >
                  Open PR
                </Button>
              </SupportS.SupportCard>
            </div>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="thank-you" />
              Thank You
            </S.SectionTitle>
            <S.Paragraph>
              Every contribution, no matter how small, makes a difference. Thank you for being part of the vbss-ui community and
              helping us build something amazing together.
            </S.Paragraph>
            <SupportS.ThankYouCard>
              <SupportS.ThankYouIcon>
                <Heart weight="fill" style={{ color: "hsl(248 39% 39%)", fontSize: "3rem" }} />
              </SupportS.ThankYouIcon>
              <SupportS.ThankYouText>Your support makes it possible</SupportS.ThankYouText>
            </SupportS.ThankYouCard>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="Support" sections={sections} />
    </>
  )
}
