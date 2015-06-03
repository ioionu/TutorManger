console.log("hello feom controllers");
var TMCtrl = angular.module('TMCtrl', []);

TMCtrl.controller(
  'TMCtrlIndex',
  [
    '$scope',
    function($scope){
      console.log("homepage");
    }
  ]
);


//list payments
TMCtrl.controller(
  'TMCtrlPaymentIndex',
  [
    '$scope', 'TMPayment',
    function($scope, TMPayment){
      //TODO: TMApp
      console.log("dis bbe da index");
      $scope.payments = TMPayment.query();
      console.log($scope.payments);
      $scope.derp = "derpX";
      $scope.yo = function(TMPayment){
        console.log(TMPayment);
      };
    }
  ]
);

//display payment
TMCtrl.controller(
  'TMCtrlPaymentView',
  [
    '$scope', '$routeParams', '$location', 'TMPayment', 'TMTransaction',
    function($scope, $routeParams, $location, TMPayment, TMTransaction) {
      var p = TMPayment.get({id: $routeParams.id}, function(){
        $scope.payment = p;
        $scope.makePayment = function(){
          var transaction = new TMTransaction();

          transaction.number = $scope.cc_number;
          transaction.expire_month = $scope.cc_expire_month;
          transaction.expire_year = $scope.cc_expire_year;
          transaction.cvv2 = $scope.cc_cvv2;
          transaction.first_name = $scope.cc_first_name;
          transaction.last_name = $scope.cc_last_name;
          transaction.payment_id = $routeParams.id;
          transaction.amount = 5;

          //client side validation of cc number
          //https://www.npmjs.com/package/card.js
          var c = card(transaction.number);
          if(c.isValid()){
            transaction.type = c.getType();

            console.log("cnumber:", transaction);

            var t = transaction.$save(function(){
              console.log("payment callback");
            });
          } else {
            console.log("cc not valid");
          }

        };
      });
    }
  ]
);

/*
 * Lessons
 */

//list lessons
TMCtrl.controller(
  'TMCtrlLessonsIndex',
  [
    '$scope', 'TMLessons',
    function($scope, TMLessons){
      $scope.lessons = TMLessons.query();
      $scope.title = "fuck yeah!!";
      console.log($scope);
    }
  ]
);

//display lessons
TMCtrl.controller(
  'TMCtrlLessonsView',
  [
    '$scope', '$routeParams', '$location', 'TMLessons',
    function($scope, $routeParams, $location, TMLessons) {
      var p = TMLessons.get({id: $routeParams.id}, function(){
        console.log("get got:", p);
        $scope.lesson = p;
      });
    }
  ]
);

// /end lessons

//create user
TMCtrl.controller(
  'TMCtrlUserCreate',
  [
    '$scope', '$location', 'TMUser',
    function($scope, $location, TMUser){
      console.log("create user:", $scope);
      $scope.TMUser = new TMUser();
      $scope.saveUser = function(){
        var p = $scope.TMUser.$save(function(){
          console.log("user saved");
        });
        p.then(function(){
          console.log("and then:", $scope);
          $location.path('/users/' + $scope.TMUser.id + '/view');
        });
      };
    }
  ]
);

//user index
TMCtrl.controller(
  'TMCtrlUserIndex',
  [
    '$scope', 'TMUser',
    function($scope, TMUser){
      //TODO: TMApp
      $scope.users = TMUser.query();
      $scope.yo = function(TMUser){
        console.log(TMUser);
      }
    }
  ]
);
