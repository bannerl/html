var skyDriveApp = angular.module('skyDrive', ['ui.router']);

skyDriveApp.config(function($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise("index");
	$stateProvider.state("index",{
		url:"/index",
		views:{
			"":{
				templateUrl:"tpls/index.html"
			},
			"topbar@index":{
				templateUrl:"tpls/topbar.html",
				controller:function($scope){
					
				}
			},
			"main@index":{
				templateUrl:"tpls/main.html",
				controller:function($scope,$rootScope){
					$scope.selected = false;
					
					$scope.allselect = function(){
						$scope.selected = !$scope.selected;
					};
					//把所有全选关闭
					$scope.newadd = function(){
						$rootScope.rootvalue = false;
					}
					$scope.deletes = function(){
						$scope.$emit("deletecheckeds");
					}
//					$scope.$on("deletechecked",function(e){
//						
//					});
				}
			}
			
		}
	}).state("index.allfile",{
		url:"/allfile",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,skyDrivefiles){
			$scope.$on("deletecheckeds",function(e){
				
			});
			$scope.removeme = function(idx){
	        	$scope.files.splice(idx,1);
	        	console.log($scope.files);
	        };
			skyDrivefiles.getfiles("js/files.json").success(function(data){
				angular.forEach(data,function(_data){
					if(_data.type == 0){
						_data.icon = 'glyphicon glyphicon-folder-open';
					}else if(_data.type == 1){
						_data.icon = "glyphicon glyphicon-music";
					}else if(_data.type == 2){
						_data.icon = "glyphicon glyphicon-picture";
					}
				});
				$scope.showcontent = true;
				$scope.files = data;
			});
		}
	}).state("index.movie",{
		url:"/movie",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,$state,skyDrivefiles){
			$scope.removeme = function(idx){
	        	$scope.files.splice(idx,1);
	        };
			skyDrivefiles.getfiles("js/files.json").success(function(data){
				$scope.files = [];
				angular.forEach(data,function(_data){
					if(_data.type == "5"){
						$scope.boo = true;
					}else{
						$scope.boo = false;
					}
				});
				if($scope.boo){
					$scope.showcontent = true;
					$scope.files = data;
				}else{
					$scope.showcontent = false;
					$state.go("index.nocontent");
					//$scope.files = [{"name":"暂无"}];
				}
			});
		}
	}).state("index.picture",{
		url:"/img",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,skyDrivefiles){
			$scope.removeme = function(idx){
	        	$scope.files.splice(idx,1);
	        };
			skyDrivefiles.getfiles("js/files.json").success(function(data){
				$scope.data = [];
				i = 0;
				angular.forEach(data,function(_data){
					if(_data.type == "2"){
						$scope.data[i] = {};
						$scope.data[i]["name"] = _data.name;
						$scope.data[i]["icon"] = "glyphicon glyphicon-picture";
						i++;
					}
					if(i == 0){
						$scope.boo = false;
					}else{
						$scope.boo = true;
					}
				});
				if($scope.boo){
					$scope.showcontent = true;
					$scope.files = $scope.data;
				}else{
					$scope.showcontent = false;
					$scope.files = [{"name":"暂无"}];
				}
			});
		}
	}).state("index.music",{
		url:"/music",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,skyDrivefiles){
			$scope.removeme = function(idx){
	        	$scope.files.splice(idx,1);
	        };
			skyDrivefiles.getfiles("js/files.json").success(function(data){
				$scope.data = [];
				i = 0;
				angular.forEach(data,function(_data){
					if(_data.type == "1"){
						$scope.data[i] = {};
						$scope.data[i]["name"] = _data.name;
						$scope.data[i]["icon"] = "glyphicon glyphicon-music";
						i++;
					}
					if(i == 0){
						$scope.boo = false;
					}else{
						$scope.boo = true;
					}
				});
				if($scope.boo){
					$scope.showcontent = true;
					$scope.files = $scope.data;
				}else{
					$scope.showcontent = false;
					$scope.files = [{"name":"暂无"}];
				}
			});
		}
	}).state("index.alt",{
		url:"/alt",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,skyDrivefiles){
			$scope.removeme = function(idx){
	        	$scope.files.splice(idx,1);
	        };
			skyDrivefiles.getfiles("js/files.json").success(function(data){
				$scope.data = [];
				i = 0;
				angular.forEach(data,function(_data){
					if(_data.type == "3"){
						$scope.data[i] = {};
						$scope.data[i]["name"] = _data.name;
						$scope.data[i]["icon"] = "glyphicon glyphicon-list-alt";
						i++;
					}
					if(i == 0){
						$scope.boo = false;
					}else{
						$scope.boo = true;
					}
				});
				if($scope.boo){
					$scope.showcontent = true;
					$scope.files = $scope.data;
				}else{
					$scope.showcontent = false;
					$scope.files = [{"name":"暂无"}];
				}
			});
		}
	}).state("index.nocontent",{
		url:"/nocontent",
		templateUrl:"tpls/nocontent.html"
	}).state("index.share",{
		url:"/share",
		templateUrl:"tpls/nocontent.html",
		controller:function($scope){
			$scope.content = "没有分享过内容，";
		}
	}).state("index.heart",{
		url:"/heart",
		templateUrl:"tpls/nocontent.html",
		controller:function($scope){
			$scope.content = "保险箱没有内容，";
		}
	}).state("index.reseve",{
		url:"/reseve",
		templateUrl:"tpls/nocontent.html",
		controller:function($scope){
			$scope.content = "没有收到朋友的分享，";
		}
	}).state("index.junk",{
		url:"/junk",
		templateUrl:"tpls/junk.html"
	});
});
