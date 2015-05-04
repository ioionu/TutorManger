var express = require('express');
var query = require('../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.query('select * from tm', function(err, rows, res) {
    console.log(rows)
  });
  res.render('index', { title: 'Express', content: 'derp' });
});

module.exports = router;
