'use strict';

angular.module('ssCommon', []);
angular.module('ssLayout', []);
angular.module('ssFacilitator', []);
angular.module('ssSecretSanta', []);

var secretSantaApp = angular
    .module('secretSantaApp', [
        'ui.router',
        'ssCommon',
        'ssLayout',
        'ssFacilitator',
        'ssSecretSanta'
    ])
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state('home', {
                        url: '/',
                        template: '<ss-main-menu></ss-main-menu>'
                    })
                    .state('createSecretSantaList', {
                        url: '/createSecretSantaList',
                        template: '<ss-list-of-secret-santas mode="create"></ss-list-of-secret-santas>'
                    })
                    .state('facilitator', {
                        url: '/facilitator/register',
                        template: '<ss-register-facilitator></ss-register-facilitator>'
                    })
                    .state('facilitator.manage', {
                        url: '/facilitator/manage',
                        template: '<ss-facilitator-details mode="edit"></ss-facilitator-details>'
                    });
            }
        ]);
