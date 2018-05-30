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
        config: 'webpack/webpack.base.conf.js',
      },
    },
  },
  rules: {
    // custom rules here
  },
};
