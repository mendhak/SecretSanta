'use strict';

angular.module('ssLayout').directive('ssHeader', ['$state',
    function($state) {
        return {
            templateUrl: 'layout/header.html',
            scope: {},
            link: function($scope) {
                $scope.goHome = function() {
                    $state.go('home');
                };
            }
        };
    }
]);
