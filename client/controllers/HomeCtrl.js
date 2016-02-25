(function(window,angular,undefined){
    angular.module('lillebror').controller('HomeCtrl',function($scope){
        $scope.notes = [
            {
                body: 'jag kan tyvärr inte komma (unfortunately, I cannot come)',
                vocabularies: ['tyvärr'],
                tags: ['dairly']
            },
            {
                body: 'Skall bli spännande att prova.',
                vocabularies: ['spännande'],
                tags: ['dairly']
            },
            {
                body: 'Vi har fixat de problem som vi pratade på Skype mötet senast.',
                vocabularies: ['fixat','senast','mötet'],
                tags: ['på jobbet']
            }
        ];
    });
})(window,angular);
