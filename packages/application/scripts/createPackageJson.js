const path = require('path');
const fs = require('fs');

const original = require(path.resolve(__dirname, '../package.json'));

const template = {
    name: 'yaba',
    version: original.version,
    description: original.description,
    author: original.author,
    main: 'index.js',
    devDependencies: {
        electron: original.devDependencies.electron,
    },
};

fs.writeFileSync('./dist/package.json', JSON.stringify(template, null, 2));
