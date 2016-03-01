// import path from 'path';
import postcss from 'postcss';
import {SourceMapConsumer} from 'source-map';

import postcssToJSON from './postcssToJSON';

/**
 * A loader that parses CSS into a JSON structure matching the PostCSS API.
 */
module.exports = function(source, map) {
  if ( this.cacheable ) this.cacheable();

  let loader = this;
  let done   = this.async();
  let file   = this.resourcePath;
  // console.log('file: ' + file);
  let opts = {
    from: file,
    to:   file,
    map:  {inline:false},
  };

  if (map !== undefined) {
    let actual_map = new SourceMapConsumer(JSON.parse(map.toString()));
    opts.map = {
      inline:     false,
      annotation: false,
      prev: actual_map,
    };
  }

  postcss().process(source, opts).then(function(result) {
    result.warnings().forEach(function (msg) {
      loader.emitWarning(msg.toString());
    });

    let json = postcssToJSON(result.root);

    done(undefined, JSON.stringify(json, undefined, "\t"), undefined);
  }).catch(function (error) {
    if (error.name === 'CssSyntaxError') {
      loader.emitError(error.toString());
    }
    done(error);
  });

}
