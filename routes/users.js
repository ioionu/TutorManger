var express = require('express');
var config = require('../config');
var router = express.Router();


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
