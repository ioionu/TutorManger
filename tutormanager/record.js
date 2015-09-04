var record = function(req, res, next) {
  var rec = {};
  rec.lesson = {
    create: function(params){
      console.log("creating lesson", params);
      var promise = res.query(
        'INSERT INTO lessons (lesson_date, lesson_date_end, tutor, student) VALUES ($1, $2, $3, $4) RETURNING id',
        [params.lesson_date, params.lesson_date_end, params.tutor, params.student]
      );
      return promise;
    },
    get: function(params){
      var q = 'select ' +
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
        'on lessons.id = payments.lessonid '
      ;

      //catch them all or just one?
      var p;
      if(typeof params.id === undefined) {
        q = "SELECT * FROM payments";
        p = [];
      } else {
        q = "SELECT * FROM payments WHERE id=$1";
        p = [params.id];
      }
      var promise = res.query(q,p);
      return promise;
    }
  };
  rec.payment = {
    create: function(params)
    {
      console.log("creating payment");
      var promise = res.query(
        "INSERT INTO payments (description, amount, userid, lessonid, status) VALUES ($1, $2, $3, $4, $5) RETURNING id;",
        ["hello description", params.amount, params.userid, params.lessonid, 'unpaid']
      );
      return promise;
    },
    pay: function(params){
      var promise = res.query(
        "UPDATE payments SET status='paid' WHERE id=$1 RETURNING *;",
        [params.id]
      );
      return promise;
    }
  };
  res.rec = rec;
  next();
};

module.exports = record;
