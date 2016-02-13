// Checks port.js
/**
 * Module dependencies
*/
var port = require('../lib/port.js');
var assert = require('chai').assert;
var expect = require('chai').expect;
var test = 8080
var test2 = "8080"
var test3 = true;

describe('port.js tests', function () {
  it('should return 8080 as a number', function (done) {
    port.normalize(test, function (port, err) {
      assert.typeOf(port, 'number');
    });
    done();
  });
  it('should return "8080" as a number', function (done) {
    port.normalize(test2, function (port, err) {
      assert.typeOf(port, 'number');
    });
    done();
  });
  it('should return an error', function (done) {
    port.normalize(test3, function (port, err) {
      expect(err).to.not.be.a('number');
    });
    done();
  });
});
