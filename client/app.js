(function(window,angular,undefined){
    var app = angular.module('lillebror',['ngRoute','ui.bootstrap','ngTagsInput','xeditable','lillebror.services']);
    
    app.config(function($routeProvider){
        $routeProvider
            .when('/',{
                controller: 'HomeCtrl',
                templateUrl: 'views/home.html',
                reloadOnSearch: false
            })
            .when('/notes/new',{
                controller: 'AddNoteCtrl',
                templateUrl: 'views/note/new.html'
            })
            .when('/notes/:id',{
                controller: 'EditNoteCtrl',
                templateUrl: 'views/note/edit.html'
            });
    });
    app.controller('AppCtrl',function($scope){
        
    });
})(window,angular);
