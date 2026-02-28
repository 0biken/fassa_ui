import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Shared ESLint configuration for FASSA monorepo
 * Extends Next.js recommended configs with TypeScript support
 */
const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        rules: {
            // Enforce consistent code style
            "prefer-const": "error",
            "no-var": "error",
            "no-console": ["warn", { allow: ["warn", "error"] }],

            // TypeScript specific rules
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_"
                }
            ],
            "@typescript-eslint/no-explicit-any": "warn",

            // React specific rules
            "react/prop-types": "off", // Using TypeScript for prop validation
            "react/react-in-jsx-scope": "off", // Not needed in React 19
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn"
        }
    },
    // Override default ignores
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "dist/**",
        "node_modules/**",
        "next-env.d.ts",
        "*.config.js",
        "*.config.mjs",
        "*.config.ts"
    ])
]);

export default eslintConfig;
