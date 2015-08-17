var exports = module.exports = {};

/*!
 * Tortuga version
 */

exports.version = '0.1.1';

/*!
 * Configuration
 */

var config = require('./tortuga/config');
exports.config = config;

/*!
 * Search
 */

var Search = require('./tortuga/search');
exports.search = function(query, callback) {
  new Search(query).results(callback);
};

/*!
 * Top
 */
var Top = require('./tortuga/top');
exports.top = function(category, callback) {
  new Top(category).results(callback);
};
