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
  if(!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {

    res.tutorManager.lesson.get({id: req.user.id})
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

  //console.log(req.params.id);
  var qstring = 'select ' +
    'lessons.id, ' +
    'lessons.lesson_date, ' +
    'lessons.lesson_date_end, ' +
    'tutor.name as tutor_name, ' +
    'student.name as student_name, ' +
    'payments.id as payment_id, ' +
    'payments.amount, ' +
    'payments.status ' +
    'from lessons ' +
    'join users as tutor ' +
    'on lessons.tutor = tutor.id ' +
    'join users as student ' +
    'on lessons.student = student.id ' +
    'left join payments as payments ' +
    'on lessons.id = payments.lessonid ' +
    'where lessons.id = $1::integer;'
  ;
  console.log(qstring);

  res.query(
    qstring,
    [req.params.id],
    function(err, rows, results) {
      if(err) {
        console.log("error:", err);
        res.render('error-db', { message: 'DB Error' });
      }
      var payments = [];
      for (var i = 0; i < rows.length; i++) {
        payments.push({
          id: rows[i].payment_id,
          amount: rows[i].amount,
          status: rows[i].status,
        });
      }
      var duration_seconds = (rows[0].lesson_date_end - rows[0].lesson_date);

      var lesson = {
        id: rows[0].id,
        lesson_date: rows[0].lesson_date,
        lesson_date_end: rows[0].lesson_date_end,
        duration: duration_seconds,
        tutor_name: rows[0].tutor_name,
        student_name: rows[0].student_name,
        payments: payments
      };

      console.log("row:", rows, results);
      res.json(lesson);
    }
  );
}});


 /*
  * end Lessons
  */
 module.exports = router;
