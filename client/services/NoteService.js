(function(window,angular,undefined){
    angular
        .module('lillebror.services',[])
        .factory('NoteService',NoteService);
    
    NoteService.$inject = ['$http'];
    function NoteService($http){
        return {
            add: add,
            list: list,
            delete: remove 
        };
        function add(note){
            return $http({method: 'POST',url: '/api/notes',data: note});
        };
        function list(){
            return $http({method: 'GET',url:'/api/notes'});
        };
        function remove(id){
            return $http({method: 'DELETE',url: `/api/notes/${id}`});
        };
    };
})(window,angular);
