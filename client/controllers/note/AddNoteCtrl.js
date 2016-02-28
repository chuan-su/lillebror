(function(window,angular,undefined){
    angular.module('lillebror')
        .controller('AddNoteCtrl',AddNoteCtrl);
    
    AddNoteCtrl.$inject = ['$scope','$http','NoteService'];
    function AddNoteCtrl($scope,$http,NoteService){
        $scope.addNote = function(){
            $scope.note.tags = $scope.note.tags.map(function(tag){
                return tag.text;
            });
            $scope.note.vocabularies = $scope.note.vocabularies.map(function(verb){
                return verb.text;
            });
            NoteService.add($scope.note)
                .then(function(res){
                    $scope.note = {};
                    return $scope.listNotes();
                })
                .catch(function(err){
                    debugger;
                });
        };
        $scope.listNotes = function(){
            NoteService.list()
                .then(function(res){
                    $scope.notes = res.data;
                })
                .catch(function(err){
                    debugger;
                });
        };
        $scope.note = {};
        $scope.listNotes();
        
    }   
})(window,angular);
