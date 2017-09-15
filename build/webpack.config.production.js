/**
  * Wait for finish project 
  */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const result = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 兼容老版本Webpack
        new webpack.LoaderOptionsPlugin({
            debug: false,
            progress: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,  // default
            minimize: true,
            compress: {
                warnings: false,
                drop_console: true
            }
        })
    ],
    devtool: false,
});

module.exports = result;
