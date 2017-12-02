const path = require('path');

const flatten = require('lodash.flatten');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve('./app/renderer');
const BUILD_DIR = path.resolve('./dist');
const MODULES_DIRS = [path.resolve('./node_modules'), path.resolve('../../node_modules')];

const MODULES_CSS = ['codemirror/lib/codemirror.css', 'codemirror/theme/monokai.css', 'typeface-roboto/index.css'];

const ALL_CSS_OPTIONS = flatten(MODULES_DIRS.map(dir => MODULES_CSS.map(css => `${dir}/${css}`)));

module.exports = {
    devtool: 'cheap-module-source-map',
    context: APP_DIR,
    entry: `./index.jsx`,
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        port: 8000,
        historyApiFallback: {
            verbose: true,
            disableDotRule: true,
            rewrites: [
                { from: /bundle\.js$/, to: '/bundle.js' },
                { from: /bundle\.js.map$/, to: '/bundle.js.map' },
            ],
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: MODULES_DIRS.map(dir => new RegExp(dir)),
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: ALL_CSS_OPTIONS,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(gif|png|wav|ico|eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader?name=[name].[ext]',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${APP_DIR}/index.html`,
        }),
    ],
};
