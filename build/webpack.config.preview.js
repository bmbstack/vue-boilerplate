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
        })
    ],
	/*
    output: {
        publicPath: `/<projectName>/dist/${process.env.NODE_ENV}`
    },
	//*/
    debug: false,
    devtool: 'cheap-module-eval-source-map',
});

module.exports = result;
