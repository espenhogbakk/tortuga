var expect = require('chai').expect;
var bytes = require('../../../lib/tortuga/util/bytes');

describe('convertBytesToMegabytes()', function() {
  it('should convert bytes to megabytes', function() {
    expect(bytes.convertBytesToMegabytes(1010827264)).to.equal(964)
  });
});

describe('convertMegaBytesToBytes()', function() {
  it('should convert megabytes to bytes', function() {
    expect(bytes.convertMegabytesToBytes(964)).to.equal(1010827264)
  });
});
