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
      }
    }
  ]
);

//display payment
TMCtrl.controller(
  'TMCtrlPaymentView',
  [
    '$scope', '$routeParams', '$location', 'TMPayment',
    function($scope, $routeParams, $location, TMPayment) {
      var p = TMPayment.get({id: $routeParams.id}, function(){
        console.log("get got:", p);
        $scope.payment = p;
      });
    }
  ]
);

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
