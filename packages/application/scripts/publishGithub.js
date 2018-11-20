const path = require('path');

const builder = require('electron-builder');

const pkgJson = require(path.resolve(__dirname, '../dist/package.json'));

builder
    .build({
        publish: 'onTagOrDraft',
        config: {
            appId: 'com.yaba.io',
            mac: {
                category: 'public.app-category.developer-tools',
                icon: '../icon/mac/icon.icns',
            },
            directories: {
                output: `release/${pkgJson.version}`,
                app: 'dist',
            },
            publish: {
                provider: 'github',
                owner: 'ozsay',
                private: true,
            },
        },
    })
    .catch(console.error);
