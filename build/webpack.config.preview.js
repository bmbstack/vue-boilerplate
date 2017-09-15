/**
  * Wait for finish project 
  */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const baseConfig = require('./webpack.config.base');

const result = merge(baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"preview"'
            }
        }),
        // 兼容老版本Webpack
        new webpack.LoaderOptionsPlugin({
            debug: false,
            progress: true,
        }),
    ],
    devtool: 'cheap-module-eval-source-map',
});

module.exports = result;
