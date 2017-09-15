/**
  * development env
  */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const os = require('os');

const WebpackShellPlugin = require('webpack-shell-plugin');

const baseConfig = require('./webpack.config.base');

const PORT = 8091;
const isWindows = os.platform() === 'win32';

const random = (min = 0, max = 1) => Math.round(Math.random() * (max - min) + min);
const tips = [
    "可以在webpack.config.development.js中编辑自动打开的页面哟 ---- 来自编译器的关怀",
    "如果总是访问不到自己写的页面, 不如先检查一下entries.config.js中有没有注册 ---- 来自编译器的关怀",
    "每一个程序员在职业生涯中都会无数次想撂担子的冲动, 也会有无数次^2想拍屁股走人的冲动, 但是还是得把代码写完. 呵呵 ---- 来自编译器的嘲讽",
    "代码狗, 就知道你还没下班😂   ---- 来自编译器的嘲讽",
    "想要生活过得去, 就得头上有点绿. ---- 匿名"
];

const result = merge(baseConfig, {
    plugins: [
        // 热更新
        new webpack.HotModuleReplacementPlugin(),
        // 兼容老版本Webpack
        new webpack.LoaderOptionsPlugin({
            debug: true,
            progress: true,
        }),
        // 环境定义
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                IS_WINDOWS: `${isWindows}`
            }
        }),
        // 自动打开浏览器
        new WebpackShellPlugin({
            onBuildStart: [`echo ${tips[random(1, tips.length - 1)]}`],
            onBuildEnd: [`${isWindows?'start':'open'} http://localhost:${PORT}/example.html`]
        })
    ],
    devtool: 'source-map',
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        assets: true,
    },
    watchOptions: {
        aggregateTimeout: 500, //ms, default is 300
        poll: true
    },
    devServer: {
        port: PORT,
        proxy: {
            '/html5/*': {
                target: 'http://192.168.1.49:9008',
                secure: false,
                changeOrigin: true
            },
            '/list': {
                target: 'http://ssapinew.knowbox.cn',
                secure: false,
                changeOrigin: true
            }
        } 
        //*/
    }
});

module.exports = result;
