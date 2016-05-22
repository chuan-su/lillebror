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
            delete: remove,
            search: search
        };
        function add(note){
            return $http({method: 'POST',url: '/api/notes',data: note});
        };
        function list(range){
            return $http({method: 'GET',url:'/api/notes',params:{range: range}});
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
        function search(query){
            return $http({method: 'GET',url:'/api/notes/_search',params:{verb: query}});
        }
    };
})(window,angular);
