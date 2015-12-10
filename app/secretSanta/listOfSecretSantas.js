'use strict';

angular.module('ssSecretSanta').directive('ssListOfSecretSantas', ['ssListOfSecretSantasService',
    function(listOfSecretSantasService) {
        return {
            scope: {
                //secretSantaList: "="
                facilitatorId: "@",
                mode: "="
            },
            templateUrl: 'secretSanta/listOfSecretSantas.html',
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
