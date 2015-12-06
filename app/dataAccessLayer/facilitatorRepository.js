'use strict';

angular.module('ssDataAccessLayer').factory('ssFacilitatorRepository', ['$http', '$q',
    function($http, $q) {
        return {
            createFacilitator: function(facilitatorDetails) {
                var deferred = $q.defer();

                var success = function(response) {
                	deferred.resolve(response.data);
                }

                var error = function() {

                }

				$http.post('/ss-api/facilitator/create', facilitatorDetails).then(success, error);
                return deferred.promise;
            }
        };
    }
]);
