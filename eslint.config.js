import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser, // keep browser globals
        ...globals.node, // add Node globals like process
        ...globals.jest, // add Jest globals like describe, it, expect
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // optional, ignores unused args starting with _
    },
  },
]);
