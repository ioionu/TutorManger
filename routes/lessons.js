var express = require('express');
var passport = require('passport');
var config = require('../config');
var router = express.Router();

/*
 * Lessons
 */

 /* GET Lessons index. */
router.get('/', function(req, res, next) {
  //res.ensureAuthenticated();

  console.log("lessons index", req.user);
  if(!req.isAuthenticated())
  {
    res.sendStatus(401);
  } else {

    res.tutorManager.lesson.get({userid: req.user.id})
    .then(function(rows, results) {
      console.log("Lesson Index:", rows);
      res.json(rows[0]);
    });
  }
});

router.post('/', function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {


  var lessone_id = 0;
  var params = {
    lesson_date: req.body.lesson_date,
    lesson_date_end: req.body.lesson_date_end,
    tutor: req.user.id,
    student: req.body.student
  };
  res.rec.lesson.create(params)
  .then(function(rows, results){
    //TODO: errror handle
    lessone_id = rows[0][0].id; //TODO: WTF? why [0][0]?
    var params = {
      description: "i am description",
      userid: req.body.student,
      lessonid: lessone_id,
      amount: req.body.amount
    };
    return res.rec.payment.create(params);
  })
  .then(function(data){
    console.log("post payment creation", data);
    res.json({id: lessone_id});
    //next();
  });

}});

/* GET lessons instance */
router.get('/:id', function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {

  res.tutorManager.lesson.get({lessonid:req.params.id})
  .then(function(data) {
    var rows = data[0];
    var payments = [];
    for (var i = 0; i < rows.length; i++) {
      payments.push({
        id: rows[i].payment_id,
        amount: rows[i].amount,
        status: rows[i].status,
      });
    }
    var duration_seconds = ((rows[0].lesson_date_end - rows[0].lesson_date) / 1000);

    var lesson = {
      id: rows[0].id,
      lesson_date: rows[0].lesson_date,
      lesson_date_end: rows[0].lesson_date_end,
      duration: duration_seconds,
      tutor_name: rows[0].tutor_name,
      student_name: rows[0].student_name,
      payments: payments
    };

    console.log("row:", rows);
    res.json(lesson);
  }
  );
}});


 /*
  * end Lessons
  */
 module.exports = router;
