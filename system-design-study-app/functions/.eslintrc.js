module.exports = {
  // root: true, // This key is not supported when ESLint (even v8) partially considers flat config due to root eslint.config.js
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "google", // You have 'eslint-config-google' in functions/package.json
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"], // Relative to functions directory
    sourceType: "module",
    ecmaVersion: 2017, // Matches target in functions/tsconfig.json
  },
  ignorePatterns: [
    "/lib/**/*", // Default output directory for Firebase Functions
    ".eslintrc.js",
  ],
  plugins: ["@typescript-eslint", "import"], // Matches dependencies in functions/package.json
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0, // Consider configuring 'eslint-import-resolver-typescript' or similar if needed
    "object-curly-spacing": ["error", "always"],
    "require-jsdoc": "off", // Often overridden for Firebase Functions for brevity
    "valid-jsdoc": "off",
    "max-len": ["warn", { "code": 120 }],
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
  },
};