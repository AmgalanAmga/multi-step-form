import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression > ArrowFunctionExpression, NewExpression > ArrowFunctionExpression, JSXExpressionContainer > ArrowFunctionExpression, ReturnStatement > ArrowFunctionExpression",
          message: "Extract callbacks into named arrow functions before passing or returning them.",
        },
        {
          selector: "FunctionDeclaration, FunctionExpression",
          message: "Use a named const arrow function.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
