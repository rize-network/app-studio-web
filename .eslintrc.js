module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'plugin:react/recommended',
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'unused-imports/no-unused-imports': 'error',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'unused-imports'],
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    },
  ],
};
