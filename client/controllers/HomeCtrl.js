(function(window,angular,undefined){
    angular
        .module('lillebror')
        .controller('HomeCtrl',HomeCtrl);
    HomeCtrl.$inject = ['$scope','NoteService'];
    function HomeCtrl($scope,NoteService){
        refresh();
        function refresh(){
            NoteService.list()
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
