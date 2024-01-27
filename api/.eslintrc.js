module.exports = {
  env: {
    node: true,
    es2021: true,
    mocha: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    // Puedes agregar reglas específicas según tus preferencias
  },
  overrides: [
    {
      files: ['**/*.js'],
      excludedFiles: 'node_modules',
      extends: ['plugin:node/recommended'],
      rules: {
        // Puedes agregar reglas específicas para archivos JavaScript
      }
    }
  ]
}
