var expect = require('chai').expect;

var config = require('../../index').config;
var User = require('../../lib/tortuga/user');

describe('User', function() {
  var user = new User('foo');

  describe('.username', function() {
    it('should return the username', function() {
      expect(user.username).to.equal('foo');
    });
  });

  describe('.profileUrl', function() {
    it('should return the profile url', function() {
      expect(user.profileUrl).to.equal(config.baseUrl + '/user/foo');
    });
  });
});
