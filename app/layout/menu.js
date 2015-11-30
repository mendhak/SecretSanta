'use strict';

angular.module('ssLayout').directive('ssMenu', ['$state',
function($state) {
    return {
        templateUrl: 'layout/menu.html',
        scope: {},
        link: function($scope) {
            $scope.createNiceList = function() {
                $state.go('createNiceList');
            }
        }
    }
}]);
