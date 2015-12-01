'use strict';

angular.module('ssSecretSanta').directive('ssCreateSecretSanta',
    ['ssSecretSantaService',
    function(secretSantaService) {
        function clearForm(form) {
            form.name = "";
            form.email = "";
        }

        return {
            require: '^form',
            scope: {
                secretSantaList: '='
            },
            templateUrl: 'secretSanta/createSecretSanta.html',
            link: function($scope, element, attrs, formCtrl) {
                $scope.add = function() {
                    var secretSanta = secretSantaService.create();
                    secretSanta.name = $scope.form.name;
                    secretSanta.email = $scope.form.email;


                    $scope.secretSantaList.add(secretSanta);

                    // TODO: use forms properly.
                    //formCtrl.$setPristine();

                    // $scope.form.$setPristine();
                    clearForm($scope.form);
                }
            }
        };
    }
]);
