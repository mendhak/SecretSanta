'use strict';

angular.module('ssLayout').directive('ssMainMenu', ['$state', 'ssMenuOptionModel',
    function($state, menuOptionModel) {
        return {
            templateUrl: 'layout/menu.html',
            link: function($scope) {
                var registerFacilitator =
                    menuOptionModel.create(
                        function() {
                            $state.go('facilitator');
                        },
                        "Register As A Facilitator");

                var manageFacilitatorDetails =
                    menuOptionModel.create(
                        function() {
                            $state.go('facilitator.manage');
                        },
                        "Manage Facilitator Details");

                var viewSecretSantaDetails =
                    menuOptionModel.create(
                        function() {
                            $state.go('viewSecretSantaDetails');
                        },
                        "View My Secret Santa Details");

                $scope.menuOptions = [
                    registerFacilitator,
                    manageFacilitatorDetails,
                    viewSecretSantaDetails
                ];
            }
        };
    }
]);
