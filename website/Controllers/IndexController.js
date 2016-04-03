var indexController = function($scope, $http, $interval) {
	
	$scope.loadUserData = function(){
		var username = $scope.username.trim();
		if(username === ""){
			return;
		}
		
		$scope.loadingUserData = true;
		
		$http.get('/api/user/' + username)
			.then(function(data){
				$scope.loadingUserData = false;
				updateUserData(data.data);
			}, function(){
				$scope.loadingUserData = false;
				console.log("Error");
			});
	};
	
	function updateUserData(userData){
		var index = 0;
		var newUserData = { 
			nodes: [],
			links: []
		};
		
		var existingUsers = {};
		
		var centralUser = { index: index, name: userData.login, 
						    avatar: userData.avatar_url, layer: 0 };
		newUserData.nodes.push(centralUser);
		
		existingUsers[centralUser.name] = index;
		
		index++;
		
		for (login in userData.followers){
			if(login in existingUsers){
				continue;
			}
			
			var follower = userData.followers[login];
			
			console.log(follower);
			
			var user = {index: index, name: login, avatar: follower.avatar_url, layer: 1};
			newUserData.nodes.push(user);
			existingUsers[login] = index;
			
			index++;
			
			for (subUserLogin in userData.followers){
				if(subUserLogin in existingUsers){
					continue;
				}
				
				var follower = userData.followers[subUserLogin];
				console.log(follower);
				var subUser = {index: index, name: subUserLogin, avatar: follower.avatar_url, layer: 2};
				newUserData.nodes.push(subUser);
				existingUsers[subUserLogin] = index;
				
				index++;
			};
		};
		
		console.log(existingUsers);
		
		$scope.userData = newUserData;
	}
	
	/*
	Node {
		index
		name
		avatar
		layer
	}
	Link {
		source (index)
		target (index)
	}
	*/
	
	$scope.userData = {
		nodes: [],
		links: []
	};
	
	/*$interval(function(){
		$scope.userData = {
			nodes: [{ index: 0, group: 1, name: "A" }, { index: 1, group: 1, name: "B" }, 
					{ index: 2, group: 2, name: "C" }, { index: 3, group: 3, name: "D" }],
			links: [{ source: 0, target: 1 }, { source: 1, target: 0 }, { source: 0, target: 3 }]
		};
	}, 3000, 1);*/
	$scope.username = "";
	$scope.loadingUserData = false;
};
