This is the `webpack` 4 plugin used to send bundle data to the <a href="https://yaba.io" target="_blank">Yaba application</a>.

This document will provide simple webpack configuration. 
You should check the <a href="https://yaba.io/docs/getting-started" target="_blank">documentation</a> for further details.

## Install the Yaba Plugin

Install Yaba Plugin via `npm` or `yarn`.

```bash
  npm i --save-dev @yaba/plugin
```

```bash
  yarn add --dev @yaba/plugin
```

## Configure the Yaba Plugin

webpack.config.js
```js
const YabaPlugin = require('@yaba/plugin');

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new YabaPlugin()
  ]
}
```

> If Yaba application is not running, the plugin doesn't do anything.
