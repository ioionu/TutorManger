var express = require('express');
var config = require('../config');
var crypto = require('crypto');
var email = require('emailjs');
var router = express.Router();


function makeid()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

router.post('/', function(req, res, next) {
  console.log("create user...: ", req.body);

  //check if email is already associated with an account
  var checkEmail = res.query.first(
    "SELECT count(*) FROM users WHERE email=$1",
    [req.body.email],
    function(err, check_rows, check_results){
      if(err) {
        console.log("error:", err);
        res.render('error-db', { message: 'DB Error' });
      }

      // if we returned anything but 0 then fail
      if(check_rows.count !== "0") {
        res.status(500).send("Email address already used");
      } else {

        // crypto fu for user auth
        var salt = crypto.randomBytes(128).toString('base64');
        var key = crypto.pbkdf2Sync(req.body.password, salt, 4096, 512, 'sha256');
        var confirm_key = makeid();

        //create the user
        res.query( //TODO: should i use res.query.first?
          "INSERT INTO users (email, name, password, salt, status, confirm) VALUES ($1, $2, $3, $4, 'inactive', $5) RETURNING id",
          [req.body.email, req.body.name, key.toString('base64'), salt, confirm_key],
          function(err, rows, results){
            if(err) {
              console.log("error:", err);
              res.render('error-db', { message: 'DB Error' });
            }
            console.log("row:", rows, results);

            // send confirmation email
            var confirm_address = "http://localhost:5000/users/confirm/" + confirm_key; //TODO: get domain from somwhere sane
            var email_message = "Thanks for registering!\n Please click here to confirm your account:\n" +
              confirm_address;
            var server = email.server.connect({host: "localhost"});
            server.send({
              text: email_message,
              from: "root@localhost", //TODO: get from address from config
              to: req.body.email,
              subject: "hello " + rows[0].id
            });

            res.json({id: rows[0].id});
          }
        );
      }
  });
});

/* GET users index. */
router.get('/', function(req, res, next) {
  res.query('select id, email, name, status from users', function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log(rows);
    res.json(rows);
  });
});


module.exports = router;
