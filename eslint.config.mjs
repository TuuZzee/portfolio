import js from '@eslint/js';
import * as astroParser from 'astro-eslint-parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import astro from 'eslint-plugin-astro';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores([
    'dist/**',
    '.astro/**',
    '.private/**',
    '.pnpm-store/**',
    'test-results/**',
    'playwright-report/**',
    'playwright/.cache/**',
    '.playwright/**',
  ]),
  { files: ['**/*.{js,mjs,ts,astro}'], extends: [js.configs.recommended] },
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    extends: [tseslint.configs.recommended],
    // Keep Astro's outer template parser, using TypeScript for frontmatter only.
    languageOptions: {
      parser: astroParser,
      parserOptions: { parser: tseslint.parser },
    },
    rules: { 'astro/no-set-html-directive': 'error' },
  },
  {
    files: ['**/*.{js,mjs,ts,astro}'],
    plugins: { 'simple-import-sort': simpleImportSort },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    rules: {
      'no-debugger': 'error',
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'prefer-const': 'error',
      'no-var': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^node:', '^@?\\w'], ['^@/'], ['^\\.'], ['^\\u0000']],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.{ts,astro}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  prettier,
);
