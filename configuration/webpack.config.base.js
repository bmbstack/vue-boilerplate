const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

// 入口配置文件
const entries = require('./entries.config.js');

// 无需编译文件存放目录
const STATIC_PATH = path.join(__dirname, '../', 'project/static');

// 页面生成插件
const HtmlWebpackPluginOptions = {
    inject: true,
    hash: true, // 开启追加哈希的行为
    minify: {
        removeComments: false,
        collapseWhitespace: false
    }
};

// 插件列表
const plugins = [
    // 共享代码
    new webpack.optimize.CommonsChunkPlugin(/*chunkName=*/'vendor', /*filename=*/'vendor.js'),
    // 分离CSS文件
    new ExtractTextPlugin('[name].less.style.css', {
        disable: false,
        allChunks: true
    }),
    // 移动静态文件
    new TransferWebpackPlugin([{
        from: STATIC_PATH
    }])
];

// 入口点对象生成
const entryConfig = entries.reduce((config, item) => {
    config[item.name] = item.entry;

    plugins.push(new HtmlWebpackPlugin(Object.assign({}, HtmlWebpackPluginOptions, {
        filename: `${item.name}.html`,
        template: item.template,
        chunks: ['vendor', item.name]
    })));

    return config;
}, { vendor: ['babel-polyfill', 'vue', 'vue-resource'] });

module.exports = {
    entry: entryConfig,
    module: {
        loaders: [
            {
                // use vue-loader for *.vue files
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                // use babel-loader for *.js files
                test: /\.js$/,
                loader: 'babel',
                // important: exclude files in node_modules
                // otherwise it's going to be really slow!
                exclude: /node_modules/
            },
            {
                // use less-loader for *.less files
                test: /\.less/i,
                loader: ExtractTextPlugin.extract('css!less'),
                exclude: /node_modules/
            },
            {
                // load json file
                test: /\.json$/,
                loader: 'json-loader'
            }, 
            {
                // load image file
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&limit=10000&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                // font file
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream'
            }, {
                test: /\.ijmap(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml'
            }
        ]
    },
    vue: {
        // configure autoprefixer
        autoprefixer: {
            browsers: ['last 2 versions']
        },
        loaders: {
            // css
            css: ExtractTextPlugin.extract("css-loader"),
            // less
            less: ExtractTextPlugin.extract("css-loader!less-loader")
        }
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {

        }
    },
    plugins: plugins
};
