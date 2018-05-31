const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common.conf');

const { devEnv } = require('../config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  // https://webpack.js.org/configuration/optimization
  optimization: {
    namedModules: true,
    noEmitOnErrors: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': devEnv,
    }),
    // https://webpack.js.org/plugins/hot-module-replacement-plugin
    new webpack.HotModuleReplacementPlugin()
  ]
});
