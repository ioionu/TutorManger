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
