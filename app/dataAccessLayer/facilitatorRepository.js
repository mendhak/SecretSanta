'use strict';

angular.module('ssDataAccessLayer').factory('ssFacilitatorRepository', ['$http',
    function($http) {
        return {
            saveFacilitator: function(facilitatorDetails) {
            	var success = function() {

            	}

            	var error = function() {

            	}

                $http.post('/ss-api/facilitator/save', facilitatorDetails).then(success, error);
            }
        };
    }
]);
