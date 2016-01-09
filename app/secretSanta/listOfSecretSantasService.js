'use strict';

angular.module('ssSecretSanta').factory('ssListOfSecretSantasService', function() {
    function SecretSantaList(name) {
        this.name = "";
        this.list = [];
    }

    SecretSantaList.prototype.add = function(secretSanta) {
    	this.list.push(secretSanta);
    };

    SecretSantaList.prototype.remove = function(secretSanta) {
        var foundItem = _.find(this.list, function(item) {
            return item.isSameData(secretSanta);
        });
    };

    SecretSantaList.prototype.length = function() {
        return this.list.length;
    };

    return {
        create: function() {
            return new SecretSantaList();
        }
    };
});
