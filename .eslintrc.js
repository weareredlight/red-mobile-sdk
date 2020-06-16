module.exports = {
  root: true,
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    'dist/',
    'lib/',
    '.git/',
    '.gradle/',
    'vendor/',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:react/recommended',
    'standard-react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'react-hooks'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'import/no-named-default': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', 'external', 'parent', 'sibling', 'index'
        ],
        'newlines-between': 'always-and-inside-groups'
      }
    ],
    'no-prototype-builtins': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'off',
    'react-native/split-platform-components': 'error',
    'react-native/no-raw-text': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'react/jsx-indent': ['error', 2]
  },
}
