var express = require('express');
var query = require('../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  query('select * from payment', function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log(rows)
    res.render('payment-index', {title: 'Payments', rows: rows});
  });
  //`res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){

});

module.exports = router;
