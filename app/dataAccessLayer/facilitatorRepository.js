'use strict';

angular.module('ssDataAccessLayer').factory('ssFacilitatorRepository', ['$http', '$q',
    function($http, $q) {
        function post(url, details, errorMessage) {
            var deferred = $q.defer();

            var success = function(response) {
                deferred.resolve(response.data);
            };

            var error = function(response) {
                if (!_.isUndefined(errorMessage)) {
                    // TODO:

                    console.log(errorMessage + ": " + JSON.stringify(response));
                }
            };

            $http.post(url, details).then(success, error);
            return deferred.promise;
        }

        return {
            createFacilitator: function(facilitatorDetails) {
                return post('/ss-api/facilitator/create', facilitatorDetails);
                // var deferred = $q.defer();

                // var success = function(response) {
                //     deferred.resolve(response.data);
                // };

                // var error = function() {
                //     // TODO:
                // };

                // $http.post('/ss-api/facilitator/create', facilitatorDetails).then(success, error);
                // return deferred.promise;
            },
            getFacilitator: function(facilitatorId) {
                return post('/ss-api/facilitator/get', facilitatorId);

                // var deferred = $q.defer();

                // var success = function(response) {
                //     deferred.resolve(response.data);
                // };

                // var error = function() {

                // };

                // $http.post('/ss-api')
            },
            saveList: function(facilitatorId, secretSantaList) {
                var details = {
                    facilitatorId: facilitatorId,
                    secretSantaList: secretSantaList
                };

                return post('/ss-api/facilitator/saveList', details);
                
                // var deferred = $q.defer();

                // var success = function(response) {
                //     deferred.resolve(response.data);
                // };

                // var error = function() {
                //     // TODO:
                // };

                // var details = {
                //     facilitatorId: facilitatorId,
                //     secretSantaList: secretSantaList
                // };

                // $http.post('/ss-api/facilitator/saveList', details).then(success, error);
                // return deferred.promise;
            }
        };
    }
]);
