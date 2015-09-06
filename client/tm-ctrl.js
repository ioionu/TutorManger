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
      $scope.payments = TMPayment.query();
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
    '$scope', 'TMLessons', 'TMUserService',
    function($scope, TMLessons, TMUserService){
      $scope.lessons = TMLessons.query();
      $scope.title = "lesson index!!";
      $scope.isTutor = TMUserService.isTutor();
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
        $scope.lesson = p;
        $scope.canCancel = ($scope.lesson.lesson_status !== 'canceled') ? true : false;
      });
      $scope.cancel = function(){
        $scope.lesson.operation = "cancel";
        $scope.lesson.$update();
        var p = TMLessons.get({id: $routeParams.id}, function(){
          $scope.lesson = p;
        });
      };
    }
  ]
);

//create lesson
TMCtrl.controller(
  'TMCtrlLessonCreate',
  [
    '$scope', '$location', 'TMLessons', 'TMUser', 'TMUserService',
    function($scope, $location, TMLessons, TMUser, TMUserService){

      $scope.inputDate = new Date();
      $scope.inputDateEnd = new Date();
      $scope.inputDateTime = new Date();
      $scope.inputDateTimeEnd = new Date();

      // TODO: filter to relevant users
      var users = TMUser.query();

      $scope.TMLesson = new TMLessons();
      $scope.TMLesson.tutors = users;
      $scope.TMLesson.students = users;
      $scope.username = TMUserService.getUserName();
      $scope.TMLesson.amount = 0;


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
        p.then(function(data){
          $location.path('/users/unconfirmed');
        }, function(error){
          alert(error.data);
        });
      };
    }
  ]
);

//confirm user
TMCtrl.controller(
  'TMCtrlUserConfirm',
  [
    '$scope', '$location', 'TMUserConfirm',
    function($scope, $location, TMUserConfirm){
      $scope.TMUserConfirm = new TMUserConfirm();
      $scope.TMUserConfirm.confirm = $location.path().split('/').pop();
      $scope.confirmUser = function() {
        var p = $scope.TMUserConfirm.$save();
        p.then(function(data){
          if(typeof(parseInt(data.id)) != 'undefined') {
            $location.path('/login');
          }
        },
        function(err){
          console.log("Error confirming account:" + err);
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
  ['$scope', '$location', '$window', 'localStorageService', 'TMUserService', 'TMAuthenticationService',
  function($scope, $location, $window, localStorageService, TMUserService, TMAuthenticationService) {

    //Admin User Controller (login, logout)
    $scope.logIn = function(username, password) {
      console.log("hello login");
      if (username !== undefined && password !== undefined) {

        TMUserService.logIn(username, password);
      }
    };

    $scope.logout = function() {
      console.log("logging out");
      TMUserService.logOut();
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
    $rootScope.isLoggedIn = TMUserService.isLoggedIn;
    $rootScope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    //console.log("user:", $scope.user);
    var loggedInCheck = function(){
      return true;
    };
    $scope.getUserName = function(){
      return TMUserService.getUserName();
    };

    //$scope.isLoggedIn ? typeof($scope.user;
  }
]);
