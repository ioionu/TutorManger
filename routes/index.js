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

router.get(/^\/users\/create/, function(req, res, next) {
  res.render('index', { title: 'User Create', content: 'derp' });
});

router.get(/^\/users\//, function(req, res, next) {
  res.render('index', { title: 'User Index', content: 'derp' });
});

module.exports = router;
