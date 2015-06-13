var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'Payments', content: '' });
});

router.get(/^\/payments\/.+\/view/, function(req, res, next) {
  res.render('index', { title: 'Payments', content: '' });
});

router.get(/^\/lessons\/.+\/view/, function(req, res, next) {
  res.render('index', { title: 'Lessons', content: '' });
});

router.get(/^\/users\/create/, function(req, res, next) {
  res.render('index', { title: 'User Create', content: '' });
});

router.get(/^\/users\//, function(req, res, next) {
  res.render('index', { title: 'User Index', content: '' });
});

module.exports = router;
