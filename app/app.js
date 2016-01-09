'use strict';

angular.module('ssCommon', []);
angular.module('ssLayout', []);
angular.module('ssFacilitator', []);
angular.module('ssSecretSanta', []);
angular.module('ssSecretSantaList', []);
angular.module('ssDataAccessLayer', []);

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
                    .state('secretSantaList', {
                        abstract: true,
                        url: '/secretSantaList',

                        // Note: abstract still needs a ui-view for its children to populate.
                        // You can simply add it inline here.

                        template: '<ui-view/>'
                    })
                    .state('secretSantaList.create', {
                        url: '/createSecretSantaList/:facilitatorId',
                        template: function(params) {
                            return '<ss-list-of-secret-santas mode="create" facilitator-id="' + params.facilitatorId + '"></ss-list-of-secret-santas>';
                        }
                    })
                    .state('secretSantaList.manage', {
                        url: '/manageSecretSantaList/:facilitatorId/:listId',
                        template: function(params) {
                            return '<ss-list-of-secret-santas mode="edit" facilitator-id="' + params.facilitatorId + '" list-id="' + params.listId + '"></ss-list-of-secret-santas>';
                        }
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
                        url: '/manage/:id',
                        template: function(params) {

                            // NOTE: A cool way to inject params into the template html

                            return '<ss-facilitator-menu facilitator-id="' + params.id + '"></ss-facilitator-menu>';
                        }
                    })
                    .state('facilitator.manageList', {
                        url: '/manageList/:id',
                        template: function(params) {
                            return '';
                        }
                    });
            }
        ]);
