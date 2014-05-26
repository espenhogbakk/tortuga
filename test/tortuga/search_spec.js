var expect = require('chai').expect;
var nock = require('nock');

var fixture = require('../test_helper').fixture;

var config = require('../../index').config;
var sort   = require('../../lib/tortuga/sort');
var Search = require('../../lib/tortuga/search');

describe('Search', function() {

  var search = new Search("ubuntu");

  describe('.sortType', function() {
    it('should have a default value', function() {
      expect(search.sortType).to.equal(sort.RELEVANCE);
    });
  });

  describe('.categories', function() {
    it('should have a default value', function() {
      expect(search.categories[0]).to.equal(0);
    });
  });

  describe('.results', function() {
    it('should return an array of Torrent object from the given query', function(done) {
      var scope = nock(config.baseUrl)
        .get('/search/ubuntu/0/99/0')
        .replyWithFile(200, __dirname + '/../fixtures/search.html');

      search.results(function(results) {
        expect(results).to.be.a('array');
        expect(results).to.have.length(30);
        done();
      });
    });

    for (var type in sort) {
      (function sortTest(type){
        it('should be sorted in descending order relative to ' + type, function (done) {
          var s = new Search({query: "Ubuntu", sortType: type});
          expect(s.sortType).to.equal(sort[type]);
          done();
        });
      })(type)
    }
  });

  describe('._parseSearchPage', function() {
    it('should return an array with Torrent objects', function(done) {
      fixture('search.html', function(html) {
        var results = search._parseSearchPage(html)
        expect(results).to.be.a('array');
        expect(results).to.have.length(30);

        var result = results[0];
        expect(result.title).to.equal('Ubuntu 12.04 ReMastered By Linear_{CoderDISTRIBUTION}');
        expect(result.uploader.username).to.equal('Linear');
        expect(result.seeders).to.equal(1);
        expect(result.leechers).to.equal(2);
        expect(result.magnet).to.equal('magnet:?xt=urn:btih:895649af5c8311d16a1857144d9be811bd59dfab&dn=Ubuntu+12.04+ReMastered+By+Linear_%7BCoderDISTRIBUTION%7D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker-ccc.de%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337');
        expect(result.category).to.equal(303);
        done();
      });
    });
  });
});
