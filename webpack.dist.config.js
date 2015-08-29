/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var globalTag = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true)
});
module.exports = {

    output: {
        publicPath: '/assets/',
        path: 'dist/assets/',
        filename: 'bundle-[hash].js'
    },

    debug: false,
    devtool: false,
    entry: './src/router.js',

    stats: {
        colors: true,
        reasons: false
    },

    plugins: [
        globalTag,
        new AssetsPlugin({ path: path.join(__dirname, 'dist') }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],

    resolve: {
        extensions: [ '', '.js', '.jsx', '.scss' ],
        alias: {
            'styles': __dirname + '/src/styles',
            'mixins': __dirname + '/src/mixins',
            'fonts': __dirname + '/src/fonts',
            'components': __dirname + '/src/components/'
        }
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
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        }, {
            test: /\.(png|jpe?g|woff|woff2|svg|eot|ttf)$/,
            loader: 'url-loader?limit=10192'
        } ]
    }
};
