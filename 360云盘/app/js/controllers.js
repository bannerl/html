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