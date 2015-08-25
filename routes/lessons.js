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

    res.query(
      'select ' +
        'lessons.id,' +
        'lessons.lesson_date,' +
        'lessons.lesson_date_end,' +
        'tutor.name as tutor_name, ' +
        'student.name as student_name ' +
        'from lessons ' +
        'join users as tutor ' +
        'on lessons.tutor = tutor.id ' +
        'join users as student ' +
        'on lessons.student = student.id ' +
        'WHERE lessons.student = $1::integer OR ' +
        'lessons.tutor = $1::integer;',
      [req.user.id],
      function(err, rows, results) {
        if(err) {
          console.log(err);
          res.render('error-db', { message: 'DB Error' });
        }
        console.log("Lesson Index:", rows);
        res.json(rows);
      }
    );
  }
});

router.post('/', function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {


  var qstring = 'INSERT INTO lessons (lesson_date, lesson_date_end, tutor, student) VALUES ($1, $2, $3, $4) RETURNING id';
  res.query(
    qstring,
    [req.body.lesson_date, req.body.lesson_date_end, req.user.id, req.body.student],
    function(err, rows, results){
      console.log("Creating Lesson", req.body.lesson_date, req.body.lesson_date_end, req.body.tutor, req.body.student);
      if(err) {
        console.log("Lesson creation error:", err);
        res.render('error-db', { message: 'DB Error' });
      }
      console.log("row:", rows, results);
      res.json({id: rows[0].id});
      //next();
    }
  );
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
