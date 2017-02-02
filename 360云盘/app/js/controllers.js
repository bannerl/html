skyDriveApp.controller('uproot', 
    function($scope,$rootScope) {
        $rootScope.rootvalue = "";
        $scope.$on("deletechecked",function(e){
	    	$scope.$broadcast("deletecheckeds");
	    });
	    $scope.$on("datatran",function(e){
	    	$scope.$broadcast("datatrans");
	    });
	    $rootScope.sortbiglittle = function(arr){
	        return arr.sort(function(a,b){
	            return b-a;
	        });
	    };
    }
);
//skyDriveCtrls.controller('BookListCtrl', ['$scope',
//  function($scope) {
//      $scope.greeting = {
//          text: 'bookList'
//      };
//      $scope.pageClass="bookList";
//  }
//]);