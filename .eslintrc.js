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
  plugins: ['react', 'react-native'],
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
    'no-prototype-builtins': 'off',
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'off',
    'react-native/split-platform-components': 'error',
    'react-native/no-raw-text': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'react/jsx-indent': ['error', 2]
  },
}
