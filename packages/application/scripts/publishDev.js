const path = require('path');

const builder = require('electron-builder');

const pkgJson = require(path.resolve(__dirname, '../dist/package.json'));

builder
    .build({
        publish: 'always',
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
                provider: 's3',
                endpoint: 'http://localhost:9000',
                bucket: 'test',
            },
        },
    })
    .catch(console.error);
