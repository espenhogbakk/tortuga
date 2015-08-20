var config = require('./config');
var sort   = require('./sort');
var categories   = require('./categories');
var cheerio = require('cheerio');
var request = require('./util/requests').request;

var Torrent = require('./torrent');
var User = require('./user');

function Top(top_terms) {
  this.categories = typeof categories[top_terms.categories] !== 'undefined' ? categories[top_terms.categories] : 100;
}

Top.prototype.results = function(callback) {
  this._top(0, callback);
};

// Perform a search and return an array of Torrent objects
Top.prototype._top = function(page, callback) {
  page = typeof page !== 'undefined' ? page : 0;
  var url = config.baseUrl
    + '/top/'
    + this.categories;
  
  var self = this;

  request(url, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      callback(self._parseTopPage(data));
    }
  });
};

Top.prototype._parseTopPage = function(html) {
  var results = [];

  $ = cheerio.load(html);
  var rows = $('#searchResult').children('tr');

  rows.each(function(index, row) {
    var title = $('.detLink', row).text().trim();
    if (title === '') { return }

    try {
      var url = config.baseUrl + $('.detLink', row).attr('href');
      var result = {
        'title': title,
        'category': parseInt(/(\d{3})$/g.exec($('td a', row).eq(1).attr('href'))[1], null),
        'url': url,
        'id': parseInt(url.split('/')[4], null),
        'magnet': $('td a', row).eq(3).attr('href'),
        'seeders': parseInt($('td', row).eq(2).text().trim(), null),
        'leechers': parseInt($('td', row).eq(3).text().trim(), null),
        'uploader': new User($('td a', row).eq(5).text().trim())
      };
      results.push(new Torrent(result));
    } catch (e) {
      console.log(e);
    }
  });

  return results;
};

module.exports = Top;
