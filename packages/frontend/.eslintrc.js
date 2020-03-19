const baseRules = {
  all: {
    radix: ['error', 'as-needed'],
    'max-classes-per-file': 'off',
    'prettier/prettier': 'error',
    'global-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-duplicates': 'off',
    'import/order': 'off',
    'import/no-self-import': 'off',
    'import/no-cycle': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
      },
    ],
  },
  browser: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-one-expression-per-line': 0,
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
  },
  node: {},
};
module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: `${process.cwd()}/tsconfig.json`,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint', 'prettier', 'react-hooks'],
  // some editor plugins don't support object spread yet
  // eslint-disable-next-line prefer-object-spread
  rules: Object.assign({}, baseRules.all, baseRules.browser),
};
