'use strict';

angular.module('ssFacilitator').directive('ssRegisterFacilitator', ['$state', 'ssFacilitatorModel',
    function($state, facilitatorModel) {
        return {
            templateUrl: 'facilitator/registerFacilitator.html',
            link: function($scope) {
                $scope.create = function() {                	
                    var facilitator = facilitatorModel.create($scope.form);
                    $state.go('')
                };

                $scope.cancel = function() {
                    $state.go('home');
                };
            }
        };
    }
]);
