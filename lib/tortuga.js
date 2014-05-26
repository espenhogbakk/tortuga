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
