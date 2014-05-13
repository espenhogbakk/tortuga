var expect = require('chai').expect;
var utils = require('../lib/pirater/utils');

describe('convertBytesToMegabytes()', function() {
  it('should convert bytes to megabytes', function() {
    expect(utils.convertBytesToMegabytes(1010827264)).to.equal(964)
  });
});

describe('convertMegaBytesToBytes()', function() {
  it('should convert megabytes to bytes', function() {
    expect(utils.convertMegabytesToBytes(964)).to.equal(1010827264)
  });
});
