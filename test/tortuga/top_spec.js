var expect = require('chai').expect;
var nock = require('nock');

var fixture = require('../test_helper').fixture;

var config = require('../../index').config;
var sort   = require('../../lib/tortuga/sort');
var categories   = require('../../lib/tortuga/categories');
var Top = require('../../lib/tortuga/top');

describe('Top', function() {

	var top = new Top({categories:'VIDEO'});

	describe('.results', function() {
		it('should have a default value', function() {
			var s = new Top({categories:"FAKE_CATEGORY"});
			expect(s.categories).to.equal(100);
		});

		it('should have a correct values', function(done) {
			var scope = nock(config.baseUrl)
			.get('/top/'+categories.VIDEO)
			.replyWithFile(600, __dirname + '/../fixtures/top.html');
			
			top.results(function(results) {
				expect(results).to.be.a('array');
				expect(results).to.have.length(100);
				done();
			});
		});
	});

	describe('._parseTopPage', function() {
		it('should return an array with Torrent objects', function(done
			) {
			fixture('top.html', function(html) {
				var results = top._parseTopPage(html)
				expect(results).to.be.a('array');
				expect(results).to.have.length(100);
				var result = results[0];
				expect(result.title).to.equal('Mad Max: Fury Road (2015) 1080p BrRip x264 - YIFY');
				expect(result.uploader.username).to.equal('YIFY');
				expect(result.seeders).to.equal(13591);
				expect(result.leechers).to.equal(7180);
				expect(result.magnet).to.equal('magnet:?xt=urn:btih:13241fe16a2797b2a41b7822bde970274d6b687c&dn=Mad+Max%3A+Fury+Road+%282015%29+1080p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969');
				expect(result.category).to.equal(207);
				done();
			});
		});
	});
});

