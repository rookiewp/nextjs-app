module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    ecmaVersion: 11,
    createDefaultProgram: true,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/lines-between-class-members': 0,
    'react/static-property-placement': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/state-in-constructor': 0,
    'func-names': 0,
    'arrow-parens': 0,
    'operator-linebreak': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'arrow-body-style': 0,
    'no-param-reassign': 0,
  },
};
