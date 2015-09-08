var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'homepage'});
});

router.get(/^\/payments\/.+\/view/, function(req, res, next) {
  res.render('index', { title: 'Payments', content: '' });
});

router.get(/^\/lessons\/.+\/view/, function(req, res, next) {
  res.render('index', { title: 'Lessons', content: '' });
});

router.get(/^\/lessons\/create/, function(req, res, next) {
  res.render('index', { title: 'Lessons', content: '' });
});

router.get(/^\/users\/create/, function(req, res, next) {
  res.render('index', { title: 'User Create', content: '' });
});

router.get(/^\/users\/unconfirmed/, function(req, res, next) {
  res.render('index', { title: 'Check Your Email :)', content: '' });
});

router.get(/^\/users\//, function(req, res, next) {
  res.render('index', { title: 'User Index', content: '' });
});

router.get(/^\/login/, function(req, res, next) {
  res.render('index', { title: 'User Login', content: '' });
});

router.get(/^\/logout/, function(req, res, next){
  res.render('index', { title: 'User Logout', content: '' });
});

module.exports = router;
