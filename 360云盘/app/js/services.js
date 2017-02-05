//返回后台数据
skyDriveApp.service('skyDrivefiles',
	function($http){
		this.getfiles = function(data){
	    	return $http({
	    		method:"GET",
	    		url:data
	    	});
	   };
	}
);

//返回屏幕尺寸
skyDriveApp.service('edaptive',
	function($rootScope){
		this.client = function(){
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
		}
	});
