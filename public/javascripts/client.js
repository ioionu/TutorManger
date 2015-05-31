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
      ;
  }
]);

TMApp.run(['$location', '$rootScope', function($location, $rootScope) {
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    $rootScope.title = current.$$route.title;
  });
}]);
