var express = require('express');
var paypal = require('paypal-rest-sdk');
var config = require('../config');
var router = express.Router();


/* GET payment index. */
router.get('/payments', function(req, res, next) {
  res.query('select * from payments', function(err, rows, results) {
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
router.get('/payments/:id', function(req, res, next) {
  //console.log(req.params.id);
  res.query('select * from payments where id = $1::integer;', [req.params.id], function(err, rows, results) {
    if(err) {
      console.log("error:", err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log("row:", rows[0], results);
    res.json(rows[0]);
  });
});

router.post('/payments/:id', function(req, res, next) {




});

/**
 * Transaction
 */

router.post('/transactions', function(req, res, next){

  //TODO: confirm user has access to this payment
  var card_data = {
    type: "visa",
    number: req.body.number,
    expire_month: req.body.expire_month,
    expire_year: req.body.expire_year,
    cvv2: req.body.cvv2,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };


  var paypal_config = {
    'mode': config.paypal.configure.mode,
    'client_id': config.paypal.configure.client_id,
    'client_secret': config.paypal.configure.client_secret,
  };

  console.log("cc", card_data);

  // build transaction
  var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "credit_card",
          "funding_instruments": [{
              "credit_card": {
                  "type": "visa",
                  "number": card_data.number,
                  "expire_month": card_data.expire_month,
                  "expire_year": card_data.expire_year,
                  "cvv2": card_data.cvv2,
                  "first_name": card_data.first_name,
                  "last_name": card_data.last_name,
                  /*
                  "billing_address": {
                      "line1": "52 N Main ST",
                      "city": "Johnstown",
                      "state": "OH",
                      "postal_code": "43210",
                      "country_code": "US"
                  }
                  */
              }
          }]
      },
      "transactions": [{
          "amount": {
              "total": "7",
              "currency": "USD",
              "details": {
                  "subtotal": "5",
                  "tax": "1",
                  "shipping": "1"
              }
          },
          "description": "This is the payment transaction description."
      }]
  };

  console.log("pp", create_payment_json.payer.funding_instruments);

  paypal.configure(paypal_config);

  paypal.payment.create(create_payment_json, function (error, payment) {
    var message;
    if (error) {
      //console.log("no love from pp", error);
      console.log("no love from pp", JSON.stringify(error));
      //throw error;
      message = error.response.message;
      logTransaction(
        res,
        req.body.payment_id,
        req.body.amount,
        error.httpStatusCode,
        message
      );

    } else {
      console.log("Create Payment Response");
      console.log(payment);

      message = payment.transactions[0].description;
      logTransaction(
        res,
        req.body.payment_id,
        req.body.amount,
        payment.httpStatusCode,
        message
      );
    }
  });


});

function logTransaction(res, payment_id, amount, code, message) {
  res.query("INSERT INTO transactions (payment_id, amount, code, message) VALUES ($1, $2, $3, $4) RETURNING id",
  [payment_id, amount, code, message],
  function(err, rows, results){
    res.json({code: code, message: message});
  });
}

/**
 * end Transaction
 */

/*
 * Lessons
 */

 /* GET Lessons index. */
router.get('/lessons', function(req, res, next) {
  res.query(
    'select \
      lessons.id, \
      lessons.lesson_date, \
      tutor.name as tutor_name, \
      student.name as student_name \
      from lessons \
      join users as tutor \
      on lessons.tutor = tutor.id \
      join users as student \
      on lessons.student = student.id;',
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

/* GET lessons instance */
router.get('/lessons/:id', function(req, res, next) {
  //console.log(req.params.id);
  res.query(
    'select \
      lessons.id, \
      lessons.lesson_date, \
      tutor.name as tutor_name, \
      student.name as student_name, \
      payments.id as payment_id, \
      payments.amount, \
      payments.status \
      from lessons \
      join users as tutor \
      on lessons.tutor = tutor.id \
      join users as student \
      on lessons.student = student.id\
      join payments as payments \
      on lessons.id = payments.lessonid \
      where lessons.id = $1::integer;',
    [req.params.id],
    function(err, rows, results) {
    if(err) {
      console.log("error:", err);
      res.render('error-db', { message: 'DB Error' });
    }
    var payments = [];
    for (var i = 0; i < rows.length; i++) {
      payments.push({
        id: rows[i].payment_id,
        amount: rows[i].amount,
        status: rows[i].status,
      });
    }
    var lesson = {
      id: rows[0].id,
      lesson_date: rows[0].lesson_date,
      tutor_name: rows[0].tutor_name,
      student_name: rows[0].student_name,
      payments: payments
    };

    console.log("row:", rows, results);
    res.json(lesson);
  });
});


 /*
  * end Lessons
  */

router.post('/users', function(req, res, next) {
  console.log("create user...: ", req.body);
  res.query(
    "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id",
    [req.body.email, req.body.name, req.body.password],
    function(err, rows, results){
      if(err) {
        console.log("error:", err);
        res.render('error-db', { message: 'DB Error' });
      }
      console.log("row:", rows, results);
      res.json({id: rows[0].id});
      //next();
    }
  );
});

/* GET users index. */
router.get('/users', function(req, res, next) {
  res.query('select * from users', function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log(rows);
    res.json(rows);
  });
});


module.exports = router;
