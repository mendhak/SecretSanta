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

        function get(url, details, errorMessage) {
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

            $http.get(url, {params: details}).then(success, error);
            return deferred.promise;
        }


        return {
            createFacilitator: function(facilitatorDetails) {
                return post('/ss-api/facilitator/', facilitatorDetails);
            },
            getFacilitator: function(facilitatorId) {
                var data = {
                    facilitatorId: facilitatorId
                }
                return get('/ss-api/facilitator/', data);
            },
            saveList: function(facilitatorId, secretSantaList) {
                var details = {
                    facilitatorId: facilitatorId,
                    secretSantaList: secretSantaList
                };

                return post('/ss-api/facilitator/saveList', details);
            }
        };
    }
]);
