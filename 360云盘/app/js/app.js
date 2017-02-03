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
					$scope.asides = [
						{
							"url":"index.allfile",
							"state":"",
							"icon":"glyphicon-folder-open",
							"title":"所有文件"
						},
						{
							"url":"index.movie",
							"state":"",
							"icon":"glyphicon-film",
							"title":"视频"
						},
						{
							"url":"index.picture",
							"state":"",
							"icon":"glyphicon-picture",
							"title":"图片"
						},
						{
							"url":"index.music",
							"state":"",
							"icon":"glyphicon-headphones",
							"title":"音乐"
						},
						{
							"url":"index.alt",
							"state":"",
							"icon":"glyphicon-list-alt",
							"title":"文档"
						},
						{
							"url":"index.share",
							"state":"",
							"icon":"glyphicon-share",
							"title":"我的分享"
						},
						{
							"url":"index.heart",
							"state":"",
							"icon":"glyphicon-heart",
							"title":"保险箱"
						},
						{
							"url":"index.reseve",
							"state":"",
							"icon":"glyphicon-envelope",
							"title":"收件箱"
						},
						{
							"url":"index.junk",
							"state":"",
							"icon":"glyphicon-trash",
							"title":"回收站"
						}
					];
					
					//全选功能实现
					$scope.selected = false;
					$scope.allselect = function(){
						$scope.selected = !$scope.selected;
						//传播事件修改files的state值
						$scope.$emit("datatran");
					};
					
					//把所有全选关闭，控制active
					$scope.newadd = function(){
						$scope.selected = false;
						angular.forEach($scope.asides,function(aside){
							aside.state = "";
						});
						this.aside.state = "active";
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
		controller:function($scope,$rootScope,$interval,skyDrivefiles){

		$interval(function(){
			$scope.width();
		},600);
		$scope.width = function(){
			if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
			{
			winHeight = document.documentElement.clientHeight;
			winWidth = document.documentElement.clientWidth;
			}
			if(winWidth<600){
				 $rootScope.xshide = false;
			}else{
				 $rootScope.xshide = true;
			}
		};
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
