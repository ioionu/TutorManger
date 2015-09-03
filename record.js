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
