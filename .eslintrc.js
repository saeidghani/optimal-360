module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['jest'],
  parserOptions: {
    ecmaFeatures: {
      classes: true,
    },
  },
  env: {
    'jest/globals': true,
  },
  globals: {
    window: true,
    document: true,
  },
  rules: {
    'max-len': [2, { code: 110, tabWidth: 2, ignoreUrls: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'global-require': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-underscore-dangle': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-nested-ternary': 'off',
    'react/no-multi-comp': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': 'off',
    'linebreak-style': 'off',
    'react/state-in-constructor': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'consistent-return': 'off',
    'react/jsx-curly-newline': 'off',
  },
};
