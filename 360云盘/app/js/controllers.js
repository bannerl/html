skyDriveApp.controller('uproot', 
    function($scope,$rootScope) {
        $rootScope.rootvalue = "";
        $scope.$on("deletechecked",function(e){
	    	$scope.$broadcast("deletecheckeds");
	    });
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