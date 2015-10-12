console.log("hello from client");
var TMApp = angular.module('TMApp', [
  'ngResource',
  'ngRoute',
  'ngMessages',
  'LocalStorageModule',
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
    if(typeof Stripe !== 'undefined')
      Stripe.setPublishableKey("pk_test_SmtJiXCEwaof3aL3xudljbMq");
    $httpProvider.interceptors.push('TMAppInterceptor');
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: 'TMCtrlIndex',
        title: 'TutorManager',
        access: { requiredLogin: false },
        bodyClass: 'homepage'
      })
      .when('/payments', {
        templateUrl: 'partials/payment-index.html',
        controller: 'TMCtrlPaymentIndex',
        title: 'Payments Index',
        access: { requiredLogin: true }
      })
      .when('/payments/:id/view', {
        templateUrl: 'partials/payment-view.html',
        controller: 'TMCtrlPaymentView',
        title: 'Payments View',
        access: { requiredLogin: true }
      })
      .when('/lessons', {
        templateUrl: 'partials/lessons-index.html',
        controller: 'TMCtrlLessonsIndex',
        title: 'Lessons Index',
        access: { requiredLogin: true }
      })
      .when('/lessons/create', {
        templateUrl: 'partials/lesson-create.html',
        controller: 'TMCtrlLessonCreate',
        title: 'Lessons Create',
        access: { requiredLogin: true }
      })
      .when('/lessons/:id/view', {
        templateUrl: 'partials/lessons-view.html',
        controller: 'TMCtrlLessonsView',
        title: 'Lesson View',
        access: { requiredLogin: true }
      })
      .when('/users', {
        templateUrl: 'partials/user-index.html',
        controller: 'TMCtrlUserIndex',
        title: 'User Index',
        access: { requiredLogin: true }
      })
      .when('/users/create', {
        templateUrl: 'partials/user-create.html',
        controller: 'TMCtrlUserCreate',
        title: 'Create User',
        access: { requiredLogin: false }
      })
      .when('/users/unconfirmed', {
        templateUrl: 'partials/user-unconfirmed.html',
        //controller: 'TMCtrlUserConfirm',
        title: 'Check Your Email',
        access: { requiredLogin: false }
      })
      .when('/users/confirm/:id', {
        templateUrl: 'partials/user-confirm.html',
        controller: 'TMCtrlUserConfirm',
        title: 'Confirm User',
        access: { requiredLogin: false }
      })
      .when('/login', {
        templateUrl: 'partials/user-login.html',
        controller: 'TMCtrlUser',
        title: 'Login User',
        access: { requiredLogin: false }
      })
      .when('/logout', {
        templateUrl: 'partials/user-logout.html',
        controller: 'TMCtrlUser',
        title: 'User Logout',
        access: { requiredLogin: false }
      })
      ;
  }
]);


TMApp.run([
  '$location', '$rootScope', 'TMUserService',
  function($location, $rootScope, TMUserService) {
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    console.log("Login State:", TMUserService.isLoggedIn());

    if (nextRoute.access.requiredLogin && !TMUserService.isLoggedIn()) {
      $location.path("/login");
    }
  });
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

    $rootScope.title = current.$$route.title;
    $rootScope.bodyClass = current.$$route.bodyClass;
    $rootScope.isLogged = TMUserService.isLogged;
    console.log("boom", $rootScope.isLogged);

  });
}]);
