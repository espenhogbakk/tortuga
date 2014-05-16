var tortuga = require('./../lib/tortuga.js');
function search (search_terms) {
	tortuga.search(search_terms, function (results) {
		results.forEach(function (torrent) {
			console.log(torrent.bytes + ',  ' + torrent.title);
		});
	});
}
search({query: process.argv[2], sortType: process.argv[3]});