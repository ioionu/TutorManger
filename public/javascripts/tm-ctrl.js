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
        $scope.checkCard = function(){
          console.log("checkCard");
          jQuery('.transaction .payment-form input, .transaction .payment-form select').attr('disabled','true');
        };
        $scope.makePayment = function(status, response) {
          jQuery('.transaction .payment-form input, .transaction .payment-form select').attr('disabled','true');
          console.log("da faq id this:", (status===200), status, response);
          if(status===200) {
            //disable button to prevent resubmit
            var transaction = new TMTransaction();
            transaction.payment_id = $routeParams.id;
            transaction.amount = $scope.payment.amount;
            transaction.token = response.id;
            transaction.$save()
            .then(
              function(transaction){
                console.log("payment callback", transaction);
                //alert("woot!");
                //$location.path('/payments/' + $routeParams.id + '/view');
                if(transaction.status==="succeeded") {
                  //$location.search();
                  $scope.payment = TMPayment.get({id: $routeParams.id});
                } else {
                  alert("booo");
                }
              }
            );
          } else {
            //jQuery('.payment-form input, #payment-form select').attr('disabled',null);
            var err_message = "There was an error processing transaction: " + response.error.message;
            jQuery(jQuery(".transaction")[0]).prepend(
              "<div class='alert-box alert'>" + err_message + "<a href='#' class='close'>&times;</a></div>"
            );
            jQuery(document).foundation();
            jQuery('.transaction .payment-form input, .transaction .payment-form select').attr('disabled',null);
            console.log(err_message, status, response);
          }

          //$http.post('/save_customer', { token: response.id });
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
      $scope.title = "lesson index!!";
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

//create lesson
TMCtrl.controller(
  'TMCtrlLessonCreate',
  [
    '$scope', '$location', 'TMLessons', 'TMUser',
    function($scope, $location, TMLessons, TMUser){

      //add date and time picker to date fields
      var date_format = "yyyy-mm-dd";
      var now = new Date();
      var now_time = now.getHours() + ":" + now.getMinutes() + ":00";
      //$('#inputDate, #inputDateEnd').pickadate({format: date_format});
      //$('#inputDateTime, #inputDateTimeEnd').pickatime({format: 'hh:i:00'});

      $scope.inputDate = now;
      $scope.inputDateEnd = now;
      $scope.inputDateTime = now;
      $scope.inputDateTimeEnd = now;

      // TODO: filter to relevant users
      var users = TMUser.query();

      $scope.TMLesson = new TMLessons();
      $scope.TMLesson.tutors = users;
      $scope.TMLesson.students = users;

      $scope.saveLesson = function(){
        //inputDateEnd.$error = {fuck: true};
        console.log("Err", $scope.inputDateTimeEnd.$error, $scope.inputDateTimeEnd.$valid);
        // add user time to date
        $scope.inputDate.setHours( $scope.inputDateTime.getHours() );
        $scope.inputDate.setMinutes( $scope.inputDateTime.getMinutes() );
        $scope.inputDate.setSeconds( $scope.inputDateTime.getSeconds() );
        $scope.TMLesson.lesson_date = $scope.inputDate;

        // add user time to date end
        $scope.inputDateEnd.setHours( $scope.inputDateTimeEnd.getHours() );
        $scope.inputDateEnd.setMinutes( $scope.inputDateTimeEnd.getMinutes() );
        $scope.inputDateEnd.setSeconds( $scope.inputDateTimeEnd.getSeconds() );
        $scope.TMLesson.lesson_date_end = $scope.inputDateEnd;

        // check nd date follows start date
        if($scope.TMLesson.lesson_date_end < $scope.TMLesson.lesson_date) {
          alert("Temporal anomaly detected");
        } else {
          $scope.TMLesson.$save().then(function(){
            console.log("after save");
            $location.path('/lessons/' + $scope.TMLesson.id + '/view');
          });
        }

        console.log("saveLessonDate: ", $scope.TMLesson.lesson_date.toLocaleString(), $scope.TMLesson.lesson_date_end.toLocaleString());
      };
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
      };
    }
  ]
);

// logout user
TMCtrl.controller(
  'TMCtrlUserLogout',
  [
    '$scope', 'TMUser',
    function($scope, TMUser){
      //TODO: TMApp
      $scope.users = TMUser.query();
    }
  ]
);


TMCtrl.controller(
  'TMCtrlUser',
  ['$scope', '$location', '$window', 'TMUserService', 'TMAuthenticationService',
  function($scope, $location, $window, TMUserService, TMAuthenticationService) {

    //Admin User Controller (login, logout)
    $scope.logIn = function(username, password) {
      console.log("hello login");
      if (username !== undefined && password !== undefined) {

        TMUserService.logIn(username, password)
        .success(function(data) {
          TMUserService.isLogged = true;
          TMUserService.user = data;
          $window.sessionStorage.token = data.token;
          $location.path("/");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
      }
    };

    $scope.logout = function() {
      console.log("logging out");
      if (TMUserService.isLogged) {
        TMUserService.isLogged = false;
        delete $window.sessionStorage.token;
        $location.path("/");
      }
    };
  }
]);


TMCtrl.controller(
  'TMCtrlNav',
  ['$scope', '$rootScope', '$location', 'TMUserService',
  function($scope, $rootScope, $location, TMUserService) {
    $rootScope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    console.log("user:", $scope.user);
    var loggedInCheck = function(){
      return true;
    };
    $scope.getUserName = function(){
      return TMUserService.user.name;
    };

    //$scope.isLoggedIn ? typeof($scope.user;
  }
]);
