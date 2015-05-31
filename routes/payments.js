var express = require('express');
var router = express.Router();


/* GET payment index. */
router.get('/payments', function(req, res, next) {
  res.query('select * from payments', function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log(rows)
    res.json(rows);
  });
});

router.post('/', function(req, res, next){

});

/* GET payment instance */
router.get('/payments/:id', function(req, res, next) {
  //console.log(req.params.id);
  res.query('select * from payments where id = $1::integer;', [req.params.id], function(err, rows, results) {
    if(err) {
      console.log("error:", err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log("row:", rows[0], results);
    res.json(rows[0]);
  });
});

/*
 * Lessons
 */

 /* GET Lessons index. */
router.get('/lessons', function(req, res, next) {
  res.query(
    'select \
      lessons.id, \
      lessons.lesson_date, \
      tutor.name as tutor_name, \
      student.name as student_name \
      from lessons \
      join users as tutor \
      on lessons.tutor = tutor.id \
      join users as student \
      on lessons.student = student.id;',
  function(err, rows, results) {
  if(err) {
    console.log(err);
    res.render('error-db', { message: 'DB Error' });
  }
  console.log(rows)
  res.json(rows);
  });
});

router.post('/', function(req, res, next){

});

/* GET lessons instance */
router.get('/lessons/:id', function(req, res, next) {
  //console.log(req.params.id);
  res.query(
    'select \
      lessons.id, \
      lessons.lesson_date, \
      tutor.name as tutor_name, \
      student.name as student_name, \
      payments.id as payment_id, \
      payments.amount, \
      payments.status \
      from lessons \
      join users as tutor \
      on lessons.tutor = tutor.id \
      join users as student \
      on lessons.student = student.id\
      join payments as payments \
      on lessons.id = payments.lessonid \
      where lessons.id = $1::integer;',
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

router.post('/users', function(req, res, next) {
  console.log("create user...: ", req.body);
  res.query(
    "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id",
    [req.body.email, req.body.name, req.body.password],
    function(err, rows, results){
      if(err) {
        console.log("error:", err);
        res.render('error-db', { message: 'DB Error' });
      }
      console.log("row:", rows, results);
      res.json({id: rows[0].id});
      //next();
    }
  );
});

/* GET users index. */
router.get('/users', function(req, res, next) {
  res.query('select * from users', function(err, rows, results) {
    if(err) {
      console.log(err);
      res.render('error-db', { message: 'DB Error' });
    }
    console.log(rows)
    res.json(rows);
  });
});


module.exports = router;
