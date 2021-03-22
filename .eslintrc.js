module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true
  },
  extends: 'standard-with-typescript',

  plugins: [
    'svelte3',
    '@typescript-eslint'
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  settings: {
    'svelte3/typescript': require('typescript')
  }
}
