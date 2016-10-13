/**
  * Wait for finish project 
  */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./configuration/webpack.config.base');

const DIST_PATH = path.join(__dirname, 'assets/dist/preview/');

const result = merge(baseConfig, {
    plugins: [
        new CleanWebpackPlugin([DIST_PATH]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"preview"'
            }
        })
    ],
    debug: false,
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: DIST_PATH,
        filename: '[name].bundle.js',
        publicPath: '/'
    }
});

module.exports = result;
