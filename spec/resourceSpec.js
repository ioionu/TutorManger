describe('TMPayment', function () {
  var mockPaymentResource, $httpBackend;
  beforeEach(angular.mock.module('TMApp'));

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockPaymentResource = $injector.get('TMPayment');
    });
  });

  describe('get payment index', function () {
    it('should call query with id', inject(function (TMPayment) {
      $httpBackend.expectGET('api1/payments')
        .respond(
          [{"id":1,"description":"test payment","amount":"20","status":"paid"},
          {"id":2,"description":"test payment 2","amount":"10","status":"unpaid"}]
        );
      var result = mockPaymentResource.query('1');
      $httpBackend.flush();
      expect(result.length).toEqual(2);
    }));

  });

  describe('get payment instance', function () {
    it('should return json of payment', inject(function (TMPayment) {
      $httpBackend.expectGET('api1/payments/1')
        .respond(
          [{"id":1,"description":"test payment","amount":"20","status":"paid"}]
        );
      var result = mockPaymentResource.query({id:'1'});
      $httpBackend.flush();
      expect(result[0].description).toEqual("test payment");
    }));

  });

});


describe('TMUser', function () {
  var mockTMUserResource, $httpBackend;
  beforeEach(angular.mock.module('TMApp'));

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockUserResource = $injector.get('TMUser');
    });
  });

  describe('get user index', function () {
    it('should get json of user index', inject(function (TMUser) {
      $httpBackend.expectGET('api1/users')
        .respond(
          [{"id":1,"email":"student@localhost","name":"Test Student","type":"student","status":"active"},{"id":2,"email":"student2@localhost","name":"Test2 Student2","type":"student","status":"active"},{"id":3,"email":"teacher@localhost","name":"Test Teacher","type":"tutor","status":"active"}]
        );
      var result = mockUserResource.query('1');
      $httpBackend.flush();
      expect(result.length).toEqual(3);
    }));

  });

  describe('get user instance', function () {
    it('should return json of user', inject(function (TMUser) {
      $httpBackend.expectGET('api1/users/1')
        .respond(
          [{"id":1,"email":"student@localhost","name":"Test Student","type":"student","status":"active"}]
        );
      var result = mockUserResource.query({id:'1'});
      $httpBackend.flush();
      expect(result[0].name).toEqual("Test Student");
    }));
  });

});

describe('TMLessons', function () {
  var mockTMLessonsResource, $httpBackend;
  beforeEach(angular.mock.module('TMApp'));

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockTMLessonsResource = $injector.get('TMLessons');
    });
  });

  describe('get TMLessons', function () {
    it('should get json of TMLessons index', inject(function (TMLessons) {
      $httpBackend.expectGET('api1/lessons')
        .respond(
          [{"id":1,"lesson_date":"1999-01-01T08:00:00.000Z","lesson_date_end":"1999-01-01T09:30:00.000Z","status":"confirmed","tutor_name":"Test Teacher","student_name":"Test Student"},{"id":2,"lesson_date":"2015-07-01T10:00:00.000Z","lesson_date_end":"2015-07-01T10:30:00.000Z","status":"confirmed","tutor_name":"Test Teacher","student_name":"Test Student"}]
        );
      var result = mockTMLessonsResource.query('1');
      $httpBackend.flush();
      expect(result.length).toEqual(2);
    }));

  });

  describe('get TMLessons instance', function () {
    it('should return json of TMLessons', inject(function (TMLessons) {
      $httpBackend.expectGET('api1/lessons/1')
        .respond(
          [{"id":1,"lesson_date":"1999-01-01T08:00:00.000Z","lesson_date_end":"1999-01-01T09:30:00.000Z","status":"confirmed","tutor_name":"Test Teacher","student_name":"Test Student"}]
        );
      var result = mockTMLessonsResource.query({id:'1'});
      $httpBackend.flush();
      expect(result[0].tutor_name).toEqual("Test Teacher");
    }));
  });

});

describe('TMLessons', function () {
  var mockTMLessonsResource, $httpBackend;
  beforeEach(angular.mock.module('TMApp'));

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockTMLessonsResource = $injector.get('TMLessons');
    });
  });

  describe('get TMLessons', function () {
    it('should get json of TMLessons index', inject(function (TMLessons) {
      $httpBackend.expectGET('api1/lessons')
        .respond(
          [{"id":1,"lesson_date":"1999-01-01T08:00:00.000Z","lesson_date_end":"1999-01-01T09:30:00.000Z","status":"confirmed","tutor_name":"Test Teacher","student_name":"Test Student"},{"id":2,"lesson_date":"2015-07-01T10:00:00.000Z","lesson_date_end":"2015-07-01T10:30:00.000Z","status":"confirmed","tutor_name":"Test Teacher","student_name":"Test Student"}]
        );
      var result = mockTMLessonsResource.query('1');
      $httpBackend.flush();
      expect(result.length).toEqual(2);
    }));

  });

  describe('get TMLessons instance', function () {
    it('should return json of TMLessons', inject(function (TMLessons) {
      $httpBackend.expectGET('api1/lessons/1')
        .respond(
          [{"id":1,"lesson_date":"1999-01-01T08:00:00.000Z","lesson_date_end":"1999-01-01T09:30:00.000Z","status":"confirmed","tutor_name":"Test Teacher","student_name":"Test Student"}]
        );
      var result = mockTMLessonsResource.query({id:'1'});
      $httpBackend.flush();
      expect(result[0].tutor_name).toEqual("Test Teacher");
    }));
  });

});
