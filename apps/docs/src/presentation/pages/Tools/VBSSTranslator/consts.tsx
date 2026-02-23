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
    title: "Quick Start",
    anchor: "quick-start",
    subsections: [
      {
        title: "Translation File",
        anchor: "translation-file",
      },
      {
        title: "Provider Setup",
        anchor: "provider-setup",
      },
      {
        title: "Using the Hook",
        anchor: "using-hook",
      },
    ],
  },
  {
    title: "Core Features",
    anchor: "core-features",
    subsections: [
      {
        title: "Local Translations",
        anchor: "local-translations",
      },
      {
        title: "Language Management",
        anchor: "language-management",
      },
      {
        title: "External Translation",
        anchor: "external-translation",
      },
      {
        title: "Custom Providers",
        anchor: "custom-providers",
      },
    ],
  },
  {
    title: "API Reference",
    anchor: "api-reference",
    subsections: [
      {
        title: "TranslatorProvider Props",
        anchor: "translator-provider-props",
      },
      {
        title: "useTranslator Hook",
        anchor: "use-translator-hook",
      },
      {
        title: "TranslateOptions",
        anchor: "translate-options",
      },
      {
        title: "External Translation Config",
        anchor: "external-translation-config",
      },
      {
        title: "Translation Provider Interface",
        anchor: "translation-provider-interface",
      },
    ],
  },
  {
    title: "CLI & Generator",
    anchor: "cli-generator",
    subsections: [
      {
        title: "Command Reference",
        anchor: "command-reference",
      },
      {
        title: "Watch Mode",
        anchor: "watch-mode",
      },
      {
        title: "Programmatic API",
        anchor: "programmatic-api",
      },
    ],
  },
  {
    title: "Extended Examples",
    anchor: "extended-examples",
    subsections: [
      {
        title: "Language Switching",
        anchor: "language-switching",
      },
      {
        title: "External Translation Usage",
        anchor: "external-translation-usage",
      },
      {
        title: "Cache & Glossary",
        anchor: "cache-glossary",
      },
      {
        title: "Error Handling",
        anchor: "error-handling",
      },
    ],
  },
]

// Installation Code Snippets
export const npmInstallCode = `npm install vbss-translator`

export const yarnInstallCode = `yarn add vbss-translator`

// Quick Start Code Snippets
export const translationFileCode = `[
  { "en": "Hello", "pt": "Olá", "es": "Hola" },
  { "en": "Goodbye", "pt": "Adeus", "es": "Adiós" },
  { "en": "Welcome", "pt": "Bem-vindo", "es": "Bienvenido" }
]`

export const providerSetupCode = `import ReactDOM from "react-dom";
import translations from "./translations.json" assert { type: "json" };
import { TranslatorProvider } from "vbss-translator";

ReactDOM.render(
  <TranslatorProvider translations={translations}>
    <App />
  </TranslatorProvider>,
  document.getElementById("root")
);`

export const hookUsageCode = `import { useTranslator } from "vbss-translator";

export function Greeting() {
  const { t, language, setLanguage } = useTranslator();

  return (
    <>
      <h1>{t("Hello")}</h1>
      <p>Currently showing: {language}</p>
      <button onClick={() => setLanguage("en")}>English</button>
      <button onClick={() => setLanguage("pt")}>Português</button>
      <button onClick={() => setLanguage("es")}>Español</button>
    </>
  );
}`

// Core Features Code Snippets
export const localTranslationsCode = `// Translation entries use the same language keys
const translations = [
  { "en": "Hello", "pt": "Olá", "es": "Hola" },
  { "en": "World", "pt": "Mundo", "es": "Mundo" }
];

// Case-insensitive matching works for any language
const { t } = useTranslator();
t("hello"); // Returns translation for current language
t("Olá");   // Also works - matches by value
t("HOLA");  // Case-insensitive matching`

export const languageManagementCode = `<TranslatorProvider
  translations={translations}
  defaultLanguage="en"
  autoDetectLanguage={true}
  persist={true}
  persistKey="language"
>
  <App />
</TranslatorProvider>`

export const externalTranslationConfigCode = `const externalTranslation = {
  enabled: true,
  timeoutMs: 5_000,
  debug: false,
  provider: {
    id: "google",
    apiKey: process.env.GOOGLE_TRANSLATE_KEY,
    endpoint: "https://translation.googleapis.com/language/translate/v2",
  },
  cache: {
    enabled: true,
    ttlMs: 30 * 60 * 1000,
    maxEntries: 500,
  },
  glossary: {
    BRAND_A: "Marca A",
  },
  alwaysExternalKeys: ["product.description"],
  shouldTranslate: ({ key, text }) => !text.includes("SECRET"),
  onExternalTranslation: ({ key, text }) => {
    console.info("sending text to provider", { key, text });
  },
  onTranslationError: ({ key, language, error }) => {
    console.warn("translation failed", { key, language, error });
  },
  onTranslationComplete: (result) => {
    console.log("external result", result.translatedText);
  },
};

<TranslatorProvider
  translations={translations}
  externalTranslation={externalTranslation}
>
  <App />
</TranslatorProvider>`

export const externalTranslationSecurityWarning = `**⚠️ Security Warning**: Using Google Translate API keys directly in frontend code exposes your credentials to users and potential abuse. For production environments, implement a custom provider that proxies requests through your backend server to keep API keys secure.`

export const customProviderCode = `import {
  TranslatorProvider,
  type TranslationProvider,
  type TranslateRequest,
  type TranslateResult,
} from "vbss-translator";

// Custom provider implementation
const myCustomProvider: TranslationProvider = {
  type: "custom",
  checkAvailability: async () => ({ available: true }),
  translate: async (request: TranslateRequest): Promise<TranslateResult> => {
    const response = await fetch("https://my-translation-api.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: request.text,
        source: request.sourceLanguage,
        target: request.targetLanguage,
      }),
    });
    const data = await response.json();
    return {
      translatedText: data.translation,
      detectedSourceLanguage: request.sourceLanguage,
    };
  },
};

<TranslatorProvider
  translations={translations}
  externalTranslation={{
    enabled: true,
    provider: {
      id: "custom",
      implementation: myCustomProvider,
    },
    cache: { enabled: true, ttlMs: 1800000 },
  }}
>
  <App />
</TranslatorProvider>`

export const customProviderFactoryCode = `const providerFactory = () => {
  const apiKey = process.env.CUSTOM_TRANSLATION_KEY;
  const endpoint = process.env.CUSTOM_TRANSLATION_ENDPOINT;

  return {
    type: "custom",
    checkAvailability: async () => {
      if (!apiKey || !endpoint) {
        return { available: false, reason: "Missing configuration" };
      }
      return { available: true };
    },
    translate: async (request: TranslateRequest): Promise<TranslateResult> => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": \`Bearer \${apiKey}\`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: request.text,
          from: request.sourceLanguage,
          to: request.targetLanguage,
          glossary: request.glossary,
        }),
      });
      const data = await response.json();
      return {
        translatedText: data.result,
        providerMetadata: { provider: "custom" },
      };
    },
  };
};

<TranslatorProvider
  translations={translations}
  externalTranslation={{
    enabled: true,
    provider: {
      id: "custom",
      factory: providerFactory,
    },
  }}
>
  <App />
</TranslatorProvider>`

// CLI Code Snippets
export const cliGenerateCode = `npx vbss-translator generate --pattern "src/**/translations.json" --output "src/translations/index.ts" --format ts`

export const cliWatchModeCode = `npx vbss-translator generate --watch`

export const cliAllOptionsCode = `npx vbss-translator generate \\
  --pattern "src/**/translations.json" \\
  --output "src/translations/index.ts" \\
  --format ts \\
  --reference-language en \\
  --config vbss-translator.config.json \\
  --watch`

export const programmaticApiCode = `import { generate } from "vbss-translator/generator";
import type { GeneratorOptions } from "vbss-translator/generator";

const result = await generate({
  pattern: "src/**/translations.json",
  outputPath: "src/translations/index.ts",
  outputFormat: "ts",
  referenceLanguage: "en",
});

if (!result.success) {
  console.error("Generation failed", result.errors);
} else {
  console.log(\`Generated \${result.translationCount} translations from \${result.filesProcessed} files\`);
}`

// Extended Examples Code Snippets
export const languageSwitchingCode = `import { useTranslator } from "vbss-translator";

export function LanguageSwitcher() {
  const { language, languages, setLanguage } = useTranslator();

  return (
    <div>
      <p>Current Language: {language}</p>
      <div>
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            disabled={lang === language}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}`

export const externalTranslationUsageCode = `import { useTranslator } from "vbss-translator";

export function ProductDescription() {
  const { t, isTranslating, registerExternalKey } = useTranslator();

  // Register this key to always use external translation
  registerExternalKey("product.dynamic.description");

  const description = t("This is a dynamic product description", {
    preferExternal: true,
    fallbackValue: "Loading description...",
  });

  const isLoading = isTranslating["product.dynamic.description::pt"];

  return (
    <div>
      <p>{description}</p>
      {isLoading && <span>Translating...</span>}
    </div>
  );
}`

export const cacheGlossaryCode = `const externalTranslation = {
  enabled: true,
  provider: {
    id: "google",
    apiKey: process.env.GOOGLE_TRANSLATE_KEY,
  },
  cache: {
    enabled: true,
    ttlMs: 30 * 60 * 1000, // 30 minutes
    maxEntries: 500,
  },
  glossary: {
    // Brand names and special terms
    "VBSS": "VBSS",
    "React": "React",
    "TypeScript": "TypeScript",
  },
  debug: true, // See cache hits/misses in console
};

<TranslatorProvider
  translations={translations}
  externalTranslation={externalTranslation}
>
  <App />
</TranslatorProvider>`

export const errorHandlingCode = `import { useTranslator } from "vbss-translator";

const externalTranslation = {
  enabled: true,
  provider: {
    id: "google",
    apiKey: process.env.GOOGLE_TRANSLATE_KEY,
  },
  timeoutMs: 5_000,
  onTranslationError: ({ key, language, error }) => {
    console.error(\`Translation failed for "\${key}" to "\${language}"\`, error);
    // Log to error tracking service
    // Show user-friendly error message
  },
  onTranslationComplete: (result) => {
    console.log("Translation succeeded:", result.translatedText);
  },
};

export function SafeTranslation() {
  const { t } = useTranslator();

  const abortController = new AbortController();

  const translation = t("Text to translate", {
    preferExternal: true,
    fallbackValue: "Default text if translation fails",
    signal: abortController.signal,
  });

  // Cancel translation if component unmounts
  // useEffect(() => () => abortController.abort(), []);

  return <p>{translation}</p>;
}`

// API Reference Tables
export const translatorProviderPropsHeaders = [
  { content: "Prop" },
  { content: "Type" },
  { content: "Description" },
  { content: "Default" },
]

export const translatorProviderPropsRows = [
  {
    prop: "translations",
    type: "Translation[]",
    description: "Array of translation records. Each record must have the same language keys.",
    default: "required",
  },
  {
    prop: "defaultLanguage",
    type: "string",
    description: "Fallback language when a translation is missing or auto-detect fails.",
    default: '"en"',
  },
  {
    prop: "autoDetectLanguage",
    type: "boolean",
    description: "Use the browser language (base locale) as the initial language.",
    default: "false",
  },
  {
    prop: "persist",
    type: "boolean",
    description: "Persist the selected language to localStorage.",
    default: "false",
  },
  {
    prop: "persistKey",
    type: "string",
    description: "Storage key used when persist is true.",
    default: '"language"',
  },
  {
    prop: "externalTranslation",
    type: "ExternalTranslationConfigInput",
    description: "External translation configuration including provider, cache, and callbacks.",
    default: "disabled",
  },
]

export const useTranslatorApiHeaders = [
  { content: "Property" },
  { content: "Type" },
  { content: "Description" },
]

export const useTranslatorApiRows = [
  {
    property: "t",
    type: "(text: string, options?: TranslateOptions) => string",
    description: "Translate text using local dictionaries with external fallback when needed.",
  },
  {
    property: "language",
    type: "string",
    description: "Currently active language code.",
  },
  {
    property: "languages",
    type: "string[]",
    description: "Available languages derived from the first translation entry.",
  },
  {
    property: "setLanguage",
    type: "(lang: string) => void",
    description: "Switch the active language and persist if enabled.",
  },
  {
    property: "isTranslating",
    type: "Record<string, boolean>",
    description: "Map keyed by 'text::language' showing pending external translation requests.",
  },
  {
    property: "isTranslatingAny",
    type: "boolean",
    description: "True when any external translation request is running.",
  },
  {
    property: "registerExternalKey",
    type: "(key: string) => void",
    description: "Register a specific string to always use external translation pathway.",
  },
  {
    property: "externalConfig",
    type: "ExternalTranslationConfig",
    description: "Read-only resolved external translation configuration.",
  },
]

export const translateOptionsHeaders = [
  { content: "Option" },
  { content: "Type" },
  { content: "Description" },
]

export const translateOptionsRows = [
  {
    option: "preferExternal",
    type: "boolean",
    description: "Force an external translation even if a local translation exists.",
  },
  {
    option: "sourceLanguage",
    type: "string",
    description: "Explicit source language when translating externally. Defaults to defaultLanguage.",
  },
  {
    option: "fallbackValue",
    type: "string",
    description: "UI text to show until a translation resolves (useful for loading states).",
  },
  {
    option: "signal",
    type: "AbortSignal",
    description: "Cancels the external translation request via AbortController.",
  },
]

export const externalTranslationConfigHeaders = [
  { content: "Field" },
  { content: "Type" },
  { content: "Default" },
  { content: "Description" },
]

export const externalTranslationConfigRows = [
  {
    field: "enabled",
    type: "boolean",
    default: "false",
    description: "Master switch for the entire external translation pipeline.",
  },
  {
    field: "timeoutMs",
    type: "number",
    default: "5000",
    description: "Maximum duration in milliseconds before aborting a translation request.",
  },
  {
    field: "debug",
    type: "boolean",
    default: "false",
    description: "Emit structured logs for cache hits, deduped requests, retries, etc.",
  },
  {
    field: "provider",
    type: "ProviderConfig",
    default: '{ id: "google" }',
    description: "Google Translate or custom provider configuration.",
  },
  {
    field: "cache",
    type: "CacheConfig",
    default: "{ enabled: false, ttlMs: 3600000 }",
    description: "In-memory cache with TTL and optional LRU size limit (maxEntries).",
  },
  {
    field: "glossary",
    type: "Record<string, string>",
    default: "undefined",
    description: "Optional term overrides sent when the provider supports them.",
  },
  {
    field: "alwaysExternalKeys",
    type: "ReadonlySet<string>",
    default: "new Set()",
    description: "Strings that automatically skip local dictionaries and use external provider.",
  },
  {
    field: "shouldTranslate",
    type: "(request) => boolean",
    default: "undefined",
    description: "Synchronous guard invoked before caching/deduplication.",
  },
  {
    field: "onExternalTranslation",
    type: "(request) => void | boolean",
    default: "undefined",
    description: "Async-friendly hook before network call. Return false to cancel the request.",
  },
  {
    field: "onTranslationError",
    type: "(event) => void",
    default: "undefined",
    description: "Receives normalized provider errors with retry metadata.",
  },
  {
    field: "onTranslationComplete",
    type: "(result) => void",
    default: "undefined",
    description: "Fires after a successful response and cache write.",
  },
]

export const translationProviderInterfaceHeaders = [
  { content: "Field" },
  { content: "Type" },
  { content: "Description" },
]

export const translationProviderInterfaceRows = [
  {
    field: "type",
    type: "string",
    description: 'String identifier for the provider (e.g., "custom", "google").',
  },
  {
    field: "checkAvailability",
    type: "() => Promise<ProviderAvailability>",
    description: "Validates provider readiness (e.g., credentials, network connectivity).",
  },
  {
    field: "translate",
    type: "(request: TranslateRequest) => Promise<TranslateResult>",
    description: "Accepts translation request and returns translated text with optional metadata.",
  },
  {
    field: "normalizeError",
    type: "(error: unknown) => ProviderError",
    description: "Optional method to convert provider-specific errors into structured format with retryable flags.",
  },
]

// CLI Command Reference Table
export const cliCommandFlagsHeaders = [
  { content: "Flag" },
  { content: "Description" },
  { content: "Default" },
]

export const cliCommandFlagsRows = [
  {
    flag: "--pattern",
    description: "Glob pattern for JSON translation sources. Resolved relative to current directory.",
    default: "src/**/translations.json",
  },
  {
    flag: "--output",
    description: "Output file path. Parent directories are created automatically.",
    default: "src/translations/index.ts",
  },
  {
    flag: "--format",
    description: "Output format: ts, js, or tsx.",
    default: "ts",
  },
  {
    flag: "--reference-language",
    description: "Language key used for deduplication.",
    default: "First language in the first valid file",
  },
  {
    flag: "--config",
    description: "Path to vbss-translator.config.json configuration file.",
    default: "Project root",
  },
  {
    flag: "--watch, -w",
    description: "Watch mode with automatic regeneration and debug logs.",
    default: "Disabled",
  },
]

// WhatsNew Entry
export const vbssTranslatorWhatsNew: { version: string; date: string; changes: string[] }[] = [
  {
    version: "1.1.0",
    date: "2025-01-15",
    changes: [
      "Added CLI tool for generating typed translation indexes with watch mode",
      "Implemented external translation pipeline with Google Translate support",
      "Added custom translation provider support for backend proxying",
      "Introduced cache system with TTL and LRU eviction",
      "Added glossary support for terminology overrides",
      "Implemented translation status tracking (isTranslating, isTranslatingAny)",
      "Added comprehensive error handling and retry logic",
      "Included debug mode for development troubleshooting",
    ],
  },
]
