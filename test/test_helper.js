var fs = require("fs");

exports.fixture = function(file, callback) {
  fs.readFile(__dirname + '/fixtures/' + file, function (err, data) {
    if (err) {
      throw err;
    }
    callback(data.toString());
  });
};
