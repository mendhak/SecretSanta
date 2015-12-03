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

            $scope.manageSecretSantaList = function() {
            	$state.go('manageSecretSantaList');
            }

            $scope.viewSecretSantaDetails = function() {
            	$state.go('viewSecretSantaDetails');
            }
        }
    }
}]);
