var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var tortuga = require('../lib/tortuga');
var Search = require('../lib/tortuga/search');

describe('#search', function() {

  it('returns a search result', function () {
    sinon.stub(tortuga, 'search');
    tortuga.search('ubuntu', sinon.spy());

    expect(tortuga.search).to.have.been.calledOnce;
    expect(tortuga.search).to.have.been.calledWith('ubuntu');
  });

});
