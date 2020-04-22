module.exports = {
  '*.json': 'prettier --write',
  '*.{ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
  '*.css': ['stylelint --cache --fix', 'prettier --write'],
  '*.scss': ['stylelint --cache --syntax scss --fix', 'prettier --write'],
}
