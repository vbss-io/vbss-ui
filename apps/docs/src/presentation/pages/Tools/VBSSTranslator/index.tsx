import { Table } from "@vbss-ui/table"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"
import { ContentSidebar } from "@/presentation/components/ContentSidebar"
import { ExampleContainer } from "@/presentation/components/ExampleContainer"
import { WhatsNew } from "@/presentation/components/WhatsNew"
import { ArrowSquareOut } from "@phosphor-icons/react"

import * as S from "../../styles"
import {
  cacheGlossaryCode,
  cliAllOptionsCode,
  cliCommandFlagsHeaders,
  cliCommandFlagsRows,
  cliGenerateCode,
  cliWatchModeCode,
  customProviderCode,
  customProviderFactoryCode,
  errorHandlingCode,
  externalTranslationConfigCode,
  externalTranslationConfigHeaders,
  externalTranslationConfigRows,
  externalTranslationSecurityWarning,
  externalTranslationUsageCode,
  hookUsageCode,
  languageManagementCode,
  languageSwitchingCode,
  localTranslationsCode,
  npmInstallCode,
  programmaticApiCode,
  providerSetupCode,
  sections,
  translateOptionsHeaders,
  translateOptionsRows,
  translationFileCode,
  translationProviderInterfaceHeaders,
  translationProviderInterfaceRows,
  translatorProviderPropsHeaders,
  translatorProviderPropsRows,
  useTranslatorApiHeaders,
  useTranslatorApiRows,
  vbssTranslatorWhatsNew,
  yarnInstallCode,
} from "./consts"

export const VBSSTranslatorDocs = () => {
  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Title>VBSS Translator</S.Title>
          <S.SubTitle>
            A lightweight React translation toolkit with external translation support, caching, and CLI integration.
          </S.SubTitle>
          <section>
            <S.Paragraph>
              The <strong>VBSS Translator</strong> package provides a complete translation solution for React applications.
              It features a context-driven provider, the <code>useTranslator</code> hook, automatic language detection,
              external translation support with Google Translate or custom providers, intelligent caching, and a powerful
              CLI for managing translation files.
            </S.Paragraph>
          </section>
          <WhatsNew title="What's new" entries={vbssTranslatorWhatsNew} />
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="installation" />
              Installation
            </S.SectionTitle>
            <S.Paragraph>
              <a
                href="https://www.npmjs.com/package/vbss-translator"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
              >
                View on npm <ArrowSquareOut size={16} weight="bold" />
              </a>
            </S.Paragraph>
            <S.Paragraph>To install the VBSS Translator package, run one of the following commands:</S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-npm" />
              Using npm
            </S.SectionSubTitle>
            <CodeSnippet code={npmInstallCode} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-yarn" />
              Using yarn
            </S.SectionSubTitle>
            <CodeSnippet code={yarnInstallCode} language="sh" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="quick-start" />
              Quick Start
            </S.SectionTitle>
            <S.Paragraph>
              Get started quickly with VBSS Translator by creating a translation file, setting up the provider, and using
              the hook in your components.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="translation-file" />
              Translation File
            </S.SectionSubTitle>
            <S.Paragraph>
              Create a JSON file containing your translations. Each translation entry should be an object with language
              keys (e.g., "en", "pt", "es") and corresponding translated strings:
            </S.Paragraph>
            <CodeSnippet code={translationFileCode} language="json" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="provider-setup" />
              Provider Setup
            </S.SectionSubTitle>
            <S.Paragraph>
              Wrap your application with the <code>TranslatorProvider</code> component to make translations available
              throughout your app:
            </S.Paragraph>
            <CodeSnippet code={providerSetupCode} language="tsx" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="using-hook" />
              Using the Hook
            </S.SectionSubTitle>
            <S.Paragraph>
              Use the <code>useTranslator</code> hook in your components to access translations and language management:
            </S.Paragraph>
            <CodeSnippet code={hookUsageCode} language="tsx" />
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="core-features" />
              Core Features
            </S.SectionTitle>
            <S.SectionSubTitle>
              <S.SectionAnchor id="local-translations" />
              Local Translations
            </S.SectionSubTitle>
            <S.Paragraph>
              VBSS Translator performs case-insensitive matching across all translation values. The <code>t</code> function
              searches for matches in any language and returns the translation for the currently active language:
            </S.Paragraph>
            <CodeSnippet code={localTranslationsCode} language="tsx" />
            <S.Paragraph>
              Translation entries must use the same language keys. When a match is found, the provider returns the
              translation for the active language, falling back to other available values if necessary.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="language-management" />
              Language Management
            </S.SectionSubTitle>
            <S.Paragraph>
              Configure automatic language detection, default fallback languages, and persistence to localStorage:
            </S.Paragraph>
            <CodeSnippet code={languageManagementCode} language="tsx" />
            <S.Paragraph>
              The <code>autoDetectLanguage</code> option automatically detects the browser language and simplifies locale
              codes (e.g., "pt-BR" becomes "pt"). The <code>persist</code> option saves the selected language to
              localStorage for persistence across sessions.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="external-translation" />
              External Translation
            </S.SectionSubTitle>
            <S.Paragraph>
              External translation allows you to translate text that is not in your local translation files. This feature
              supports Google Translate out of the box and allows custom translation providers:
            </S.Paragraph>
            <CodeSnippet code={externalTranslationConfigCode} language="tsx" />
            <S.Paragraph style={{ fontWeight: "600", color: "#dc2626", marginTop: "1.5rem" }}>
              {externalTranslationSecurityWarning}
            </S.Paragraph>
            <S.Paragraph>
              The external translation pipeline includes built-in caching, request deduplication, timeout handling, retry
              logic, and comprehensive callbacks for monitoring and error handling. Use the <code>debug</code> option during
              development to see detailed logs of cache hits, deduplication, and translation requests.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="custom-providers" />
              Custom Providers
            </S.SectionSubTitle>
            <S.Paragraph>
              For production environments, implement a custom translation provider that proxies requests through your
              backend server. This approach keeps API keys secure and allows you to implement additional business logic:
            </S.Paragraph>
            <CodeSnippet code={customProviderCode} language="tsx" />
            <S.Paragraph>You can also use a factory function for more complex initialization logic:</S.Paragraph>
            <CodeSnippet code={customProviderFactoryCode} language="tsx" />
            <S.Paragraph>
              Custom providers integrate seamlessly with caching, logging, and callback infrastructure. All hooks (
              <code>shouldTranslate</code>, <code>onExternalTranslation</code>, <code>onTranslationError</code>,{" "}
              <code>onTranslationComplete</code>) work identically regardless of the active provider.
            </S.Paragraph>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="api-reference" />
              API Reference
            </S.SectionTitle>
            <S.SectionSubTitle>
              <S.SectionAnchor id="translator-provider-props" />
              TranslatorProvider Props
            </S.SectionSubTitle>
            <S.Paragraph>
              The <code>TranslatorProvider</code> component accepts the following props:
            </S.Paragraph>
            <S.TableSection>
              <Table
                variant="primary"
                headers={translatorProviderPropsHeaders}
                rows={translatorProviderPropsRows.map((row) => ({ ...row, style: { color: "white" } }))}
                fontSize="sm"
              />
            </S.TableSection>
            <S.SectionSubTitle>
              <S.SectionAnchor id="use-translator-hook" />
              useTranslator Hook
            </S.SectionSubTitle>
            <S.Paragraph>
              The <code>useTranslator</code> hook provides access to translation functions and language state:
            </S.Paragraph>
            <S.TableSection>
              <Table
                variant="primary"
                headers={useTranslatorApiHeaders}
                rows={useTranslatorApiRows.map((row) => ({ ...row, style: { color: "white" } }))}
                fontSize="sm"
              />
            </S.TableSection>
            <S.SectionSubTitle>
              <S.SectionAnchor id="translate-options" />
              TranslateOptions
            </S.SectionSubTitle>
            <S.Paragraph>
              Pass options to the <code>t</code> function to control translation behavior:
            </S.Paragraph>
            <S.TableSection>
              <Table
                variant="primary"
                headers={translateOptionsHeaders}
                rows={translateOptionsRows.map((row) => ({ ...row, style: { color: "white" } }))}
                fontSize="sm"
              />
            </S.TableSection>
            <S.SectionSubTitle>
              <S.SectionAnchor id="external-translation-config" />
              External Translation Config
            </S.SectionSubTitle>
            <S.Paragraph>
              Configure external translation behavior with the following options:
            </S.Paragraph>
            <S.TableSection>
              <Table
                variant="primary"
                headers={externalTranslationConfigHeaders}
                rows={externalTranslationConfigRows.map((row) => ({ ...row, style: { color: "white" } }))}
                fontSize="sm"
              />
            </S.TableSection>
            <S.SectionSubTitle>
              <S.SectionAnchor id="translation-provider-interface" />
              Translation Provider Interface
            </S.SectionSubTitle>
            <S.Paragraph>
              Custom translation providers must implement the following interface:
            </S.Paragraph>
            <S.TableSection>
              <Table
                variant="primary"
                headers={translationProviderInterfaceHeaders}
                rows={translationProviderInterfaceRows.map((row) => ({ ...row, style: { color: "white" } }))}
                fontSize="sm"
              />
            </S.TableSection>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="cli-generator" />
              CLI & Generator
            </S.SectionTitle>
            <S.Paragraph>
              VBSS Translator includes a powerful CLI tool that generates typed translation indexes from scattered JSON
              files. The CLI orchestrates file discovery, validation, deduplication, and code generation.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="command-reference" />
              Command Reference
            </S.SectionSubTitle>
            <S.Paragraph>Generate a translation index with the following command:</S.Paragraph>
            <CodeSnippet code={cliGenerateCode} language="sh" />
            <S.Paragraph>Available command-line flags:</S.Paragraph>
            <S.TableSection>
              <Table
                variant="primary"
                headers={cliCommandFlagsHeaders}
                rows={cliCommandFlagsRows.map((row) => ({ ...row, style: { color: "white" } }))}
                fontSize="sm"
              />
            </S.TableSection>
            <S.Paragraph>Example with all options:</S.Paragraph>
            <CodeSnippet code={cliAllOptionsCode} language="sh" />
            <S.SectionSubTitle>
              <S.SectionAnchor id="watch-mode" />
              Watch Mode
            </S.SectionSubTitle>
            <S.Paragraph>
              Enable watch mode to automatically regenerate the translation index when files change:
            </S.Paragraph>
            <CodeSnippet code={cliWatchModeCode} language="sh" />
            <S.Paragraph>
              Watch mode runs an initial generation, then monitors files matching the pattern. Changes are debounced (300ms)
              and trigger automatic regeneration. The watcher runs until interrupted and emits debug logs to help diagnose
              file detection.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="programmatic-api" />
              Programmatic API
            </S.SectionSubTitle>
            <S.Paragraph>
              You can also use the generator programmatically in your build scripts or custom tooling:
            </S.Paragraph>
            <CodeSnippet code={programmaticApiCode} language="tsx" />
            <S.Paragraph>
              The <code>generate</code> function returns a result object containing success status, file counts, error
              details, and the output path. This API shares the same validation and deduplication pipeline as the CLI.
            </S.Paragraph>
          </section>
          <section>
            <S.SectionTitle>
              <S.SectionAnchor id="extended-examples" />
              Extended Examples
            </S.SectionTitle>
            <S.SectionSubTitle>
              <S.SectionAnchor id="language-switching" />
              Language Switching
            </S.SectionSubTitle>
            <S.Paragraph>
              Create a language switcher component to allow users to change the active language:
            </S.Paragraph>
            <ExampleContainer code={languageSwitchingCode}>
              <S.Paragraph>
                This example shows how to build a simple language switcher using the <code>language</code>,{" "}
                <code>languages</code>, and <code>setLanguage</code> properties from the <code>useTranslator</code> hook.
              </S.Paragraph>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="external-translation-usage" />
              External Translation Usage
            </S.SectionSubTitle>
            <S.Paragraph>
              Use external translation for dynamic content that is not in your local translation files:
            </S.Paragraph>
            <ExampleContainer code={externalTranslationUsageCode}>
              <S.Paragraph>
                The example demonstrates using <code>preferExternal</code> to force external translation, registering keys
                with <code>registerExternalKey</code>, and tracking translation status with <code>isTranslating</code>.
              </S.Paragraph>
            </ExampleContainer>
            <S.SectionSubTitle>
              <S.SectionAnchor id="cache-glossary" />
              Cache & Glossary
            </S.SectionSubTitle>
            <S.Paragraph>
              Configure caching to improve performance and use glossaries to preserve specific terminology:
            </S.Paragraph>
            <CodeSnippet code={cacheGlossaryCode} language="tsx" />
            <S.Paragraph>
              The cache stores translations in memory with TTL (time-to-live) and optional LRU eviction. Glossaries ensure
              brand names and technical terms are not translated. Enable <code>debug</code> mode to see cache hits and
              misses in the console.
            </S.Paragraph>
            <S.SectionSubTitle>
              <S.SectionAnchor id="error-handling" />
              Error Handling
            </S.SectionSubTitle>
            <S.Paragraph>
              Implement robust error handling for external translations using callbacks and AbortController:
            </S.Paragraph>
            <CodeSnippet code={errorHandlingCode} language="tsx" />
            <S.Paragraph>
              Use <code>onTranslationError</code> and <code>onTranslationComplete</code> callbacks to handle translation
              lifecycle events. The <code>fallbackValue</code> option provides default text when translations fail, and{" "}
              <code>signal</code> allows canceling in-flight requests.
            </S.Paragraph>
          </section>
        </S.ContentWrapper>
      </S.Container>
      <ContentSidebar title="VBSS Translator" sections={sections} />
    </>
  )
}
