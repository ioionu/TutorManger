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
      when('/', {
        templateUrl: 'partials/payment-view.html',
        controller: 'TMCtrlIndex'
      });
  }
]);
