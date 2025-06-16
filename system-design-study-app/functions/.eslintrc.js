/* eslint-env node */
module.exports = {
  root: true,
  globals: {
    module: 'readonly',
    exports: 'readonly',
  },
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "lib/**/*", // Ignore built files, relative to this .eslintrc.js
    "generated/**/*", // Ignore generated files, relative to this .eslintrc.js
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    // Disable base rule to prefer the TypeScript-specific version
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
  },
};
