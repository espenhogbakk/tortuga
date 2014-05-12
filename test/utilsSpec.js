var expect = require("chai").expect;
var utils = require("../lib/utils.js");

describe("convertBytesToMegabytes()", function() {
  it("should convert bytes to megabytes", function() {
    expect(convertBytesToMegabytes(1010827264)).to.equal(964)
  });
});

describe("convertMegaBytesToBytes()", function() {
  it("should convert megabytes to bytes", function() {
    expect(convertMegabytesToBytes(964)).to.equal(1010827264)
  });
});
