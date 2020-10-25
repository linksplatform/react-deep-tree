// require
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
console.log('IS DEV:', isDev);

//Function
function getName(expansion){
    return isDev ? `[name].${expansion}` : `[name].[hash].${expansion}`
}

function getBabelUse(presets, loader = 'babel-loader'){
    return {
        loader: 'babel-loader',
        options: {
            presets: presets,
        }
    }
}

function addMapCard(card){
    return isDev ? card : '';
}

//config
const webpackConfig = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',

    entry: ['@babel/polyfill', './scripts/main.js'],
    output: {
        filename: getName('js'),
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
        }
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer:  [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin(),
        ],
    },

    devServer: {
        port: 7000
    },

    devtool: addMapCard('eval-source-map'),

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),

        new CopyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname, 'src/images/'),
                    to: path.resolve(__dirname, 'dist/images/'),
                },
                ],
            options: {
                concurrency: 100,
            },
        }),

        new MiniCssExtractPlugin({
            filename: getName('css'),
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|webp|svg|gif|ttf|woff|woff2)$/,
                use: ['file-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: getBabelUse(['@babel/preset-env'])
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: getBabelUse(['@babel/preset-env', '@babel/preset-typescript'])
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: getBabelUse(['@babel/preset-env', '@babel/preset-react'])
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            disable: true,
                        },
                    },
                ],
            }

        ]
    },
}

module.exports = webpackConfig;