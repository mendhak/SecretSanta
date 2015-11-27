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
        console.log("registerNewOrganiser" + new Date());
    };
};

angular.module('ssMainPage').controller('MainController', mainController);
