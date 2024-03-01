module.exports = {
  root: true,
  plugins: ['jest'],
  files: ['tests/**/*'],
  env: { browser: true, es2021: true, 'jest/globals': true },
  extends: ['eslint:recommended', 'standard', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
