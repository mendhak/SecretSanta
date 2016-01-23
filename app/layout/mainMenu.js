'use strict';

angular.module('ssLayout').directive('ssMainMenu', ['$state', 'ssMenuOptionModel',
    function($state, menuOptionModel) {
        return {
            templateUrl: 'layout/menu.html',
            link: function($scope) {
                var facilitatorRegistration =
                    menuOptionModel.create(
                        function() {
                            $state.go('facilitator.register');
                        },
                        "Register A New Facilitator");

                var facilitatorLogin =
                    menuOptionModel.create(
                        function() {
                            $state.go('facilitator.login');
                        },
                        "Login In As A Facilitator");

                var secretSantaLogin =
                    menuOptionModel.create(
                        function() {
                            $state.go('secretsanta.login');
                        },
                        "Login In As A Secret Santa");

                $scope.menuOptions = [
                    facilitatorRegistration,
                    facilitatorLogin,
                    secretSantaLogin
                ];
            }
        };
    }
]);
