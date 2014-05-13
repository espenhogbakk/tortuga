var exports = module.exports = {};

/*!
 * Pirater version
 */

exports.version = '0.1.0';

/*!
 * Configuration
 */

var config = require('./pirater/config');
exports.config = config;

/*!
 * Search
 */

var Search = require('./pirater/search');
exports.search = function(query, callback) {
  new Search(query).results(callback)
};
