process.traceDeprecation = true

const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pkg = require('../package.json');

// 当前是否是开发环境
const __DEV__ = process.env.NODE_ENV === 'development';
// const __DEV__ = false;
// 入口配置文件
const entries = require('./entries.config.js');

// 无需编译文件存放目录
const STATIC_PATH = path.join(__dirname, '../src/static');
// 目标输出
const DIST_PATH = `dist/${process.env.NODE_ENV}`;

// 页面生成插件
const HtmlWebpackPluginOptions = {
    inject: true,
    hash: true, // 开启追加哈希的行为
    minify: {
        removeComments: true,
        collapseWhitespace: false
    }
};

// 插件列表
const plugins = [
    // 兼容老版本Webpack
    new webpack.LoaderOptionsPlugin({
        debug: true,
        progress: true,
        sassLoader: {
            data: `$env: ${process.env.NODE_ENV}`
        }
    }),
    // 删除生成的文件
    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin([DIST_PATH], {
        root: path.join(__dirname, '../'),
        verbose: true,
        dry: false,
        exclude: [],
    }),
    // 文件头部说明
    new webpack.BannerPlugin({ banner: `Powered by FE @ bmbstack team Version ${pkg.version}`, raw: false, entryOnly: true }),
    // 分离js 文件
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor.js' }),
    // 分离CSS文件
    new ExtractTextPlugin({
        filename: 'css/[name].sass.css',
        disable: false,
        allChunks: true
    }),
    // 移动静态文件
    new CopyWebpackPlugin([{
        from: STATIC_PATH
    }]),
];

// 入口点对象生成
const entryConfig = entries.reduce((config, item) => {
    config[item.name] = item.entry;

    plugins.push(new HtmlWebpackPlugin(
        Object.assign(
            {/* new object */}, 
            HtmlWebpackPluginOptions, 
            {
                filename: `${item.name}.html`,
                template: item.template,
                favicon: './src/resources/favicon.png',
                chunks: ['vendor', item.name],
                chunksSortMode: 'auto',
                title: item.title || '这里是标题',
                version: pkg.version, 
                description: item.description,
            }
        )
    ));

    return config;
}, {
    vendor: ['babel-polyfill', 'axios'],
});

console.info('Entries:');
Object.keys(entryConfig).forEach(key  => console.info(key + '->' + entryConfig[key]));

module.exports = {
    entry: entryConfig,
    output: {
        path: path.join(__dirname, '../', DIST_PATH),
        filename: '[name].bundle.js',
        publicPath: '',
    },
    module: {
        rules: [
            {
                // use babel-loader for *.js or *.jsx files
                test: /\.js[x]?$/,
                //loaders: __DEV__ ? ['react-hot'].concat(['babel']) : ['babel'],
                use: ['babel-loader'],
                // important: exclude files in node_modules
                // otherwise it's going to be really slow!
                exclude: /node_modules|\.lazy\.js/
            },
            {
                // separate files, bundle.js will be minify
                test: /\.lazy\.js$/i,
                use: ['bundle-loader?lazy&name=[name]', 'babel-loader'],
            },
            {
                // use css-loader for *.css files
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({ 
                    fallback: 'style-loader',
                    use: 'css-loader',
                    // publicPath: 'css/'
                }),
                exclude: /node_modules/
            },
            {
                // use sass-loader for *.sass files
                test: /\.sass/i,
                use: ExtractTextPlugin.extract({ 
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: `css-loader?modules&localIdentName=${ __DEV__ ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64]' }`,
                        },
                        'postcss-loader',
                        `sass-loader`
                    ],
                    // publicPath: 'css/'
                }),
                exclude: /node_modules/
            },
            {
                // load image file
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    // &publicPath=&outputPath=
                    'file-loader?hash=sha512&digest=hex&limit=10240&name=img/[name].[ext]?[hash]'
                ]
            },
            {
                // font file
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: [ 'url-loader?limit=10000&minetype=application/font-woff' ]
            }, 
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: [ 'url-loader?limit=10000&minetype=application/font-woff' ]
            }, 
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [ 'url-loader?limit=10000&minetype=application/octet-stream' ]
            }, 
            {
                test: /\.ijmap(\?v=\d+\.\d+\.\d+)?$/,
                use: [ 'url-loader?limit=10000&minetype=application/font-woff' ]
            }, 
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [ 'file-loader' ]
            }, 
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [ 'url-loader?limit=10000&minetype=image/svg+xml' ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules',
        ]
    },
    externals: {
        // 数学公式编译器对象
        // 'MathQuill': 'MathQuill',
        // 这个不用我说了吧? 版本是1.7.1, 不然Android要崩溃
        // '$': 'jQuery',
        // 2.2.1的vue
        'vue': 'Vue',
        'rxjs': 'Rx',
    },
    plugins: plugins
};
