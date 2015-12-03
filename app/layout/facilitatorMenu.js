'use strict';

angular.module('ssLayout').directive('ssFacilitatorMenu', 
	function() {
		return {
			templateUrl: 'layout/menu.html',
			link: function($scope) {
				var createSecretSantaList =
                    menuOptionModel.create(
                        function() {
                            $state.go('createSecretSantaList');
                        },
                        "Create New Secret Santa Lists");

                var manageSecretSantaList =
                    menuOptionModel.create(
                        function() {
                            $state.go('manageSecretSantaList');
                        },
                        "Manage Secret Santa Lists");

                $scope.menuOptions = [
                    createSecretSantaList,
                    manageSecretSantaList
                ];
			}
		}
});