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
                            $state.go('secretSantaList.create', { facilitatorId: $scope.facilitatorId });
                        },
                        "Create New Secret Santa List");

                var manageSecretSantaList =
                    menuOptionModel.create(
                        function() {
                            $state.go('facilitator.manageLists', { facilitatorId: $scope.facilitatorId });
                        },
                        "Manage Secret Santa Lists");

                $scope.menuOptions = [
                    createSecretSantaList,
                    manageSecretSantaList
                ];
			}
		}
}]);