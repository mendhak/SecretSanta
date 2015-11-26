'use strict';

angular.module('ssMainPage', []);

var secretSantaApp = angular
    .module('secretSantaApp', [
        'ngRoute',
        'ssMainPage'
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/', {
                    templateUrl: 'mainPage/main.html',
                    controllerAs: 'main',
                    controller: 'MainController'
                })
                .otherwise({
                    redirectTo: '/'
                })
        }
    ]);
