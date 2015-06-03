angular.module('TMFilters', []).filter('TMCCYearRange', function() {
  return function(input) {
    var this_year = (new Date()).getFullYear();
    for (var i=this_year; i<(this_year+10); i++)
      input.push(i);
    return input;
  };
});
