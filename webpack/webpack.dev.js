const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common.js');

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
          // https://github.com/ant-design/ant-design/issues/7927#issuecomment-372513256
          { loader: 'less-loader', options: { javascriptEnabled: true } }
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
