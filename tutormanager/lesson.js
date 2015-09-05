var tutorManager = function(req, res) {
  return {
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
      if(typeof params === "undefined") {
        p = [];
      } else {
        if(typeof params.userid !== "undefined") {
          q = 'select ' +
            'lessons.id, ' +
            'lessons.lesson_date, ' +
            'lessons.lesson_date_end, ' +
            'tutor.name as tutor_name, ' +
            'student.name as student_name ' +
            'from lessons ' +
            'join users as tutor ' +
            'on lessons.tutor = tutor.id ' +
            'join users as student ' +
            'on lessons.student = student.id ' +
            'WHERE tutor.id=$1 OR lessons.student=$1::integer';
          p = [params.userid];
        } else if(typeof params.lessonid !== "undefined") {
          q = q + "WHERE lessons.id=$1::integer";
          p = [params.lessonid];
        }

      }
      console.log(q, p);
      var promise = res.query(q,p);
      return promise;
    }
  };
};

module.exports = tutorManager;
