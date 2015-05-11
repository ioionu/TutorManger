var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Payments', content: 'derp' });
});

router.get(/^\/payments\/.+\/view/, function(req, res, next) {
  res.render('index', { title: 'Payments', content: 'derp' });
});

router.get('/login', function(req, res){
  console.log("hello from login");
  res.render('login', { title: 'login'});
});

router.post('/login',
  passport.authenticate('login', {
    successRedirect: '/payments',
    failureRedirect: '/'
  })
);
module.exports = router;
