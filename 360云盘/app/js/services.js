//var skyDriveApp = angular.module('skyDrive', []);

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


