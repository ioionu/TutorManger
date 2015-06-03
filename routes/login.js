var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res){
  console.log("hello from login");
  res.render('login', { title: 'login'});
});

router.post('/',
  passport.authenticate('login', {
    successRedirect: '/payments',
    failureRedirect: '/'
  })
);

module.exports = router;