import path from "node:path";
import fs from "node:fs";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";
import vueScopedCssPlugin from "eslint-plugin-vue-scoped-css";
import vueEslintImportPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const sharedConfigPath = path.resolve(
  "node_modules/path-to-shared-config/eslintrc.json",
);
const sharedConfig = JSON.parse(fs.readFileSync(sharedConfigPath, "utf-8"));

const customEslintPlugin = await import("./plugin/index.cjs");

export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...vueScopedCssPlugin.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tsParser, ecmaVersion: "latest" },
    },
  },
  {
    files: ["**/*.js", "**/*.vue", "**/*.ts"],
    plugins: {
      example: customEslintPlugin.default,
      import: vueEslintImportPlugin,
      prettier: prettier,
    },
    rules: {
      ...sharedConfig.rules,
      "example/custom-rule": "warn",
    },
  },
  prettierConfig,
  ...sharedConfig.overrides,
  { ignores: ["plugin/**/*", ...sharedConfig.ignorePatterns] },
];
