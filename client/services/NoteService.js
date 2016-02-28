(function(window,angular,undefined){
    angular
        .module('lillebror.services',[])
        .factory('NoteService',NoteService);
    
    NoteService.$inject = ['$http'];
    function NoteService($http){
        return {
            add: add,
            list: list,
            get: get,
            update: update,
            delete: remove 
        };
        function add(note){
            return $http({method: 'POST',url: '/api/notes',data: note});
        };
        function list(){
            return $http({method: 'GET',url:'/api/notes'});
        };
        function get(id){
            return $http({method:'GET',url:`/api/notes/${id}`});
        };
        function update(note){
            return $http({method: 'PUT',url:`/api/notes/${note._id}`,data: note});
        };
        function remove(id){
            return $http({method: 'DELETE',url: `/api/notes/${id}`});
        };
    };
})(window,angular);
