console.log("hello from client");
var TMApp = angular.module('TMApp', [
  'ngResource',
  'ngRoute',
  'TMCtrl',
  'TMAppService',
  'TMFilters',
  'stripe'
]);

TMApp.config([
  '$httpProvider',
  '$routeProvider',
  '$locationProvider',
  function($httpProvider, $routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    Stripe.setPublishableKey("pk_test_SmtJiXCEwaof3aL3xudljbMq");
    $httpProvider.interceptors.push('TMAppInterceptor');
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: 'TMCtrlIndex',
        title: 'TutorManager'
      })
      .when('/payments', {
        templateUrl: 'partials/payment-index.html',
        controller: 'TMCtrlPaymentIndex',
        title: 'Payments Index'
      })
      .when('/payments/:id/view', {
        templateUrl: 'partials/payment-view.html',
        controller: 'TMCtrlPaymentView',
        title: 'Payments View'
      })
      .when('/lessons', {
        templateUrl: 'partials/lessons-index.html',
        controller: 'TMCtrlLessonsIndex',
        title: 'Lessons Index',
      })
      .when('/lessons/:id/view', {
        templateUrl: 'partials/lessons-view.html',
        controller: 'TMCtrlLessonsView',
        title: 'Lesson View',
      })
      .when('/users', {
        templateUrl: 'partials/user-index.html',
        controller: 'TMCtrlUserIndex',
        title: 'User Index',
      })
      .when('/users/create', {
        templateUrl: 'partials/user-create.html',
        controller: 'TMCtrlUserCreate',
        title: 'Create User'
      })
      .when('/login', {
        templateUrl: 'partials/user-login.html',
        controller: 'TMCtrlUser',
        title: 'Login User'
      })
      .when('/logout', {
        templateUrl: 'partials/user-logout.html',
        controller: 'TMCtrlUser',
        title: 'User Logout'
      })
      ;
  }
]);


TMApp.run(['$location', '$rootScope', 'TMUserService', function($location, $rootScope, TMUserService) {
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

    $rootScope.title = current.$$route.title;
    $rootScope.isLogged = TMUserService.isLogged;
    console.log("boom", $rootScope.isLogged);

  });
}]);
