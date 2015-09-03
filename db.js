var config = require('./config.js');
var query = require('pg-query');

query.connectionParameters = config.db_connection_string;

var db = function(req, res, next) {
  res.query = query;
  res.yo = function(who){console.log("yo", who);};
  next();
};

module.exports = db;
