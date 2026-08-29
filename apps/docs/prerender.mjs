import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = dirname(fileURLToPath(import.meta.url))
const DIST = join(ROOT, "dist")
const SITE = "https://ui.vbss.io"
const OG_IMAGE = `${SITE}/og-image.png`
const BUILD_DATE = new Date().toISOString().slice(0, 10)

const components = [
  { path: "/chip", name: "Chip", description: "Component for labels, categories, and status indicators." },
  { path: "/chips", name: "Chips", description: "Wrapper component for multiple Chip elements." },
  { path: "/button", name: "Button", description: "A customizable and accessible Button component." },
  { path: "/switch", name: "Switch", description: "A customizable and accessible Switch component." },
  { path: "/table", name: "Table", description: "A customizable and accessible Table component." },
  { path: "/checkbox", name: "Checkbox", description: "A customizable and accessible Checkbox component with label support." },
  { path: "/dialog", name: "Dialog", description: "A customizable and accessible Dialog component with support for triggers, overlays, and various content sections." },
  { path: "/dropdown-menu", name: "Dropdown Menu", description: "A customizable and accessible Dropdown Menu component." },
  { path: "/history-nav", name: "History Nav", description: "A customizable and accessible History Navigation component." },
  { path: "/input", name: "Input", description: "A customizable and accessible Input component." },
  { path: "/input-number", name: "Input Number", description: "A customizable and accessible Number Input component with increment/decrement controls." },
  { path: "/popover", name: "Popover", description: "A customizable and accessible Popover component that displays content in a floating container next to a trigger element." },
  { path: "/radio-group", name: "Radio Group", description: "A customizable and accessible RadioGroup component for single selection." },
  { path: "/textarea", name: "Textarea", description: "A customizable and accessible multi-line text input component." },
  { path: "/tooltip", name: "Tooltip", description: "A customizable and accessible Tooltip component." },
  { path: "/calendar", name: "Calendar", description: "A customizable and accessible Calendar component." },
  { path: "/date-picker", name: "Date Picker", description: "A customizable and accessible Date Picker component with calendar popup." },
  { path: "/data-table", name: "Data Table", description: "A customizable and accessible Data Table component with sorting and pagination capabilities." }
].map((component) => ({ ...component, kind: "component", npm: `@vbss-ui/${component.path.slice(1)}` }))

const guides = [
  { path: "/installation", name: "Installation", description: "Adding components to your project with npm or yarn." },
  { path: "/colors", name: "Colors", description: "Customize your component colors and theme with vbss-ui." },
  { path: "/support", name: "Support", description: "Help us keep vbss-ui free and open source." }
].map((guide) => ({ ...guide, kind: "guide" }))

const tools = [
  {
    path: "/tools/vbss-translator",
    name: "VBSS Translator",
    description: "A lightweight React translation toolkit with external translation support, caching, and CLI integration.",
    kind: "tool",
    npm: "vbss-translator"
  }
]

const home = {
  path: "/",
  name: "vbss-ui",
  title: "vbss-ui — React Component Library",
  description: "A modern, accessible and customizable React + TypeScript component library. Import only the components you need and ship beautiful interfaces fast.",
  kind: "home"
}

const introduction = {
  path: "/introduction",
  name: "Introduction",
  description: "Build beautiful UIs with minimal effort using the vbss-ui React component library.",
  kind: "guide",
  canonical: `${SITE}/`,
  noSitemap: true
}

const routes = [home, introduction, ...guides, ...components, ...tools]

const titleFor = (route) => (route.kind === "home" ? route.title : `${route.name} — vbss-ui`)
const canonicalFor = (route) => route.canonical ?? `${SITE}${route.path === "/" ? "/" : route.path}`

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const jsonLdScript = (payload) => {
  const serialized = JSON.stringify(payload).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")
  return `<script type="application/ld+json">${serialized}</script>`
}

const websiteNode = {
  "@type": "WebSite",
  name: "vbss-ui",
  url: `${SITE}/`,
  description: home.description,
  inLanguage: "en"
}

const buildJsonLd = (route) => {
  if (route.kind === "home") {
    return jsonLdScript([
      websiteNode,
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "vbss-ui",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        url: `${SITE}/`,
        description: route.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
      }
    ])
  }
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: titleFor(route),
    name: route.name,
    description: route.description,
    url: canonicalFor(route),
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "vbss-ui", url: `${SITE}/` },
    publisher: { "@type": "Organization", name: "vbss", url: "https://vbss.io" }
  })
}

const componentLinks = components
  .map((component) => `<li><a href="${component.path}">${escapeHtml(component.name)}</a> — ${escapeHtml(component.description)}</li>`)
  .join("\n        ")

const buildBody = (route) => {
  const title = titleFor(route)
  if (route.kind === "home") {
    return `<main style="max-width:44rem;margin:0 auto;padding:2rem 1.25rem 4rem;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.6">
      <h1>vbss-ui</h1>
      <p>${escapeHtml(route.description)}</p>
      <p>Each component ships as an independent package, so you install only what you need. Built with React, TypeScript and styled-components, with dark mode and accessibility in mind.</p>
      <h2>Components</h2>
      <ul>
        ${componentLinks}
      </ul>
      <p><a href="/installation">Installation</a> · <a href="/colors">Colors</a> · <a href="/support">Support</a></p>
    </main>`
  }
  const install =
    route.npm != null
      ? `<h2>Installation</h2>
      <p>Install <strong>${escapeHtml(route.name)}</strong> with npm or yarn:</p>
      <pre><code>npm install ${escapeHtml(route.npm)}</code></pre>
      <pre><code>yarn add ${escapeHtml(route.npm)}</code></pre>
      <p><a href="https://www.npmjs.com/package/${route.npm}" target="_blank" rel="noopener noreferrer">View on npm</a></p>`
      : ""
  return `<main style="max-width:44rem;margin:0 auto;padding:2rem 1.25rem 4rem;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.6">
      <h1>${escapeHtml(route.name)}</h1>
      <p>${escapeHtml(route.description)}</p>
      ${install}
      <p><a href="/">vbss-ui — React Component Library</a></p>
    </main>`
}

const buildHead = (route, assetTags) => {
  const title = titleFor(route)
  const description = route.description
  const canonical = canonicalFor(route)
  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="icon" href="/favicon.ico" sizes="256x256" />
    <link rel="icon" href="/pwa-192x192.png" type="image/png" sizes="192x192" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#6a5bcd" />

    <title>${escapeHtml(title)}</title>
    <meta name="title" content="${escapeHtml(title)}" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="vbss/ui" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_US" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonical}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />

    ${buildJsonLd(route)}
${assetTags}`
}

const outputPathFor = (route) => (route.path === "/" ? join(DIST, "index.html") : join(DIST, `${route.path.slice(1)}.html`))

const buildSitemap = () => {
  const urls = routes
    .filter((route) => !route.noSitemap)
    .map((route) => {
      const loc = route.path === "/" ? `${SITE}/` : `${SITE}${route.path}`
      const priority = route.kind === "home" ? "1.0" : route.kind === "component" ? "0.8" : "0.6"
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${BUILD_DATE}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`

const template = readFileSync(join(DIST, "index.html"), "utf8")
const scriptTag = template.match(/<script type="module"[^>]*><\/script>/)?.[0]
const cssTag = template.match(/<link rel="stylesheet"[^>]*>/)?.[0]

if (scriptTag == null) {
  throw new Error("prerender: could not find the SPA module script in dist/index.html")
}

const assetTags = ["    " + scriptTag, cssTag != null ? "    " + cssTag : null].filter(Boolean).join("\n")

for (const route of routes) {
  const head = buildHead(route, assetTags)
  const body = buildBody(route)
  let html = template.replace(/<head>[\s\S]*?<\/head>/, `<head>\n${head}\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">\n      ${body}\n    </div>`)
  const outputPath = outputPathFor(route)
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, html, "utf8")
}

writeFileSync(join(DIST, "sitemap.xml"), buildSitemap(), "utf8")
writeFileSync(join(DIST, "robots.txt"), robots, "utf8")

console.log(`prerender: ${routes.length} pages + sitemap.xml + robots.txt written to dist/`)
