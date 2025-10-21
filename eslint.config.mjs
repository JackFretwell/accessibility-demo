
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";

export default [
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: eslintPluginReact,
      jsxA11y: eslintPluginJsxA11y
    },
    rules: {
      "jsx-a11y/accessible-emoji": "warn",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "warn",
      "jsx-a11y/no-noninteractive-tabindex": "warn",
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        // Define any global variables here
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
