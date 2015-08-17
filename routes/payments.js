var express = require('express');
var paypal = require('paypal-rest-sdk');
var passport = require('passport');
var config = require('../config');
var router = express.Router();


/* GET payment index. */
router.get('/', function(req, res, next) {
  
  if(!req.isAuthenticated()) {
    res.send(401);
  }

  res.query('select ' +
    'payments.id, payments.description, payments.amount, payments.status ' +
    'from payments ' +
    'join lessons ' +
    'on payments.lessonid = lessons.id ' +
    'where lessons.student = $1::integer ' +
    'or lessons.tutor = $1::integer;',
    [req.user.id],
    function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log(rows);
    res.json(rows);
  });
});

router.post('/', function(req, res, next){

});

/* GET payment instance */
router.get('/:id', function(req, res, next) {
  console.log("get payment:", req.params.id);
  res.query('select * from payments where id = $1::integer;', [req.params.id], function(err, rows, results) {
    if(err) {
      console.log("error:", err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log("row:", rows[0], results);
    var p = rows[0];
    if(p.status === 'paid') {
      p.paid=true;
    } else {
      p.paid=false;
    }
    res.json(p);
  });
});

router.post('/:id', function(req, res, next) {

});


module.exports = router;
