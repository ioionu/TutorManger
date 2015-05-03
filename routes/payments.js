var express = require('express');
var router = express.Router();

/* GET payment index. */
router.get('/', function(req, res, next) {
  res.query('select * from payment', function(err, rows, results) {
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
router.get('/:id', function(req, res, next) {
  res.query('select * from payment where id = ?;', [req.params.id], function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log(rows)
    res.json(rows);
  });
});



module.exports = router;
