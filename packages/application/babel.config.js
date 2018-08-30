const pkg = require('./package.json');

module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                electron: pkg.devDependencies.electron,
            },
            modules: false,
            loose: true,
        }],
        '@babel/preset-react',
    ],
};
