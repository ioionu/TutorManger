var TMAppService = angular.module('TMAppService', ['ngResource']);
TMAppService.factory('TMPayment',
  function($resource) {
    return $resource('api1/payments/:id', {id: '@_id'}, {
      query: {
        method: 'GET',
        params:{id:'@_id'},
        isArray:true
       },
    })
  }
);

TMAppService.factory('TMUser',
  function($resource) {
    return $resource('api1/users/:id', {id: '@_id'}, {
      query: {
        method: 'GET',
        params:{id:'@_id'},
        isArray:true
      },
      save: {
        method: 'POST',
      },
    })
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
    })
  }
);
