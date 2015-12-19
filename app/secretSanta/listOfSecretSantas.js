'use strict';

angular.module('ssSecretSanta').directive('ssListOfSecretSantas', ['$state', 'ssListOfSecretSantasService', 'ssFacilitatorRepository',
    function($state, listOfSecretSantasService, ssFacilitatorRepository) {
        return {
            scope: {
                facilitatorId: "@",
                listId: "@",
                mode: "@"
            },
            templateUrl: 'secretSanta/listOfSecretSantas.html',
            link: function($scope) {
                $scope.generateConfirmMessage = "Once you click generate you will not be able to edit the secret santa list. Are you sure you wish to continue?";

                $scope.secretSantaList = listOfSecretSantasService.create();
                if ($scope.mode === "edit") {
                    // $scope.secretSantaList = 
                }
                
                getFacilitator();

                // initialise the dirty flag to true if we've just created this list.

                $scope.isDirty = $scope.mode === "create";

                $scope.remove = function(secretSanta) {
                    $scope.secretSantaList.list = _.reject($scope.secretSantaList.list, function(item) {
                        return item.isSameData(secretSanta);
                    });
                };

                $scope.save = function() {
                    // Save the secretSantaList

                    console.log($scope.secretSantaList);
                    var success = function(response) {
                        $scope.isDirty = false;
                        if ($scope.mode === "create") {
                            $state.go('secretSantaList.manage', {
                                facilitatorId: $scope.facilitatorId,
                                listId: response.data._id
                            });
                        }
                    };

                    var error = function(response) {
                        // TODO: 

                        console.log(response);
                    };

                    ssFacilitatorRepository.saveList($scope.facilitatorId, $scope.secretSantaList).then(success, error);
                };

                $scope.generate = function() {
                    console.log("$scope.listname: " + $scope.listname);
                };

                $scope.change = function() {
                    $scope.isDirty = true;
                };

                function updateActionButtonDisabledState() {
                    $scope.actionButtonsDisabled = _.isUndefined($scope.facilitator);
                }

                function getFacilitator() {
                    var success = function(response) {
                        $scope.facilitator = response.data;
                        updateActionButtonDisabledState();
                    };

                    var error = function(response) {
                        // TODO:

                        console.log(response);
                        return;
                    };

                    ssFacilitatorRepository.getFacilitator($scope.facilitatorId).then(success, error);
                }
            }
        };
    }
]);