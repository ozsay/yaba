module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'jsx-a11y/href-no-hash': ['off'],
    indent: ['error', 4, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'no-underscore-dangle': ['off'],
    'max-len': ['error', { code: 128 }],
    'react/jsx-indent-props': [2, 4],
    'react/jsx-indent': [2, 4],
},
  extends: 'airbnb'
};
