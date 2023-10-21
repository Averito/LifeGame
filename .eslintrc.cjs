module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/no-explicit-any': 0,
    "prettier/prettier": [
      "warn",
      {
        "arrowParens": "avoid",
        "useTabs": true,
        "singleQuote": true,
        "tabWidth": 2,
        "jsxSingleQuote": true,
        "trailingComma": "none",
        "semi": false,
        "endOfLine": "auto",
        "bracketSpacing": true,
        "bracketSameLine": false,
        "proseWrap": "never"
      }
    ],
  },
}
