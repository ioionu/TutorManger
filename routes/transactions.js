var express = require('express');
var config = require('../config');
var stripe = require("stripe")(config.stripe.configure.secret_key);

var router = express.Router();

/**
 * Transaction
 */

router.post('/', function(req, res, next){

  console.log("aboiut to run charge", req.body.token);

  var id = req.body.payment_id;
  res.query('select * from payments where id = $1::integer;', id)
  .then(function(results){
    return createPayment(results, res);
  })
  .then(function(payment_data){
    console.log("processPayment", payment_data);
    return processPayment(payment_data, res);
  })
  .then(function(charge){
    var log_data = {
      payment_id:req.body.payment_id,
      amount: charge.amount,
      code: charge.id,
      message: charge.description,
      status: charge.status
    };
    return logTransaction(log_data, res);
  })
  .then(function(log_data){
    console.log("about to updatePaymentRecord", log_data);
    return updatePaymentRecord(log_data, res);
  })
  .then(function(log_data){
    console.log("returning", log_data);
    res.json(log_data);
  })
  .catch(function(err){
    console.log("da faq", err);
    res.json({
      status: "failed",
      message: err
    });
  });

  //console.log("i am payment", p);


});

function createPayment(results, res) {
  //TODO: confirm user has access to this payment
  var row = results[0][0];
  var amount = parseInt(row.amount) * 100; //stripe payments are in cents
  var amount_submited = parseInt(res.req.body.amount) * 100;
  //sanity check amount
  if(amount !== amount_submited ) {
    console.log("Error! submited amount does not match db amount", amount, amount_submited);
  }
  if(row.status === "paid" ) {
    console.log("Error! this bill has already been paid!");
  }

  var stripe_data = {
    amount: amount, // amount in cents, again
    currency: "aud",
    source: res.req.body.token,
    description: row.description
  };

  return stripe_data;
}

function processPayment(payment_data, res) {
  var promise_trans;
  return stripe.charges.create(payment_data)
  .then(
    function(charge) {
      console.log("apparently no error", charge);
      return charge;
    }
  )
  .catch(function(err){
    console.log("there was an error", err);
    res.json({
      status: 'fail',
      message: err.message
    });
  });
}

function logTransaction(opt, res) {
  console.log("log trans", opt.payment_id);

  return res.query(
    "INSERT INTO transactions (payment_id, amount, code, message) VALUES ($1, $2, $3, $4) RETURNING id",
    [opt.payment_id, opt.amount, opt.code, opt.message]
  )
  .then(function(transaction){
    console.log("log transaction inner", transaction, opt);
    return opt;
  });
  //promise_trans.then(function(){
  //  console.log("and then...");
  //});
}

function updatePaymentRecord(log_data, res) {
  console.log("updating payment record", log_data);
  if(log_data.status=="succeeded") {
    return res.query(
      "UPDATE payments SET status='paid' where id=$1::integer", [log_data.payment_id]
    )
    .then(function(payment){
      console.log("payment updated", payment);
      return log_data;
    });
  }
}


/**
 * end Transaction
 */

 module.exports = router;
