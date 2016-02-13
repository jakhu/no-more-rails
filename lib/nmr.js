/**
 * No more Rails (nmr)
 * Copyright(c) 2016 Kishan Sambhi (Gum-Joe)
 * MIT Licensed
*/

'use strict'

/**
 * Module dependencies
*/
var debug = require('debug')('nmr:application');
/**
 * App object
 * Stores middleware and varibles about the app + routes
*/
var app = exports = module.exports = {};
var config = {};
var normalizePort = require('./port.js').normalize;
var http = require('http');
/**
 * Set the port for the server to run on
 * @param port {Number} The number for the port
*/
app.port = function port(port) {
  // Normalize
  config.port = normalizePort(port);
  // Norma
}
/**
 * Create the server
 * @param port {Number} The port to run on
 * @return {http.Server}
 * @public
*/
app.listen = function listen(port, callback) {
  debug('creating server on port %s...', port)
  // If no port
  // Normalize port - lib/
  var p = normalizePort(port);
  if(typeof callback !== 'function') {
    throw new TypeError('Callback is not a function')
  }
  var server = http.createServer(callback)
  server.listen(p)
  debug('server now listenning on port %s...', port)
}
