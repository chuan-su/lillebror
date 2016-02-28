(function(window,angular,undefined){
    angular
        .module('lillebror')
        .controller('HomeCtrl',HomeCtrl);
    HomeCtrl.$inject = ['$scope','NoteService'];
    function HomeCtrl($scope,NoteService){
        NoteService.list()
            .then(function(res){
                $scope.notes = res.data;
            })
            .catch(function(err){
                debugger;
            });
    }
    
})(window,angular);
