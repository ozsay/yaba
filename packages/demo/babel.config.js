module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                browsers: ['chrome > 50', 'ie >= 11'],
            },
            modules: false,
            loose: true,
        }],
    ],
};
