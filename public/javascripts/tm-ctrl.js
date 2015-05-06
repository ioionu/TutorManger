console.log("hello feom controllers");
var TMCtrl = angular.module('TMCtrl', []);
TMCtrl.controller(
  'TMCtrlIndex',
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
