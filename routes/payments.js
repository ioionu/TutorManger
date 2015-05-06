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
  console.log(req.params.id);
  res.query('select * from payments where id = $1::integer;', [req.params.id], function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log("row:", rows[0]);
    res.json(rows[0]);
  });
});



module.exports = router;
