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
