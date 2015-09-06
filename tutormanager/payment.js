var tutorManager = function(req, res) {

  var payment = {
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
    },
    cancel: function(params){
      var lessonid = params.lessonid;

      var q = " UPDATE payments" +
      " SET status='canceled'" +
      " WHERE lessonid=$1::integer RETURNING id,status;";
      var p = [lessonid]; //TODO: confirm user id???
      return res.query(q,p);

    }
  };
  return payment;

};

module.exports = tutorManager;
