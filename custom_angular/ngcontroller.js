app.controller('TileController', function ($scope, $http){

	$http.get('output.json').
  		success(function(data, status) {
		    $scope.scores = data;
		    console.log(status);
		})
	}

})

app.controller('ButtonController', function ($scope){

		$scope.button = document.getElementsByTagName('btn');
		button.addEventListener('click', function(){
			console.log(this);
		})

})
