'use strict';

angular.module('ssFacilitator').directive('ssRegisterFacilitator', ['$state', 'ssFacilitatorModel', 'ssFacilitatorRepository',
    function($state, facilitatorModel, facilitatorRepository) {
        return {
            templateUrl: 'facilitator/registerFacilitator.html',
            link: function($scope) {
                $scope.create = function() {                	
                    var facilitator = facilitatorModel.create();

                    facilitator.name = $scope.form.name;
                    facilitator.email = $scope.form.email;

                    facilitatorRepository.saveFacilitator(facilitator);
                };

                $scope.cancel = function() {
                    $state.go('home');
                };
            }
        };
    }
]);
