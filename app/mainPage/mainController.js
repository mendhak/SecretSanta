"use strict";

// angular.module('ssMainPage').controller('MainController', ['$scope',
//     function($scope) {
//         $scope.registerNewOrganiser = function() {
//             alert('hello');
//         }
//     }
// ]);

var mainController = function() {
    this.registerNewOrganiser = function() {
        alert('hello');
    };
};

angular.module('ssMainPage').controller('MainController', mainController);
