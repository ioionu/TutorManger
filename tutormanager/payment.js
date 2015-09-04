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
    }
  };
  return payment;

};

module.exports = tutorManager;
