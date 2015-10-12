var express = require('express');
var config = require('../config');

var router = express.Router();

router.post('/', function(req, res, next) {
  console.log("create user...: ", req.body);

  res.query.first(
    "SELECT id from users WHERE confirm=$1",
    [req.body.confirm],
    function(err, rows, results){
      console.log(rows);
      if(err) {
        res.send(500).message("Error occured pulling confirm key from db");
      } else {

        //activate the user
        res.query.first("UPDATE users SET status='active' WHERE confirm=$1 RETURNING id",
          [req.body.confirm],
          function(err, rows, results) {
            if(err) {
              console.log("error:", err);
              res.send(500).message("Error occured confirming user in db");
            }
            console.log(rows);
            res.json({id: rows.id});
          }
        );

      }
    }
  );
});

module.exports = router;
