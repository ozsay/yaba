const path = require('path');
const tmp = require('tmp');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const YabaPlugin = require('@yaba/plugin');

module.exports = ({ tmpFolder = true } = {}) => ({
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
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
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
        ],
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new YabaPlugin(),
    ],
});
