describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe("TMCtrlIndex", function() {
  beforeEach(module('TMApp'));
  it('should display the homepage', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('TMCtrlIndex', {$scope:scope});
    expect(scope.hello).toBe("The easiest way to manage your class!");
    console.log("ctrl", ctrl, scope);
  }));
});

describe("TMCtrlPaymentIndex", function() {
  beforeEach(module('TMApp'));
  it('should display list of payments', inject(function($controller) {
    var scope = {};
    var ctrl = $controller("TMCtrlPaymentIndex", {$scope: scope});
    expect(scope).toBeDefined();
  }));
});
