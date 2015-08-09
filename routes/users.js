var express = require('express');
var config = require('../config');
var crypto = require('crypto');
var router = express.Router();


router.post('/', function(req, res, next) {
  console.log("create user...: ", req.body);

  var salt = crypto.randomBytes(128).toString('base64');
  var key = crypto.pbkdf2Sync(req.body.password, salt, 4096, 512, 'sha256');
  console.log("crypto", key.toString('base64'));
  res.query(
    "INSERT INTO users (email, name, password, salt) VALUES ($1, $2, $3, $4) RETURNING id",
    [req.body.email, req.body.name, key.toString('base64'), salt],
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
router.get('/', function(req, res, next) {
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
