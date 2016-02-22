(function(window,angular,undefined){
    var app = angular.module('lillebror',['ngMaterial','ngRoute']);
    
    app.config(function($mdThemingProvider){
        $mdThemingProvider.theme('default')
		    .primaryPalette('green')
		    .accentPalette('indigo');
    });
    app.config(function($routeProvider){
        $routeProvider.when('/',{
            controller: 'HomeCtrl',
            templateUrl: 'views/home.html'
        });
    });
    app.controller('AppCtrl',function($scope){
        
    });
})(window,angular);
