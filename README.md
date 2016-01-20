# css-as-json-loader
Webpack loader that loads CSS and emits it as JSON


## Installation

[![css-as-json-loader on NPM](https://nodei.co/npm/css-as-json-loader.png?small=true)][npm]

## Usage

Put css-as-json-loader in as a loader in webpack.config.js.
This loader is best combined with json-loader, as this plugin itself does not output a valid javascript module.
```javascript
// in webpack.config.js
...
loaders: [{
  test: /\.css$/,
  loader: 'json!css-as-json'
}]
```

## Example

path/to/some.css

```css
a, b {
  prop: value;
}
@media screen {
  a {
    prop: other-value;
  }
}
```

example.js

```javscript
var css = require('path/to/some.css');

// or ES2015-style
import css from 'path/to/some.css';

//css is now equal to the following:
css == {
  type: 'root',
  origin: {
    source: 'path/to/some.css',
    
  },
  nodes: []
}
```
