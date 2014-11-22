var app = angular.module('App', ['ngAnimate','ngRoute']);

app.config(function ($routeProvider){

	$routeProvider.when('/', {
		controller: 'tileController',
		templateUrl: 'views/scores.html'
	});

});

/********FACTORY*********/

app.factory('scoreFactory', function($http){
	
	scores = {};

	scores.getGames = function() {
   		return $http.get('output.json').then(function(result) {
				return result.data;
			})
		};

	return scores;
})

/********CONTROLLERS*********/

app.controller('tileController', ['$scope', '$http', 'scoreFactory', function ($scope, $http, scoreFactory){

   	$scope.getAllScores = function () {
   		scoreFactory.getGames().then(function(data) {
       		return $scope.scores = data;
   		});
   	};

   $scope.getAllScores();

	$scope.sportClick = function(button) {
		console.log(button);
		$scope.selected = button;
	};

	$scope.toggleModal = function(score) {
		$scope.modalShown = !$scope.modalShown;
		$scope.selectedGame = score;
	};

	$scope.isSelected = function(button) {
		return $scope.selected === button;
	};

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
		console.log($scope.scores);
		return $scope.scores;
	};

	var inProgressOn;

	$scope.toggle = function (scores) {
		if (inProgressOn == true) { 
			inProgressOn = false; 
			$scope.isActive = false;
			return $scope.getAllScores();
		} else { 
			inProgressOn = true; 
			$scope.isActive = true;
			return $scope.inProgressGames(scores);
		}
	};

	$scope.modalShown = false;
	$scope.buttons = [{sport: 'NFL'},{sport: 'NCAA FB'},{sport: 'NBA'},{sport: 'NCAAB'},{sport: 'MLB'}, {sport: 'NHL'}];

}])

/********DIRECTIVES*********/

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

app.directive('modalDialog', function(scoreFactory) {
  return {
    restrict: 'E',
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.modalShown = false;
      };
    },
    template: "<div class='ng-modal' ng-show='modalShown'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});
