'use strict';

angular.module('ssLayout').directive('ssFacilitatorMenu', ['$state', 'ssMenuOptionModel',
	function($state, menuOptionModel) {
		return {
            scope: {
                facilitatorId: "@"
            },
			templateUrl: 'layout/menu.html',
			link: function($scope) {
				var createSecretSantaList =
                    menuOptionModel.create(
                        function() {
                            $state.go('createSecretSantaList', { facilitatorId: $scope.facilitatorId });
                        },
                        "Create New Secret Santa Lists");

                var manageSecretSantaList =
                    menuOptionModel.create(
                        function() {
                            $state.go('manageSecretSantaList', { facilitatorId: $scope.facilitatorId });
                        },
                        "Manage Secret Santa Lists");

                $scope.menuOptions = [
                    createSecretSantaList,
                    manageSecretSantaList
                ];
			}
		}
}]);