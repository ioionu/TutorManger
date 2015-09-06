var tutorManager = function(req, res) {
  return {
    create: function(params){
      console.log("creating lesson", params);
      var promise = res.query(
        'INSERT INTO lessons (lesson_date, lesson_date_end, tutor, student, status)' +
        ' VALUES ($1, $2, $3, $4, $5)' +
        ' RETURNING id',
        [params.lesson_date, params.lesson_date_end, params.tutor, params.student, 'confirmed']
      );
      return promise;
    },
    get: function(params){
      var q = 'select ' +
        'lessons.id, ' +
        'lessons.lesson_date, ' +
        'lessons.lesson_date_end, ' +
        'lessons.status as lesson_status, ' +
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

        // get single lesson
        if(typeof params.userid !== "undefined") {
          q = 'select ' +
            'lessons.id, ' +
            'lessons.lesson_date, ' +
            'lessons.lesson_date_end, ' +
            'lessons.status, ' +
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
    },
    cancel: function(params) {
      var lessonid = params.lessonid;
      var userid = params.userid;

      var q = "UPDATE lessons SET status='canceled'" +
      " WHERE id=$1::integer" +
      " AND (tutor=$2::integer OR student=$2::integer) RETURNING id,status;";
      var p = [lessonid, userid];
      return res.query(q,p);
    }
  };
};

module.exports = tutorManager;
