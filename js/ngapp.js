angular.module('App', [])
	.controller('TileController', function ($scope, $http, $filter){

	$http.get('output.json').
  	success(function(data, status) {
	    $scope.scores = data;
		  console.log(status);
	});

	$scope.buttons = [{sport: 'NFL'},{sport: 'NCAA FB'},{sport: 'NBA'},{sport: 'NCAAB'},{sport: 'MLB'}, {sport: 'NHL'}];

	$scope.sportClick = function(button) {
    $scope.selected = button;
  }

  $scope.isSelected = function(button) {
    return $scope.selected === button;
  }

	$scope.something = function(text) {
		console.log(text.substr(4,2));
		return text.substr(4,2);
	}
})
