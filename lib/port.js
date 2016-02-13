/**
 * No more Rails (nmr)
 * Copyright(c) 2016 Kishan Sambhi (Gum-Joe)
 * MIT Licensed
*/

'use strict'

/**
 * Module dependencies
*/
// NON

/**
 * Normalize the port
 * @param port {Number} The number or string to normalize
*/
exports.normalize = function normalize(port, callback) {
  if (typeof port === "number") {
    if (callback) {
      callback(port)
    } else {
      return port;
    }
  } else if (typeof port == "string") {
    if (callback) {
      callback(parseInt(port))
    } else {
      return parseInt(port);
    }
  } else {
    if (callback) {
      callback(null, new TypeError('Type of value given for port is not a string or number!'))
    } else {
      throw new TypeError('Type of value given for port is not a string or number!')
    }
  }
}
