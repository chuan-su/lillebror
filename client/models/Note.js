(function(window,angular,undefined){
    angular.module('lillebror.models').factory('Note',function(){
        function Note(note){
            if(!(this instanceof Note))
                return new Note(note);
            this.body = note.body;
            this.vocabularies = note.vocabularies;
            this.tags = note.tags;
        };
        return Note;
    });
})(window,angular);
