var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET payment index. */
router.get('/', function(req, res, next) {
  fs.readFile('./install/installer.sql', function(err, data){
    if(err) {
      console.log(err);
      res.render('installer', {message: 'file error' + err});
    }
    console.log(data.toString());
    res.query(data.toString(), function(err, rows, results) {
      if(err) {
        console.log(err);
        res.render('error-db', { message: 'DB Error' });
      }
      res.render('installer', {message: 'hello installer'});
    });
  });

  /*
  res.query('select * from payment', function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log(rows)
    res.json(rows);
  });
  */
});
module.exports = router;
