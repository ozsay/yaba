const path = require('path');

const YabaPlugin = require('@yaba/plugin');

module.exports = {
    entry: `./app/index.js`,
    output: {
        path: path.resolve('dist'),
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
};
