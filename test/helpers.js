var fs = require('fs');
var path = require('path');

var MemoryFS = require('memory-fs');
var webpack = require('webpack');
var expect = require('chai').expect;

module.exports.build = function(file, callback) {
  var ENTRY_PATH = path.join(__dirname, file);
  var BUNDLE_PATH = ENTRY_PATH.substring(0, ENTRY_PATH.length - path.extname(ENTRY_PATH).length) + '.js';

  if (fs.existsSync(BUNDLE_PATH)) {
    fs.unlinkSync(BUNDLE_PATH);
  }

  var mfs = new MemoryFS();
  var compiler = webpack({
    cache: true,
    entry: ENTRY_PATH,
    output: {
      filename: BUNDLE_PATH
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: 'babel!' + path.resolve(path.join(__dirname, '..'))
      }]
    }
  });
  // compiler.outputFileSystem = mfs;

  compiler.run(function(err, stats) {
    if (err !== null) {
      callback(err);
      return;
    }

    stats = stats.toJson({
      hash: false,
      version: false,
      timings: false,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: true,
      cached: false,
      reasons: false,
      source: false,
      errorDetails: true,
      chunkOrigins: false,
    });

    if (stats.errors.length > 0 || stats.warnings.length > 0) {
      var errs = Array.prototype.concat.apply(stats.errors, stats.warnings);
      callback(errs);
      return;
    }

    callback(null, fs.readFileSync(BUNDLE_PATH, {encoding: 'utf-8'}));
  });
};
