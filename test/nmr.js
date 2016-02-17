// Main tests
/**
 * Module dependencies
*/
var app = require('../lib/nmr.js');
var str = '';
const assert = require('chai').assert;
const expect = require('chai').expect;
const fs = require('fs');
const http = require('http');
const request = require('request');
const path = require('path');

describe('Entry-script tests', function () {
  before(function (done) {
    app.files(path.join(__dirname, '/lib'))
    app.listen(8080, function (err) {
      done();
    });
  });
  it('should add a module and then run its method', function (done) {
    app.add("test", "test", function () {
      // Do
    });
    expect(app.components.test.test).to.be.a('function')
    done();
  });
  it('should see if app.configure() has correct return values', function (done) {
    app.configure(function (a) {
      expect(a.set).to.not.be.a('undefined')
      expect(a.use).to.not.be.a('undefined')
      expect(a.files).to.not.be.a('undefined')
      expect(a.routes).to.not.be.a('undefined')
      done()
    })
  });
  it('should test whether the server is listenning on port 8080 or not', function (done) {
    // XXX: Need to add routes
    // add file
    done();
    /*
    http.get('http://localhost:8080/nmr.js', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        expect(data).to.equal(fs.readFileSync('lib/nmr.js').toString('utf8'))
        done();
      });
    });*/
  });
});
