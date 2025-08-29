import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default {
  ...js.configs.recommended, // herda regras recomendadas do JS
  languageOptions: {
    globals: {
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    quotes: ['error', 'single'], // aspas simples
    semi: ['error', 'always'], // ponto e vírgula
   
  },
};
