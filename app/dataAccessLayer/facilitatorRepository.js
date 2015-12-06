'use strict';

angular.module('ssDataAccessLayer').factory('ssFacilitatorRepository', ['$http', '$q',
    function($http, $q) {
        return {
            saveFacilitator: function(facilitatorDetails) {
                var deferred = $q.defer();

                var success = function(response) {
                	deferred.resolve(response.data);
                }

                var error = function() {

                }

				$http.post('/ss-api/facilitator/save', facilitatorDetails).then(success, error);
                return deferred.promise;
            }
        };
    }
]);
