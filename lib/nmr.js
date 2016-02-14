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
var app = exports = module.exports = express();
var config = {};
const normalizePort = require('./port.js').normalize;
const http = require('http');
const express = require('express');
/**
 * Set the port for the server to run on
 * @param port {Number} The number for the port
*/
app.port = function port(port) {
  // Normalize
  config.port = normalizePort(port);
}
/**
 * Create the server
 * @param port {Number} The port to run on
 * @return http.createServer()
 * @public
*/
app.listen = function listen(port, callback) {
  debug('creating server on port %s...', port)
  // If no port
  // Normalize port - lib/
  var p = normalizePort(port) || config.port || 8080;
  if(typeof callback !== 'function') {
    throw new TypeError('Callback is not a function')
  }
  app.server = http.createServer(app);
  app.server.listen(p, callback);
  debug('server now listening on port %s...', port);
  return app.server;
}
/**
 * Allocate routes from file or required file
 * @param path {String} Route path to allocate
 * @param file File with routes
 * @param callback {Function} Callback to use
 * @public
*/
app.routes = (path, file, callback) => {
  try {
    if (typeof file !== 'string') {
      debug("adding routes as the path %s", path)
      app.set(path, file);
    } else {
      debug("adding routes from file %s as the path %o", file, path)
      app.set(path, require(file));
    }
  } catch (e) {
    if (callback) {
      return callback(e)
    } else {
      throw e;
    }
  }
}
/**
 * Allocate files to server statically
 * @param path {String} Path to use
 * @param callback {Function} Callback to use
 * @public
*/
app.files = (path, callback) => {
  debug("adding file from path %s as static files", path)
  try {
    app.use(express.static(path));
  } catch (e) {
    if (callback) {
      return callback(e)
    } else {
      throw e;
    }
  }
}
/**
 * Configure the app
 * @param fun {Function} The function with the configure bit in
*/
app.configure = (fun) => {
  // Set Object
  var obj = {set: app.set, use: app.use, files: app.files, routes: app.routes};
  fun(obj)
}
/**
 * Add plugins
 * @param plugin {Module} The module to use as a plugin
 * @param name {String} What to store the plugin as
*/
app.plugin = (plugin, name) => {
  debug("adding plugin %s", name)
  app[name] = plugin;
}
/**
 * Add components
 * @param name {Object String} The config (Object) for the component or name for the component
 * @param task {String} Name of the task
 * @param action {Function} Action to do on run
*/
app.component = (name, task, action) => {
  if (task) {
    debug("adding task %s to component %o", task, name)
    if (!action) {
      throw new Error("Please specify a task");
    } else {
      app.components[name][task] = action;
    }
  } else {
    debug("adding component %s", name)
    app.components[name] = "Requires actions"
  }
}
