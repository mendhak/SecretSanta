'use strict';
angular.module('ssMainPage', []);

var secretSantaApp = angular
    .module('secretSantaApp', [
        'ui.router',
        'ssMainPage'
    ])
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state('secretSanta', {
                        url: '/',
                        templateUrl: 'mainPage/main.html',
                        controller: 'MainController',
                        controllerAs: 'mainController'
                    });
            }
        ]);
