const path = require('path');
const tmp = require('tmp');

const YabaPlugin = require('@yaba/plugin');

module.exports = ({ tmpFolder = true } = {}) => ({
    entry: `./app/index.js`,
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
        ],
    },
    plugins: [
        new YabaPlugin(),
    ],
});
