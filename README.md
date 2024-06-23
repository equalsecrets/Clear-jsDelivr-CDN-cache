# Cache Clear

Clay Kiln Plugin to Clear Fastly Cache

## Requirements

The Kiln project that is going to use this plugin should set the following environment variable:

```bash
FASTLY_API_KEY=cool-api-key
```

If `FASTLY_API_KEY` is not provided, the plugin will fall back to making unauthenticated HTTP requests
with the `PURGE` method. This is a good option if using IP origin rules for allowing purges.

## Getting Started

1. Install the package as a dependency

```bash
npm install --save cache-clear
```

2. Create a directory for your plugin inside the kiln/plugins directory in the services section

```bash
mkdir PROJECT_DIRECTORY/app/services/kiln/plugins/PLUGIN_NAME
```

3. Create an `index.js` file in the previous directory created, importing main components for the plugin and setting them in the specific `window.kiln` object.

```js
// index.js

const {
  NavButton,
  NavContent,
  CacheClearPlugin
} = require('cache-clear');

// Used to export components to the window element
module.exports = () => {
  window.kiln.navButtons['cache-clear'] = NavButton;
  window.kiln.navContent['cache-clear'] = NavContent;
  window.kiln.plugins['cache-clear'] = CacheClearPlugin;
};
```

4. At `app/services/kiln/index/js` require the previously created file

```js
require('./plugins/cache-clear')();
```
