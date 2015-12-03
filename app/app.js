'use strict';

angular.module('ssCommon', []);
angular.module('ssLayout', []);
angular.module('ssFacilitator', []);
angular.module('ssSecretSanta', []);
angular.module('ssDataAccessLayer', [])

var secretSantaApp = angular
    .module('secretSantaApp', [
        'ui.router',
        'ssCommon',
        'ssLayout',
        'ssFacilitator',
        'ssSecretSanta',
        'ssDataAccessLayer'
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
                        abstract: true,
                        url: '/facilitator',
                        
                        // Note: abstract still needs a ui-view for its children to populate.
                        // You can simply add it inline here.
                        
                        template: '<ui-view/>'
                    })
                    .state('facilitator.register', {
                        url: '/register',
                        template: '<ss-register-facilitator></ss-register-facilitator>'
                    })
                    .state('facilitator.manage', {
                        url: '/manage',
                        template: '<ss-facilitator-details mode="edit"></ss-facilitator-details>'
                    });
            }
        ]);
