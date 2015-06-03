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
    })
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
      },
    });
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
