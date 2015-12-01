'use strict';

angular.module('ssLayout').directive('ssMenu', ['$state',
function($state) {
    return {
        templateUrl: 'layout/menu.html',
        scope: {},
        link: function($scope) {
            $scope.createSecretSantaList = function() {
                $state.go('createSecretSantaList');
            }
        }
    }
}]);
