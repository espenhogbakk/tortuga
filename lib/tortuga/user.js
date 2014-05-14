var config = require('./config');

function User(username) {
  this.username = username;
  this.profileUrl = this._profileUrl();
}

User.prototype._profileUrl = function() {
  return config.baseUrl + '/user/' + this.username;
};

module.exports = User;
