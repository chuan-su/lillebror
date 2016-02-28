(function(window,angular,undefined){
    var app = angular.module('lillebror',['ngRoute','ngTagsInput','lillebror.services']);
    
    app.config(function($routeProvider){
        $routeProvider
            .when('/',{
                controller: 'HomeCtrl',
                templateUrl: 'views/home.html'
            })
            .when('/notes/new',{
                controller: 'AddNoteCtrl',
                templateUrl: 'views/note/new.html'
            });
    });
    app.controller('AppCtrl',function($scope){
        
    });
})(window,angular);
