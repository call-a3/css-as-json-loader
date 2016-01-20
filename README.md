# css-as-json-loader

<!--[![Build Status][travis-shield]][travis]-->
<!--[![Coverage Status][coveralls-shield]][coveralls]-->
[![Dependency Status][dependencies-shield]][dependencies]
[![devDependency Status][dependencies-dev-shield]][dependencies-dev]

<!--[![Develop Status][travis-shield-develop]][travis]-->
<!--[![Develop Coverage Status][coveralls-shield-develop]][coveralls]-->

Webpack loader that loads CSS and emits it as JSON


## Installation

[![css-as-json-loader on NPM][npm-badge]][npm]

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



[npm]:                     https://www.npmjs.com/package/css-as-json-loader
[npm-badge]:               https://nodei.co/npm/css-as-json-loader.png?small=true
[travis]:                  https://travis-ci.org/call-a3/css-as-json-loader
[travis-shield]:           https://img.shields.io/travis/call-a3/css-as-json-loader.svg
[travis-shield-develop]:   https://img.shields.io/travis/call-a3/css-as-json-loader/develop.svg?label=develop%20build
[coveralls]:               https://coveralls.io/r/call-a3/css-as-json-loader
[coveralls-shield]:        https://img.shields.io/coveralls/call-a3/css-as-json-loader.svg
[coveralls-shield-develop]:https://img.shields.io/coveralls/call-a3/css-as-json-loader/develop.svg?label=develop%20coverage
[dependencies]:            https://david-dm.org/call-a3/css-as-json-loader
[dependencies-dev]:        https://david-dm.org/call-a3/css-as-json-loader#info=devDependencies
[dependencies-shield]:     https://img.shields.io/david/call-a3/css-as-json-loader.svg
[dependencies-dev-shield]: https://img.shields.io/david/dev/call-a3/css-as-json-loader.svg
