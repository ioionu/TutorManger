var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res){
  console.log("hello from login");
  res.render('login', { title: 'login'});
});

router.post('/',
  passport.authenticate('login'),
  function(req, res){
    res.json({
      id: req.user.id,
      name: req.user.name,
      type: req.user.type,
      token: 123 //TODO: meaningful token
    });
  }
);

module.exports = router;
