module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack/webpack.common.js',
      },
    },
  },
  rules: {
    // custom rules here
    'no-console': 'off',
    'max-len': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/prop-types': ['warn', { ignore: ['className'] }],
  },
};
