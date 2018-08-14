const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const YabaPlugin = require('@yaba/plugin');

const APP_DIR = path.resolve('./app/renderer');
const BUILD_DIR = path.resolve('./dist');
const MODULES_DIRS = [path.resolve('./node_modules'), path.resolve('../../node_modules')];

module.exports = {
    mode: 'development',
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
                test: /.*\.css/,
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
        new YabaPlugin(),
    ],
};
