var express = require('express');
var router = express.Router();

/* GET payment index. */
router.get('/payments', function(req, res, next) {
  res.query('select * from payments', function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log(rows)
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


module.exports = router;
