import eslintPluginReact from "eslint-plugin-react";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      "jsx-a11y": eslintPluginJsxA11y,
    },
    rules: {
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/control-has-associated-label": "warn",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/img-redundant-alt": "warn",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/mouse-events-have-key-events": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "warn",
      "jsx-a11y/no-noninteractive-tabindex": "warn",
      "jsx-a11y/no-redundant-roles": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "error",
      "jsx-a11y/html-has-lang": "error",        
      "jsx-a11y/lang": "error",                
      "jsx-a11y/autocomplete-valid": "error",     
      "jsx-a11y/label-has-for": "off",          
      "jsx-a11y/media-has-caption": "warn",
      "jsx-a11y/no-access-key": "warn",          
      "jsx-a11y/no-distracting-elements": "error",
      "jsx-a11y/aria-activedescendant-has-tabindex": "error",
      "jsx-a11y/no-aria-hidden-on-focusable": "error",
      "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];