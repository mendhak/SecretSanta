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

                    var success = function(response) {
                        if (!_.isUndefined(response) && response.status == 0) {
                            $state.go('facilitator.manage', { id: response.data._id });
                        }
                    };

                    var error = function(response) {
	                    // TODO: 
	                    console.log(response);
                    };

                    facilitatorRepository.createFacilitator(facilitator).then(success, error);
                };

                $scope.cancel = function() {
                    $state.go('home');
                };
            }
        };
    }
]);
