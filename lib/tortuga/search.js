var config = require('./config');
var sort   = require('./sort');
var request = require('request');
var cheerio = require('cheerio');

var Torrent = require('./torrent');
var User = require('./user');

function Search(query, sortType, categories) {
  this.query = query
  this.sortType = typeof sortType !== 'undefined' ? sortType : sort.RELEVANCE;
  this.categories = typeof categories !== 'undefined' ? categories : [0];
}

Search.prototype.results = function(callback) {
  this._search(0, callback);
}

// Perform a search and return an array of Torrent objects
Search.prototype._search = function(page, callback) {
  var page = typeof page !== 'undefined' ? page : 0;
  var url = config.baseUrl
    + '/search/'
    + encodeURIComponent(this.query)
    + '/' + page
    + '/' + this.sortType
    + '/' + this.categories

  var self = this;

  // Perform the request
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(self._parseSearchPage(body));
    } else {
      callback(error, response);
    }
  });
};

Search.prototype._parseSearchPage = function(html) {
  var results = [];

  $ = cheerio.load(html);
  var rows = $('#searchResult').children('tr');

  rows.each(function(index, row) {
    var title = $('.detLink', row).text().trim();
    if (title === '') return;

    try {
      var url = config.baseUrl + $('.detLink', row).attr('href');
      var result = {
        'title': title,
        'category': parseInt(/(\d{3})$/g.exec($('td a', row).eq(1).attr('href'))[1]),
        'url': url,
        'id': parseInt(url.split('/')[4]),
        'magnet': $('td a', row).eq(3).attr('href'),
        'seeders': parseInt($('td', row).eq(2).text().trim()),
        'leechers': parseInt($('td', row).eq(3).text().trim()),
        'uploader': new User($('td a', row).eq(5).text().trim())
      }
      results.push(new Torrent(result));
    } catch (e) {
      console.log(e);
    }
  });

  return results;
};

module.exports = Search;
