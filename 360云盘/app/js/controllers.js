skyDriveApp.controller('uproot', 
    function($scope,$rootScope) {
        $rootScope.xshide = true;
       //接受全选事件
       $scope.$on("deletechecked",function(e){
	    	$scope.$broadcast("deletecheckeds");
	    });
	    //接收删除事件
	    $scope.$on("datatran",function(e){
	    	$scope.$broadcast("datatrans");
	    });
	    //判断刷新前的main 的active
	    $scope.$on("mainactive",function(e){
	    	$scope.$broadcast("mainactives");
	    });
	    //接收新建文件夹事件
	    $scope.$on("newaddfiles",function(e){
	    	$scope.$broadcast("addnewfile");
	    });
	    //数组排序函数
	    $rootScope.sortbiglittle = function(arr){
	        return arr.sort(function(a,b){
	            return b-a;
	        });
	    };
    }
);
skyDriveApp.controller('loaddata', 
    function($scope,$rootScope,$location,$state,skyDrivefiles){
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
);