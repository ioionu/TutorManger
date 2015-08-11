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
        console.log(rows);
        res.json(rows);
      }
    );
  }
});

router.post('/', function(req, res, next){

});

/* GET lessons instance */
router.get('/:id', function(req, res, next) {
  //console.log(req.params.id);
  res.query(
    'select ' +
      'lessons.id, ' +
      'lessons.lesson_date, ' +
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
      'join payments as payments ' +
      'on lessons.id = payments.lessonid ' +
      'where lessons.id = $1::integer;',
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
    var lesson = {
      id: rows[0].id,
      lesson_date: rows[0].lesson_date,
      tutor_name: rows[0].tutor_name,
      student_name: rows[0].student_name,
      payments: payments
    };

    console.log("row:", rows, results);
    res.json(lesson);
  });
});


 /*
  * end Lessons
  */
 module.exports = router;
