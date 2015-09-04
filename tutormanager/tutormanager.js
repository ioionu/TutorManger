var lesson = require('./lesson.js');
var payment = require('./payment.js');

var tutorManager = function(req, res, next) {

  var tutorManager = {};

  tutorManager.lesson = lesson(req, res);
  tutorManager.payment = payment(req, res);

  res.tutorManager = tutorManager;
  next();
};

module.exports = tutorManager;
