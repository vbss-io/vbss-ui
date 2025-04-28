import { includeIgnoreFile } from "@eslint/compat"
import pluginJs from "@eslint/js"
import pluginNoRelativeImports from "eslint-plugin-no-relative-import-paths"
import pluginPrettier from "eslint-plugin-prettier"
import pluginReact from "eslint-plugin-react"
import pluginStyledComponentsA11y from "eslint-plugin-styled-components-a11y"
import pluginTailwindcss from "eslint-plugin-tailwindcss"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(gitignorePath),
  {
    ignores: ["node_modules/", "dist/", "build/", ".next/", "coverage/"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: pluginPrettier,
      "styled-components-a11y": pluginStyledComponentsA11y,
      tailwindcss: pluginTailwindcss,
      "no-relative-import-paths": pluginNoRelativeImports,
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      quotes: "off",
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          semi: false,
          tabWidth: 2,
          trailingComma: "es5",
          printWidth: 130,
          endOfLine: "auto",
        },
      ],
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        {
          allowSameFolder: true,
          rootDir: "src",
          prefix: "@",
        },
      ],
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["apps/**/*.{js,jsx,ts,tsx}", "packages/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
      },
    },
  },
  {
    files: ["packages/@stories/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
]
