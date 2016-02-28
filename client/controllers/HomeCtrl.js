(function(window,angular,undefined){
    angular.module('lillebror').controller('HomeCtrl',function($scope){
        $scope.notes = [
            {
                _id : 1,
                body: 'jag kan tyvärr inte komma (unfortunately, I cannot come)',
                vocabularies: ['tyvärr'],
                tags: ['dairly']
            },
            {
                _id: 2,
                body: 'Skall bli spännande att prova.',
                vocabularies: ['spännande'],
                tags: ['dairly']
            },
            {
                _id: 3,
                body: 'Vi har fixat de problem som vi pratade på Skype mötet senast.',
                vocabularies: ['fixat','senast','mötet'],
                tags: ['på jobbet','test']
            }
        ];
    });
})(window,angular);
