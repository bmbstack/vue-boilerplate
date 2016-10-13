/**
  * development env
  */

const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const path = require('path');
const os = require('os');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./configuration/webpack.config.base');

const DIST_PATH = path.join(__dirname, 'assets/dist/development/');

const result = merge(baseConfig, {
    plugins: [
        new CleanWebpackPlugin([DIST_PATH]),
        new DashboardPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                IS_WINDOWS: `${os.platform() === 'win32'}`
            }
        })
    ],
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: DIST_PATH,
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        assets: true,
    },
    progress: true,
    keepalive: true,
    externals: {

    },
    watchOptions: {
        aggregateTimeout: 500, //ms, default is 300
        poll: true
    }
});

module.exports = result;
