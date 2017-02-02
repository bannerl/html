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
					
					//全选功能实现
					$scope.selected = false;
					$scope.allselect = function(){
						$scope.selected = !$scope.selected;
						//传播事件修改files的state值
						$scope.$emit("datatran");
					};
					
					//把所有全选关闭
					$scope.newadd = function(){
						$scope.selected = false;
					}
					
					//删除选中的选项
					$scope.deletes = function(){
						$scope.$emit("deletechecked");
					}
				}
			}
			
		}
	}).state("index.allfile",{
		url:"/allfile",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,$rootScope,skyDrivefiles){
			//接受兄弟节点的删除选中命令
			$scope.$on("deletecheckeds",function(e){
				//将需要删除的序号放入数组
				var num = [];
				angular.forEach($scope.files,function(file,i){
					if(file.state){
						num.push(i);
					}
				});
				$rootScope.sortbiglittle(num);
				for(var i =0;i<num.length;i++){
	        		$scope.files.splice(num[i],1);
				}
			});
			//删除单个选项
			$scope.removeme = function(idx){
	        	$scope.files.splice(idx,1);
	        };
	        //从后台获取数据
			skyDrivefiles.getfiles("js/files.json").success(function(data){
				angular.forEach(data,function(_data){
					if(_data.type == '0'){
						_data.icon = 'glyphicon glyphicon-folder-open';
					}else if(_data.type =='1'){
						_data.icon = "glyphicon glyphicon-music";
					}else if(_data.type == '2'){
						_data.icon = "glyphicon glyphicon-picture";
					}else if(_data.type == '3'){
						_data.icon = "glyphicon glyphicon-list-alt";
					}
				});
				//是否显示
				$scope.showcontent = true;
				$scope.files = data;
				
				//接收事件，修改files中的state,以便可以删除选中
				$scope.$on("datatrans",function(e){
					for(var i=0;i<$scope.files.length;i++){
						if($scope.selected){
							$scope.files[i].state = true;
						}else{
							$scope.files[i].state = false;
						}
					}
				});
			});
		}
	}).state("index.movie",{
		url:"/movie",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,$rootScope,$state,skyDrivefiles){
			//接受兄弟节点的删除选中命令
			$scope.$on("deletecheckeds",function(e){
				//将需要删除的序号放入数组
				var num = [];
				angular.forEach($scope.files,function(file,i){
					if(file.state){
						num.push(i);
					}
				});
				$rootScope.sortbiglittle(num);
				for(var i =0;i<num.length;i++){
	        		$scope.files.splice(num[i],1);
				}
			});
			//接收事件，修改files中的state,以便可以删除选中
			$scope.$on("datatrans",function(e){
				for(var i=0;i<$scope.files.length;i++){
					if($scope.selected){
						$scope.files[i].state = true;
					}else{
						$scope.files[i].state = false;
					}
				}
			});
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
		controller:function($scope,$rootScope,skyDrivefiles){
			//接受兄弟节点的删除选中命令
			$scope.$on("deletecheckeds",function(e){
				//将需要删除的序号放入数组
				var num = [];
				angular.forEach($scope.files,function(file,i){
					if(file.state){
						num.push(i);
					}
				});
				$rootScope.sortbiglittle(num);
				for(var i =0;i<num.length;i++){
	        		$scope.files.splice(num[i],1);
				}
			});
			//接收事件，修改files中的state,以便可以删除选中
			$scope.$on("datatrans",function(e){
				for(var i=0;i<$scope.files.length;i++){
					if($scope.selected){
						$scope.files[i].state = true;
					}else{
						$scope.files[i].state = false;
					}
				}
			});
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
		controller:function($scope,$rootScope,skyDrivefiles){
			//接受兄弟节点的删除选中命令
			$scope.$on("deletecheckeds",function(e){
				//将需要删除的序号放入数组
				var num = [];
				angular.forEach($scope.files,function(file,i){
					if(file.state){
						num.push(i);
					}
				});
				$rootScope.sortbiglittle(num);
				for(var i =0;i<num.length;i++){
	        		$scope.files.splice(num[i],1);
				}
			});
			//接收事件，修改files中的state,以便可以删除选中
			$scope.$on("datatrans",function(e){
				for(var i=0;i<$scope.files.length;i++){
					if($scope.selected){
						$scope.files[i].state = true;
					}else{
						$scope.files[i].state = false;
					}
				}
			});
			//删除单个选项
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
		controller:function($scope,$rootScope,skyDrivefiles){
			//接受兄弟节点的删除选中命令
			$scope.$on("deletecheckeds",function(e){
				//将需要删除的序号放入数组
				var num = [];
				angular.forEach($scope.files,function(file,i){
					if(file.state){
						num.push(i);
					}
				});
				$rootScope.sortbiglittle(num);
				for(var i =0;i<num.length;i++){
	        		$scope.files.splice(num[i],1);
				}
			});
			//接收事件，修改files中的state,以便可以删除选中
			$scope.$on("datatrans",function(e){
				for(var i=0;i<$scope.files.length;i++){
					if($scope.selected){
						$scope.files[i].state = true;
					}else{
						$scope.files[i].state = false;
					}
				}
			});
			//删除单个选项
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
