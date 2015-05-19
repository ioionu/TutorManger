console.log("hello from client");
var TMApp = angular.module('TMApp', [
  'ngResource',
  'ngRoute',
  'TMCtrl',
  'TMAppService',
]);

TMApp.config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/payments', {
        templateUrl: 'partials/payment-index.html',
        controller: 'TMCtrlIndex'
      })
      .when('/payments/:id/view', {
        templateUrl: 'partials/payment-view.html',
        controller: 'TMCtrlPaymentView'
      })
      .when('/users', {
        templateUrl: 'partials/user-index.html',
        controller: 'TMCtrlUserIndex'
      })
      .when('/users/create', {
        templateUrl: 'partials/user-create.html',
        controller: 'TMCtrlUserCreate'
      })
      ;
  }
]);
