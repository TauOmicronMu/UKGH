var indexApp = angular.module("indexApp", []);

indexApp.directive('ngEnter', ngEnter);

indexApp.controller("IndexController", function($scope, $http) {
	
	$scope.loadUserData = function(){
		var username = $scope.username.trim();
		if(username === ""){
			return;
		}
		
		$scope.loadingUserData = true;
		
		$http.get('http://localhost:8080/api/user/' + username)
			.then(function(userData){
				$scope.userData = userData;
			}, function(){
				console.log("Error");
			});
	};
	
	$scope.username = "";
	$scope.loadingUserData = false;
});