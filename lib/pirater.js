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
 * Torrent
 */

var Torrent = require('./pirater/torrent');
exports.Torrent = Torrent;
