import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals.js";
import nextTs from "eslint-config-next/typescript.js";

export default defineConfig({
  ...nextVitals,
  ...nextTs,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignores: [
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],
});
