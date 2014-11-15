app.controller('TileController', function ($scope, $http){

	$http.get('output.json').
  		success(function(data, status) {
		    $scope.scores = data;
		    console.log(status);
		})
})
