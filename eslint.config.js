const js = require("@eslint/js");
const globals = require("globals");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
  {
    ignores: ["node_modules/**", "Resources/Public/**"],
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    files: ["eslint.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },
  prettierRecommended,
];
