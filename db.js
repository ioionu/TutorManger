var config = require('./config.js');
var query = require('pg-query');


//var conn_string = "postgres://efrvxigvyygabp:s0RSfJQZhjxoDAwm396TWHsZfY@ec2-107-22-161-155.compute-1.amazonaws.com:5432/d6jt69ereqi65r"
query.connectionParameters = config.db_connection_string;

var db = function(req, res, next) {
  res.query = query;
  next();
};

module.exports = db;
