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

  // what are we actually doing? for now just create
  var operation = 'create';

  var params = {};

  switch(opeation) {
    case 'create':
      var lessone_id = 0;
      params = {
        lesson_date: req.body.lesson_date,
        lesson_date_end: req.body.lesson_date_end,
        tutor: req.user.id,
        student: req.body.student
      };
      res.rec.lesson.create(params)
      .then(function(data){
        //TODO: errror handle

        lessone_id = data[0][0].id;
        var params = {
          description: "i am description",
          userid: req.body.student,
          lessonid: lessone_id,
          amount: parseFloat(req.body.amount).toFixed(2)
        };

        //only create payment if amount is not 0
        //TODO: better validation
        if(params.amount > 0) {
          return res.tutorManager.payment.create(params);
        }
      })
      .then(function(data){
        console.log("post payment creation", data);
        res.json({id: lessone_id});
      });
      break; // end create
    case 'somthing':
      res.json({error:"not implemented"});
      break;
  } // end switch
}});

//update lesson
router.put('/:id', function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {

  operation = 'save';
  var operation = (req.body.operation == 'cancel') ? 'cancel' : operation;

  var lessonid = req.params.id;
  var userid = req.user.id;
  var params = {
    lessonid: lessonid,
    userid: userid
  };
  res.tutorManager.lesson.cancel(params)
  .then(function(data){
    params = {lessonid: lessonid};
    return res.tutorManager.payment.cancel(params);
  })
  .then(function(data){
    var lesson = data[0][0];
    // return lesson and status, reload lesson can be init on client side
    return res.json({
      lessonid: lessonid,
      status: 'canceled'
    });
  });
  }
});

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
      lesson_status: rows[0].lesson_status,
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
