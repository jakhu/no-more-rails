// Main tests
/**
 * Module dependencies
*/
var app = require('../lib/nmr.js');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Entry-script tests', function () {
  it('should test whether the server is listenning on port 8080 or not', function (done) {
    // XXX: Need to add routes
    var err1;
    var err2;
    app.listen(8080, function (err) {
      err1 = err
    });
    assert.typeOf(err1, 'undefined')
    app.listen(8080, function (err) {
      err2 = err;
    });
    assert.typeOf(err2, 'undefined')
    done();
  })
})
