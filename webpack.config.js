const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: [".js", ".scss", ".css"],   //import时允许隐藏的扩展名
        alias:{
            '@': path.resolve(__dirname, 'src'),
        }
    },
    devtool: "eval-cheap-module-source-map",    //开发模式下代码映射模式
    entry: {
        index: './src/main.js',
    },
    output: {
        filename: 'js/app.[hash:8].js',
        chunkFilename: 'js/chuck.[hash:8].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimize: true,                         //压缩代码
        minimizer: [new UglifyJsPlugin({        //压缩代码使用的插件
            uglifyOptions: {
                output: {
                    comments: false,
                }
            }
        })]
    },
    devServer: {
        contentBase: './src/public'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: './src/public/index.html',
            favicon: './src/public/favicon.png',
            hash: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]-[local]-[hash:6]'
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: './images/[name]-[hash:16].[ext]'
                        }
                    }
                ]
            }
        ]
    }
};