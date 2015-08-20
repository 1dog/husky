/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var globalTag = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(true)
});

module.exports = {

  output: {
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: false,
  entry: [
    'webpack/hot/only-dev-server',
    './src/router.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: [ '', '.js', '.jsx', '.scss' ],
    alias: {
      'styles': __dirname + '/src/styles',
      'fonts': __dirname + '/src/fonts',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    },
    modulesDirectories: [ 'node_modules' ]
  },
  module: {
    preLoaders: [ {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'jsxhint'
    } ],
    loaders: [ {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpe?g|woff|woff2|svg)$/,
      loader: 'url-loader?limit=10192'
    }, {
      test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&minetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    } ]
  },

  plugins: [
    globalTag,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
