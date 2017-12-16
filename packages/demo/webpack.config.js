const path = require('path');
const tmp = require('tmp');

const YabaPlugin = require('@yaba/plugin');

module.exports = ({ tmpFolder = true } = {}) => ({
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
                test: /\.html$|.gif$|.png$|.ico$/,
                exclude: /node_modules/,
                use: 'file-loader?name=[name].[ext]',
            },
        ],
    },
    plugins: [
        new YabaPlugin(),
    ],
});
