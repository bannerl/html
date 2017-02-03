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
				controller:function($scope,$rootScope,$location,$state,skyDrivefiles){
					$scope.operas = [
						{
							"state":"btn-default",
							"icon":"glyphicon-upload",
							"title":"上传",
							"func":""
						},
						{
							"state":"btn-default",
							"icon":"glyphicon-plus-sign",
							"title":"新建文件夹",
							"func":""
						},
						{
							"state":"btn-default",
							"icon":"glyphicon-check",
							"title":"全选",
							"func":""
						},
						{
							"state":"btn-default",
							"icon":"glyphicon-remove-circle",
							"title":"删除",
							"func":""
						}
					];
					skyDrivefiles.getfiles("js/asides.json").success(function(data){
						$scope.asides = data;
					});
					
					//执行operas函数,执行新建文件删除全选等功能
					$scope.allfunc = function(i){
						if(i=="2"){
							$scope.allselect();
						}else if(i=="3"){
							$scope.deletes();
						}else if(i=="1"){
							$scope.newfile();
						}
						//active切换
						angular.forEach($scope.operas,function(opera){
							opera.state = "btn-default";
						});
						this.opera.state = "btn-primary";
					};
					$scope.newfile = function(){
						$scope.$emit("newaddfiles");
					};

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
					};
					$scope.$on("mainactives",function(e){
						angular.forEach($scope.asides,function(aside){
							if($state.current.name == aside.url){
								aside.state = "active";
							}
						});
					});

					//删除选中的选项
					$scope.deletes = function(){
						$scope.$emit("deletechecked");
					};
				}
			}
			
		}
	}).state("index.allfile",{
		url:"/allfile",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,$rootScope,$state,$interval,$window,skyDrivefiles){
			//获取client尺寸，对样式操作,将选项右侧四个功能键删除
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
			//打开文件夹
			$scope.addnewpage = function(i){
				if(i=="0"){
					$state.go("index.nocontent");
				}
			}
			//接收父亲的新建文件夹命令
			$scope.$on("addnewfile",function(e){
				name = $window.prompt("请输入文件名");
				  
				obj = {};
				if(name!=""&&name!="null"){
					obj.name = name;
					obj.type = "0";
					obj.icon = "glyphicon glyphicon-folder-open";
					obj.state = false;
					$scope.files.unshift(obj);
				}
			});
			//接受父亲节点的删除选中命令
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
						_data.func = "0";
					}else if(_data.type =='1'){
						_data.func = "1";
						_data.icon = "glyphicon glyphicon-music";
					}else if(_data.type == '2'){
						_data.func = "1";
						_data.icon = "glyphicon glyphicon-picture";
					}else if(_data.type == '3'){
						_data.func = "1";
						_data.icon = "glyphicon glyphicon-list-alt";
					}
				});
				//是否显示
				$scope.showcontent = true;
				$scope.files = data;
				//记录历史记录的main 的active
				$scope.$emit("mainactive");
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
		controller:function($scope,$rootScope,$window,$state,skyDrivefiles){
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
			//接收父亲的新建文件夹命令
			$scope.$on("addnewfile",function(e){
				name = $window.prompt("请输入文件名");
				obj = {};
				if(name!=""&&name!="null"){
					obj.name = name;
					obj.type = "0";
					obj.icon = "glyphicon glyphicon-folder-open";
					obj.state = false;
					$scope.files.unshift(obj);
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
				//记录历史记录的main 的active
				$scope.$emit("mainactive");
				if($scope.boo){
					$scope.showcontent = true;
					$scope.files = data;
				}else{
					$scope.showcontent = false;
					//$state.go("index.nocontent");
					$scope.files = [{"name":"暂无"}];
				}
			});
		}
	}).state("index.picture",{
		url:"/img",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,$rootScope,$window,skyDrivefiles){
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
			//接收父亲的新建文件夹命令
			$scope.$on("addnewfile",function(e){
				name = $window.prompt("请输入文件名");
				  
				obj = {};
				if(name!=""&&name!="null"){
					obj.name = name;
					obj.type = "0";
					obj.icon = "glyphicon glyphicon-folder-open";
					obj.state = false;
					$scope.files.unshift(obj);
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
				//记录历史记录的main 的active
				$scope.$emit("mainactive");
			});
		}
	}).state("index.music",{
		url:"/music",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,$rootScope,$window,skyDrivefiles){
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
			//接收父亲的新建文件夹命令
			$scope.$on("addnewfile",function(e){
				name = $window.prompt("请输入文件名");
				  
				obj = {};
				if(name!=""&&name!="null"){
					obj.name = name;
					obj.type = "0";
					obj.icon = "glyphicon glyphicon-folder-open";
					obj.state = false;
					$scope.files.unshift(obj);
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
				//记录历史记录的main 的active
				$scope.$emit("mainactive");
			});
		}
	}).state("index.alt",{
		url:"/alt",
		templateUrl:"tpls/allfile.html",
		controller:function($scope,$rootScope,$window,skyDrivefiles){
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
			//接收父亲的新建文件夹命令
			$scope.$on("addnewfile",function(e){
				name = $window.prompt("请输入文件名");
				  
				obj = {};
				if(name!=""&&name!="null"){
					obj.name = name;
					obj.type = "0";
					obj.icon = "glyphicon glyphicon-folder-open";
					obj.state = false;
					$scope.files.unshift(obj);
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
				//记录历史记录的main 的active
				$scope.$emit("mainactive");
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
	}).state("index.skyclt",{
		url:"/skyclt",
		views:{
			"main@index":{
				templateUrl:"tpls/sharemain.html"
			}
		}
	}).state("index.skyclt.content",{
		url:"/content",
		templateUrl:"tpls/clt.html"

	}).state("index.skybis",{
		url:"/skybis",
		views:{
			"main@index":{
				templateUrl:"tpls/bismain.html"
			}
		}
	});
});
