(function(window,angular,undefined){
    angular.module('lillebror')
        .controller('EditNoteCtrl',EditNoteCtrl);
    EditNoteCtrl.$inject = ['$scope','$routeParams','$location','NoteService'];

    function EditNoteCtrl($scope,$routeParams,$location,NoteService){
        var noteId = $routeParams.id;
        NoteService.get(noteId)
            .then(function(res){
                var note = res.data;
                note.tags = note.tags.map(function(tag){ return {text: tag};});
                note.vocabularies = note.vocabularies.map(function(verb){ return {text: verb};});
                $scope.note = note;
            })
            .catch(function(err){
                debugger;
            });
        $scope.updateNote = function(){
            $scope.note.tags = $scope.note.tags.map(function(tag){ return tag.text;});
            $scope.note.vocabularies = $scope.note.vocabularies.map(function(verb){ return verb.text;});
               
            NoteService.update($scope.note)
                .then(function(res){
                    $location.path('/');
                })
                .catch(function(err){
                    debugger;
                });
        };
    };
})(window,angular);
