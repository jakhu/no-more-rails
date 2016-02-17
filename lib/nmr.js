/**
 * No more Rails (nmr)
 * Copyright(c) 2016 Kishan Sambhi (Gum-Joe)
 * MIT Licensed
*/

'use strict'

/**
 * Module dependencies
*/
const debug = require('debug')('nmr');
const express = require('express');
const normalizePort = require('./port.js').normalize;
const http = require('http');
var app = exports;
var ser = express();
var config = {};
app.components = {};

// Express methods
app.set = ser.set;
app.get = ser.get;
app.post = ser.post;
app.use = ser.use;

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
 * @param callback {Function} Callback to run and provide errors to
 * @public
*/
app.listen = function listen(port, callback) {
  debug('creating server on port %s...', port)
  // If no port
  // Normalize port - lib/
  var p;
  if (typeof port === 'number' || typeof port === 'string') {
    p = normalizePort(port) || config.port || 8080;
    if(typeof callback !== 'function') {
      throw new TypeError('Callback is not a function')
    }
  } else {
    if (!config.port) {
      throw new Error("Port is not set");
    } else {
      p = config.port;
    }
    if(typeof port !== 'function') {
      throw new TypeError('Callback is not a function')
    }
  }
  app.server = http.createServer(ser);
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
 * @param plugin {Module String} The module to use as a plugin or name of component
 * @param name {String} What to store the plugin as or the task name
 * @param action {Function} Action to do on run (component)
*/
app.add = (plugin, task, action) => {
  if (typeof plugin === 'string') {
    if (task) {
      debug("adding task %s to component %o", task, plugin)
      if (!action) {
        throw new Error("Please specify a task");
      } else {
        if (plugin in app.components) {
          app.components[plugin] = app.components[plugin] + {[task]: action};
        } else {
          app.components[plugin] = {[task]: action};
        }
      }
    } else {
      debug("adding component %s", plugin)
      app.components[plugin] = "Requires actions"
    }
  } else {
    debug("adding plugin %s", task)
    app.plugins[task] = plugin;
  }
}
