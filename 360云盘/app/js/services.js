//var skyDriveApp = angular.module('skyDrive', []);

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
skyDriveApp.service("skyDrives",function(){
	this.add = function(){
		return {"name":"d"};
		
	}
});