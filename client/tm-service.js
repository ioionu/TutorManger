var TMAppService = angular.module('TMAppService', ['ngResource']);
TMAppService.factory('TMPayment',
  function($resource) {
    return $resource('api1/payments/:id', {id: '@id'}, {
      query: {
        method: 'GET',
        params:{id:'@id'},
        isArray:true
      },
      save: {
        method: 'POST',
        params: {id:'@id'}
      }
    });
  }
);

TMAppService.factory('TMUser',
  function($resource) {
    return $resource('api1/users/:id', {id: '@id'}, {
      query: {
        method: 'GET',
        params:{id:'@id'},
        isArray:true
      },
      save: {
        method: 'POST',
      }
    });
  }
);

TMAppService.factory('TMUserConfirm',
  function($resource) {
    return $resource('api1/usersconfirm/:id', {}, {
      save: {
        method: 'POST'
      }
    });
  }
);

TMAppService.factory('TMAuthenticationService',
  function() {
    var auth = {
      isLogged: false,
      user: false
    };

    return auth;
  }
);

TMAppService.factory('TMUserService',
  function($http, $window, $location, localStorageService) {
    return {
      logIn: function(username, password) {
        $http.post('api1/login', {username: username, password: password})
        .success(function(data) {
          //TMUserService.isLogged = true;
          //TMUserService.user = data;
          localStorageService.set('isLoggedIn', 'true');
          localStorageService.set('username', data.name);
          localStorageService.set('type', data.type);
          localStorageService.set('token', data.token); //TODO: token based auth

          $location.path("/");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
      },
      logOut: function() {
        console.log("hello logout");
        localStorageService.set('isLoggedIn', 'false');
        localStorageService.set('username', 'Anon');
        localStorageService.remove('type');
        $location.path("/");
      },
      //isLogged: false,
      //user: false,
      isLoggedIn: function(){
        console.log("loggedin", localStorageService.get('isLoggedIn'));

        if(localStorageService.get('isLoggedIn') === 'true') {
          return true;
        } else {
          return false;
        }
      },
      getUserName: function() {
        if(this.isLoggedIn()) {
          return localStorageService.get('username');
        } else {
          return "Anon";
        }
      },
      getUserType: function() {
        return localStorageService.get('type');
      },
      isTutor: function() {
        var type = this.getUserType();
        if(typeof type !== 'undefined') {
          if(type === 'tutor') {
            return true;
          }
        }
        return false;
      }
    };
  }
);


TMAppService.factory('TMLessons',
  function($resource) {
    return $resource('api1/lessons/:id', {id: '@_id'}, {
      query: {
        method: 'GET',
        params:{id:'@_id'},
        isArray:true
      },
      save: {
        method: 'POST',
      },
      update: {
        method: 'PUT',
        params:{id:'@id'},
      }
    });
  }
);


TMAppService.factory('TMTransaction',
  function($resource) {
    return $resource('api1/transactions/:id', {id: '@id'}, {
      query: {
        method: 'GET',
        params:{id:'@id'},
        isArray:true
      },
      save: {
        method: 'POST',
      },
    });
  }
);

//if request is rejected 403 redirect to login
TMAppService.factory(
  'TMAppInterceptor',
  function($q, $location){
    var x = 1+1;
    return {
      request: function(config){
        var x = 2;
        return config;
      },
      requestError: function(reject){
        console.log("i am request error", reject);
        return $q.reject(reject);
      },
      responseError: function(reject){
        console.log("i am response error", reject);
        if(reject.status === 401) {
          $location.path('/login');
        }
        return $q.reject(reject);
      }
    };
  }
);
/*
.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push('TMAppInterceptor');
}]);
*/
//$httpProvider.interceptors.push('TMAppInterceptor');


TMAppService.factory(
  'TokenInterceptor',
  function ($q, $window, AuthenticationService) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },

      response: function (response) {
        return response || $q.when(response);
      }
    };
});
