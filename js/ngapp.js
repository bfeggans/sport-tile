var app = angular.module('App', ['ngAnimate'])

app.controller('TileController', function ($scope, $http, $filter, $timeout){
	$scope.getScores = function () {
		$http.get('output.json').
				success(function(data, status) {
		    	return $scope.scores = data;
			  	console.log(status);
				});
			}

	$scope.getScores();
	
	$scope.buttons = [{sport: 'NFL'},{sport: 'NCAA FB'},{sport: 'NBA'},{sport: 'NCAAB'},{sport: 'MLB'}, {sport: 'NHL'}];

	$scope.sportClick = function(button) {
    $scope.selected = button;
		$scope.getScores();
  }

  $scope.isSelected = function(button) {
    return $scope.selected === button;
  }

	$scope.inProgressGames = function(scores) {
		var inProgress = [];
		for (var i = 0; i < scores.length; i++) {
			if (scores[i].timeRem.length === 6) {
				if (!(scores[i].timeRem.substr(4,2) == 'PM') && !(scores[i].timeRem == 'Final')){
					inProgress.push(scores[i]);
				}
			} else
				if (!(scores[i].timeRem.substr(5,2) == 'PM') && !(scores[i].timeRem == 'Final')){
					inProgress.push(scores[i]);
				}
		}
		$scope.scores = inProgress;
		return $scope.scores;
	}

	var called = false;

	$scope.toggle = function (scores) {
		if (called) { called = false; return $scope.getScores(); }
		$scope.inProgressGames(scores);
		called = true;
	}
})

app.directive("enter", function () {
	return function (scope, element, attrs) {
		element.bind("mouseenter", function () {
			element.addClass(attrs.enter);
		})
	}
})

app.directive("leave", function () {
	return function (scope, element, attrs) {
		element.bind("mouseleave", function () {
			element.removeClass(attrs.leave);
		})
	}
})

app.directive("gamescore", function () {
	return {
		restrict: "E",
		template: '<a href=""><div class="scoreTable"><div class="sportCell"> {{ score.sport }} </div><div class="teamCell"> {{ score.team1 }} </div><div class="scoreCell"> {{ score.team1Pts }} </div><div class="teamCell"> {{ score.team2 }} </div><div class="scoreCell"> {{ score.team2Pts }} </div><div class="timeCell"> {{ score.timeRem }} </div></div></a>'
	}
})

app.directive("sportbtn", function () {
	return {
		restrict: "E",
		template: '<button ng-click="sportClick(button); isActive = false" class="btn btn-primary" ng-class="{"btn-success" : isSelected(button)}"> {{ button.sport }} </button>'
	}
})
