var config = require('./config');
var sort   = require('./sort');
var cheerio = require('cheerio');
var request = require('./util/requests').request;

var Torrent = require('./torrent');
var User = require('./user');

function Search(search_terms) {
  this.query = typeof search_terms.query !== 'undefined' ? search_terms.query : search_terms;
  this.sortType = typeof search_terms.sortType !== 'undefined' ? sort[search_terms.sortType] : sort.RELEVANCE;
  this.categories = typeof search_terms.categories !== 'undefined' ? sort[search_terms.categories] : [0];
}

Search.prototype.results = function(callback) {
  this._search(0, callback);
};

// Perform a search and return an array of Torrent objects
Search.prototype._search = function(page, callback) {
  page = typeof page !== 'undefined' ? page : 0;
  var url = config.baseUrl
    + '/search/'
    + encodeURIComponent(this.query)
    + '/' + page
    + '/' + this.sortType
    + '/' + this.categories;

  var self = this;

  request(url, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      callback(self._parseSearchPage(data));
    }
  });
};

Search.prototype._parseSearchPage = function(html) {
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

module.exports = Search;
