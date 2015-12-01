'use strict';

angular.module('ssSecretSanta').directive('ssViewListOfSecretSantas', ['ssListOfSecretSantasService',
    function(listOfSecretSantasService) {
        return {
            scope: {
                //secretSantaList: "="
            },
            templateUrl: 'secretSanta/viewListOfSecretSantas.html',
            link: function($scope) {
                $scope.secretSantaList = listOfSecretSantasService.create();

                $scope.remove = function(secretSanta) {
                    $scope.secretSantaList.list = _.reject($scope.secretSantaList.list, function(item) {
                        return item.isSameData(secretSanta);
                    });
                };
            }
        };
    }
]);
