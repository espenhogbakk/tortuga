var fs = require("fs");

fixture = function(file, callback) {
  fs.readFile(__dirname + '/fixtures/' + file, function (err, data) {
    if (err) {
      throw err;
    }
    callback(data.toString());
  });
};

module.exports = fixture;
