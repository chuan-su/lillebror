(function(window,angular,undefined){
    angular
        .module('lillebror')
        .controller('HomeCtrl',HomeCtrl);
    HomeCtrl.$inject = ['$scope','$location','$route','NoteService'];
    
    function HomeCtrl($scope,$location,$route,NoteService){
        $scope.currentPage = 1;
        $scope.pagination = {
            maxSize: 5,
            numPerPage: 2,
            boundaryLinks: true,
           
            goto: function(){
                debugger;
                $location.search('page',$scope.currentPage);
            }
        };
       
        function refresh(){
            var page = $location.search().page;
            if(page){
                $scope.currentPage = page;

                debugger;
            }
            listNotes();
        };
        $scope.$on('$routeUpdate',refresh);
        
        refresh();

        function listNotes(){
            debugger;
            NoteService.list(($scope.currentPage-1))
                .then(function(res){
                    var result = res.data;
                    $scope.notes = result.notes;
                    $scope.pagination.totalItems = result.count;
                })
                .catch(function(err){
                    debugger;
                });
        };
        $scope.searchNotes = function(){
            if(!$scope.query.length) return refresh();
            NoteService.search($scope.query)
                .then(function(res){
                    $scope.notes = res.data;
                })
                .catch(function(err){
                    debugger;
                });
        };
        $scope.deleteNote = function(id){
            NoteService.delete(id)
                .catch(function(err){
                    debugger;
                })
                .then(function(){
                    return refresh();
                });
        };
    }
    
})(window,angular);
