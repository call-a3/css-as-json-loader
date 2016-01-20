var expect = require('chai').expect;
var build = require('./helpers').build;

describe('css-as-json-loader', function() {

  it('should be able to load a simple CSS file and convert it to valid JSON', function(done) {
    build('basic.css', function(err, content) {
      if (Array.isArray(err)) {
        err.forEach(function(er){console.log(er)});
        expect(err).to.be.empty;
      } else {
        expect(err).to.be.null;
      }
      expect(content).to.be.a.string;
      expect(content).to.not.be.empty;

      done();
    });
  });

});
