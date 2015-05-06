var express = require('express');
var query = require('../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Payments', content: 'derp' });
});

router.get(/^\/payments\/.+\/view/, function(req, res, next) {
  res.render('index', { title: 'Payments', content: 'derp' });
});


module.exports = router;
