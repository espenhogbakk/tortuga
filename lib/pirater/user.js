var config = require('./config');

function User(username) {
  this.username = username;
  this.profileUrl = this._profileUrl();
}

User.prototype._profileUrl = function() {
  return config.base_url + '/user/' + this.username;
};

module.exports = User;
