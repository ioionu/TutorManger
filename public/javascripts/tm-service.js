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
