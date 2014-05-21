var tortuga = require('./../lib/tortuga.js');
var expect = require('chai').expect;

function search (search_terms) {
  tortuga.search(search_terms, function (results) { 
    for (var i = 0; i < results.length - 1; i++) {
      //results[i] is a Torrent object, this code verifies
      //results[0].PROPERTY > results[1].PROPERTY > ... > results[n].PROPERTY
      expect(results[i][search_terms.sortType.toLowerCase()])
            .to.be.at.least
            (results[i+1][search_terms.sortType.toLowerCase()])
    };
  });
}
search({query: process.argv[2], sortType: process.argv[3].toUpperCase() /*, category: process.argv[4].toUpperCase()*/ });