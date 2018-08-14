const path = require('path');
const tmp = require('tmp');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const YabaPlugin = require('@yaba/plugin');

module.exports = ({ tmpFolder = true } = {}) => ({
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: [
        './app/index.js',
        './app/index.html',
    ],
    output: {
        path: tmpFolder ? tmp.dirSync({ unsafeCleanup: true }).name : path.resolve('dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /standalone\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
            {
                test: /font-awesome\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
            {
                test: /inline\.css/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
            {
                test: /\.html$|.gif$|.png$|.ico$/,
                exclude: /node_modules/,
                use: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                    },
                }],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new YabaPlugin(),
    ],
});
