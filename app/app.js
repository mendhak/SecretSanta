'use strict';

angular.module('ssCommon', []);
angular.module('ssLayout', []);
angular.module('ssNiceList', []);

var secretSantaApp = angular
    .module('secretSantaApp', [
        'ui.router',
        'ssCommon',
        'ssLayout',
        'ssNiceList'
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
                    .state('createNiceList', {
                        url: '/createNiceList',
                        template: '<ss-create-nice-list></ss-create-nice-list>'
                    });
            }
        ]);
