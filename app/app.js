'use strict';

angular.module('ssCommon', []);
angular.module('ssLayout', []);
angular.module('ssSecretSanta', []);

var secretSantaApp = angular
    .module('secretSantaApp', [
        'ui.router',
        'ssCommon',
        'ssLayout',
        'ssSecretSanta'
    ])
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state('home', {
                        url: '/',
                        template: '<ss-menu></ss-menu>'
                    })
                    .state('createSecretSantaList', {
                        url: '/createSecretSantaList',
                        template: '<ss-list-of-secret-santas mode="create"></ss-list-of-secret-santas>'
                    });
            }
        ]);
