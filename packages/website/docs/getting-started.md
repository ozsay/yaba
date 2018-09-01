---
id: getting-started
title: Getting Started
---

## Download and Install Yaba Application

Download the application from the [download page](/download) and install it via the downloaded `dmg` file.

## Install Yaba Plugin

Install Yaba Plugin via `npm` or `yarn`.

```bash
  npm i --save-dev @yaba/plugin
```

```bash
  yarn add --dev @yaba/plugin
```

## Configure Yaba Plugin

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
## Run Yaba Application

In order for the plugin to work, Yaba application must run first. Open it like a regular MacOS application.

> If Yaba application is not running, the plugin doesn't do anything.

## Build Your Project

Run your build command. Usually a `webpack` command or an `npm` script.